# Agent Runbook

Every command should be copy-pasteable from the project root.

## Install

```powershell
# No install step is required for the static site.
```

## Run

```powershell
Start-Process .\index.html
```

## Test

```powershell
# Browser smoke check:
# 1. Open index.html.
# 2. Switch each color theme.
# 3. Click a program card and confirm the form program field changes.
# 4. Submit the form with valid sample data and confirm the success message.
```

## Build

```powershell
# No build step is required.
```

## Smoke Check

```powershell
Start-Process .\index.html
```

Expected result:

```text
The landing page opens locally, adapts on mobile widths, buttons scroll or
select programs, and the form validates then shows a success message.
```

## Logs

```powershell
# No application logs are produced by the static prototype.
```

## Environment Notes

- Main runtime is a browser opening local files.
- Generated visual assets live in `assets/` and are project content, not
  rebuildable cache.
