# App Architecture

Last reviewed: 2026-07-03

## Goal

The application is a responsive Vite/React prototype for a fitness coach
landing flow. It keeps user-visible behavior client-side: theme switching,
program selection, lead-form validation, and confirmation messaging.

## Source Layout

- `src/app/`: application shell, root state ownership, and global CSS.
- `src/widgets/`: page sections composed from features and shared UI.
- `src/features/`: interactive user workflows such as theme switching, program
  picking, and lead form submission.
- `src/entities/`: reserved for reusable domain components and model logic.
- `src/shared/config/`: content, typed identifiers, and static app data.
- `src/shared/ui/`: small reusable UI primitives.
- `public/assets/`: generated product images served as static Vite assets.

## Visual Asset Library

- Fitness photo assets are generated original images inspired by the clean,
  high-key style of premium online fitness course pages.
- Generated project-bound photos are stored in `public/assets/` with descriptive
  filenames such as `fit-hero-lunge.png`, `fit-home-band.png`,
  `fit-gym-dumbbells.png`, `fit-nutrition-table.png`,
  `fit-self-care-portrait.png`, and `fit-self-care-full.png`.
- Do not reference generated images from the default Codex generated-images
  folder; copy final selected assets into the project before using them.

## Interaction Contracts

- Theme selection updates the app-level `data-theme` value and visible pressed
  state. The theme switcher is a retained user-facing feature, not a temporary
  style control.
- Program cards update the selected program and scroll to the lead form.
- The lead form uses the selected program as read-only state, validates required
  fields, and shows either an error or success status without external services.

Detailed user-facing feature contracts live in
`tools/project-memory/specs/feature-contracts.md`.

## Boundaries

- No backend, secrets, external APIs, or persisted storage are part of the
  current prototype.
- Product images are source assets, not generated cache.
- Business copy and selectable program data live in typed configuration rather
  than being duplicated across components.
