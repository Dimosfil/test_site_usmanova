param(
  [string]$ConfigPath = (Join-Path $PSScriptRoot "ftp.local.json")
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $ConfigPath)) {
  throw "FTP config not found: $ConfigPath"
}

$config = Get-Content -Raw -LiteralPath $ConfigPath | ConvertFrom-Json
$password = [Environment]::GetEnvironmentVariable([string]$config.passwordEnv, "Process")
if (!$password) { $password = [Environment]::GetEnvironmentVariable([string]$config.passwordEnv, "User") }
if (!$password) { $password = [Environment]::GetEnvironmentVariable([string]$config.passwordEnv, "Machine") }

if ([string]::IsNullOrWhiteSpace($password)) {
  throw "Password environment variable is not set: $($config.passwordEnv)"
}

if ($config.protocol -ne "ftp") {
  throw "Only FTP protocol is supported by this script."
}

$localRoot = (Resolve-Path -LiteralPath $config.localPath).Path
$localRootWithSeparator = $localRoot.TrimEnd("\", "/") + [System.IO.Path]::DirectorySeparatorChar
$remoteRoot = ([string]$config.remotePath).Trim()
if (!$remoteRoot.StartsWith("/")) { $remoteRoot = "/" + $remoteRoot }
$remoteRoot = $remoteRoot.TrimEnd("/")
$credential = [System.Net.NetworkCredential]::new($config.username, $password)
$usePassive = if ($null -ne $config.usePassive) { [bool]$config.usePassive } else { $true }
$timeoutMs = if ($null -ne $config.timeoutMs) { [int]$config.timeoutMs } else { 600000 }

function ConvertTo-FtpPath {
  param([string]$Path)

  $parts = $Path -split "/" | Where-Object { $_ -ne "" }
  if ($parts.Count -eq 0) { return "/" }
  return "/" + (($parts | ForEach-Object { [System.Uri]::EscapeDataString($_) }) -join "/")
}

function New-FtpUri {
  param([string]$Path)

  $builder = [System.UriBuilder]::new("ftp", [string]$config.host, [int]$config.port, (ConvertTo-FtpPath $Path))
  return $builder.Uri
}

function New-FtpRequest {
  param(
    [string]$Path,
    [string]$Method
  )

  $request = [System.Net.FtpWebRequest]::Create((New-FtpUri $Path))
  $request.Credentials = $credential
  $request.Method = $Method
  $request.Proxy = $null
  $request.Timeout = $timeoutMs
  $request.ReadWriteTimeout = $timeoutMs
  $request.UseBinary = $true
  $request.UsePassive = $usePassive
  $request.KeepAlive = $false
  return $request
}

function Invoke-FtpNoBody {
  param(
    [string]$Path,
    [string]$Method
  )

  $request = New-FtpRequest -Path $Path -Method $Method
  try {
    $response = $request.GetResponse()
    $response.Close()
    return $true
  } catch [System.Net.WebException] {
    if ($_.Exception.Response) {
      $_.Exception.Response.Close()
    }
    return $false
  }
}

function Ensure-RemoteDirectory {
  param([string]$RelativeDirectory)

  $current = $remoteRoot
  foreach ($part in ($RelativeDirectory -split "[\\/]+" | Where-Object { $_ })) {
    $current = "$current/$part"
    [void](Invoke-FtpNoBody `
      -Path $current `
      -Method ([System.Net.WebRequestMethods+Ftp]::MakeDirectory))
  }
}

function Ensure-RemoteRoot {
  if ([string]::IsNullOrWhiteSpace($remoteRoot)) {
    return
  }

  $current = ""
  foreach ($part in ($remoteRoot -split "[\\/]+" | Where-Object { $_ })) {
    if ([string]::IsNullOrWhiteSpace($current)) {
      $current = $part
    } else {
      $current = "$current/$part"
    }

    [void](Invoke-FtpNoBody `
      -Path $current `
      -Method ([System.Net.WebRequestMethods+Ftp]::MakeDirectory))
  }
}

$files = Get-ChildItem -LiteralPath $localRoot -Recurse -File

Ensure-RemoteRoot

foreach ($file in $files) {
  $relativePath = $file.FullName.Substring($localRootWithSeparator.Length).Replace("\", "/")
  $relativeDirectory = Split-Path -Path $relativePath -Parent

  if (-not [string]::IsNullOrWhiteSpace($relativeDirectory)) {
    Ensure-RemoteDirectory -RelativeDirectory $relativeDirectory
  }

  $targetPath = "$remoteRoot/$relativePath"
  $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
  $uploaded = $false

  for ($attempt = 1; $attempt -le 2 -and -not $uploaded; $attempt++) {
    $request = New-FtpRequest -Path $targetPath -Method ([System.Net.WebRequestMethods+Ftp]::UploadFile)
    $request.ContentLength = $bytes.Length
    Write-Output "Uploading $relativePath ($($bytes.Length) bytes)"

    try {
      $stream = $request.GetRequestStream()
      try {
        $stream.Write($bytes, 0, $bytes.Length)
      } finally {
        $stream.Close()
      }

      $response = $request.GetResponse()
      $response.Close()
      $uploaded = $true
    } catch {
      if ($attempt -ge 2) {
        throw
      }

      Write-Output "Retrying $relativePath after upload error: $($_.Exception.Message)"
      Start-Sleep -Seconds 3
    }
  }
}

Write-Output "Uploaded $($files.Count) file(s) to $($config.host):$remoteRoot/"
