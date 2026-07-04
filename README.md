# Sasha Belokonova Fit App

Responsive Vite/React prototype for fitness coach Sasha Belokonova.

For AI agents: read `AGENTS.md` first.

Stack inventory: `tools/project-memory/specs/technology-stack.md`.

## Install

```powershell
npm install
```

## Run

```powershell
npm run dev
```

## Contents

- `src/app/`: application shell and global styles.
- `src/widgets/`: page sections.
- `src/features/`: interactive feature components.
- `src/entities/`: reusable domain entities.
- `src/shared/`: shared configuration and UI primitives.
- `public/assets/`: generated visual content used by the app.

## Smoke Check

Run the dev server, open the local Vite URL, switch color themes, click a
program card, and submit the form with sample contact data. The form should
validate and show a success message.

## FTP Deploy

FTP deploy uses the project-local script `tools/deploy/upload-ftp.ps1`.

1. Copy `tools/deploy/ftp.local.example.json` to `tools/deploy/ftp.local.json`.
2. Fill the FTP host, username, and remote folder in `ftp.local.json`.
3. Store the password in the environment variable named by `passwordEnv`.
4. Build and upload:

```powershell
npm run build
npm run deploy:ftp
```

The default example uploads `dist/` to `/www/test_site_usmanova/`.
