# Technology Stack

Last reviewed: 2026-07-03

Canonical source: this file
Linked from: `README.md`, `AGENTS.md`

This is project documentation. Keep business rules, feature algorithms, workflow
contracts, state machines, and verification guarantees in project memory; keep
stack facts, commands, runtime assumptions, and operational notes here.

## Summary

- Primary stack: Vite, React, TypeScript, CSS, and lucide-react icons.
- Runtime model: local Vite dev server, no backend.
- Current confidence: verified from repository files.

## Components

| Layer | Technology | Evidence | Notes |
| --- | --- | --- | --- |
| Language/runtime | TypeScript, JSX, CSS | `src/`, `tsconfig*.json` | Browser runtime through Vite |
| Frontend | React app | `src/main.tsx`, `src/app/App.tsx` | Componentized app structure |
| Backend/API | None | No server files present | Form is client-side prototype behavior |
| Data/storage | None | No data files or database required | Images live in `public/assets/` |
| Build/package | Vite | `package.json`, `vite.config.ts` | Builds static output into `dist/` |
| Test/quality | TypeScript build and manual smoke checks | `package.json`, `tools/AGENT_RUNBOOK.md` | No persistent browser test yet |
| Icons | lucide-react | `package.json`, `src/` imports | Used for button and card affordances |
| Deployment/runtime | Static hosting after Vite build | `npm run build` | Serve generated `dist/` output |

## Commands

| Purpose | Command | Evidence |
| --- | --- | --- |
| Install | `npm install` | `README.md` |
| Run | `npm run dev` | `README.md` |
| Test | Manual browser smoke | `tools/AGENT_RUNBOOK.md` |
| Build | `npm run build` | `package.json` |

## External Services

| Service | Role | Evidence | Boundary |
| --- | --- | --- | --- |
| None | Not used | Repository contents | Keep future secrets out of source |

## Gaps

- No persistent automated browser test is committed.
- No backend or production deployment contract is configured.
