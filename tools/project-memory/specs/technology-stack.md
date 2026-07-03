# Technology Stack

Last reviewed: 2026-07-03

Canonical source: this file
Linked from: `README.md`, `AGENTS.md`

This is project documentation. Keep business rules, feature algorithms, workflow
contracts, state machines, and verification guarantees in project memory; keep
stack facts, commands, runtime assumptions, and operational notes here.

## Summary

- Primary stack: static HTML, CSS, and vanilla JavaScript.
- Runtime model: local browser file open, no backend.
- Current confidence: verified from repository files.

## Components

| Layer | Technology | Evidence | Notes |
| --- | --- | --- | --- |
| Language/runtime | HTML, CSS, JavaScript | `index.html`, `styles.css`, `script.js` | Browser runtime only |
| Frontend | Static responsive landing page | `index.html` | No framework |
| Backend/API | None | No server files present | Form is client-side prototype behavior |
| Data/storage | None | No data files or database required | Images live in `assets/` |
| Build/package | None | `README.md` run command | No bundler |
| Test/quality | Manual smoke checks | `tools/AGENT_RUNBOOK.md` | Previous Playwright smoke was temporary |
| Deployment/runtime | Static file hosting or local browser | `index.html` | Can be hosted as plain static assets |

## Commands

| Purpose | Command | Evidence |
| --- | --- | --- |
| Install | No install required | `AGENTS.md` |
| Run | `Start-Process .\index.html` | `README.md` |
| Test | Manual browser smoke | `tools/AGENT_RUNBOOK.md` |
| Build | No build required | `AGENTS.md` |

## External Services

| Service | Role | Evidence | Boundary |
| --- | --- | --- | --- |
| None | Not used | Repository contents | Keep future secrets out of source |

## Gaps

- No persistent automated browser test is committed.
