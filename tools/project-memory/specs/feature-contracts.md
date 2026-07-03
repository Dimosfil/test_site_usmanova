# Feature Contracts

Last reviewed: 2026-07-03

## Purpose

This file is the durable feature base for the Sasha Belokonova app. Before
removing or redesigning a user-facing behavior, check this file and update it in
the same scoped change when the behavior intentionally changes.

## Theme Selection

- The header exposes a visible color-theme switcher.
- The theme switcher is a compact dropdown, not a row of individual theme
  buttons.
- Supported themes are `rose`, `teal`, `lime`, `sky`, and `mono`.
- The selected theme is stored in React app state and applied to the app root as
  `data-theme`.
- The dropdown must show the current value and a visible color swatch.
- Default theme is `rose`, because the current visual direction follows the
  pink-accent reference style.

## Program Selection

- The program catalog must include more than a minimal three-card demo. It
  should cover at least: home training, gym training, nutrition, glutes/core,
  return after a break, express start, self-love, and mobility/posture.
- Program cards are clickable through their action button.
- The primary action on every program card is `Подробнее`, not `Выбрать`.
- Clicking `Подробнее` opens a program-specific detail page built from the
  shared detail-page template and updates the app-level selected program state.
- Program detail pages are addressable through hash routes formatted as
  `#program/<program-id>` so a detail view can be opened directly in the
  static prototype without adding a router dependency.
- Each detail page has a hero card, target-user list, included-content list,
  format/result/support summary, return action, and CTA to the lead form.
- The detail-page CTA returns to the landing page, scrolls to the lead form,
  and keeps the selected program reflected in the form's read-only program
  field.

## Lead Form

- The form remains client-side only in this prototype.
- Required fields are name, contact, goal, program, and training place.
- Invalid submission shows an error status and uses browser validity reporting.
- Valid submission shows a success status that includes the selected program,
  training place, and goal.

## Content Sections

- The page includes hero, trust/experience, programs, nutrition, about/self-love,
  guarantees, contact links, and legal footer sections.
- Navigation links should expose the main sections without hiding the theme
  switcher on desktop or mobile.
