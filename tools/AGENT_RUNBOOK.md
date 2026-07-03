# Agent Runbook

Every command should be copy-pasteable from the project root.

## Install

```powershell
npm install
```

## Run

```powershell
npm run dev
```

## Test

```powershell
# Browser smoke check:
# 1. Run npm run dev.
# 2. Open the local Vite URL.
# 2. Switch each color theme.
# 3. Click a program card and confirm the form program field changes.
# 4. Submit the form with valid sample data and confirm the success message.
```

## Build

```powershell
npm run build
```

## Smoke Check

```powershell
npm run dev
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

- Main runtime is the Vite dev server and browser.
- Generated visual assets live in `public/assets/` and are project content, not
  rebuildable cache.
