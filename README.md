# T20 Play Zone — Frontend

React/TypeScript implementation of the "T20 Play Zone" landing page Figma design.

## Stack

- React 19 + TypeScript + Vite
- Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- React Router v7
- CSS Modules + CSS custom properties (design tokens)
- `react-icons` for iconography

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
npm run lint      # oxlint
```

## Project structure

```
src/
├── assets/            static assets bundled by Vite
├── components/
│   ├── common/         shared, app-wide building blocks (Icon, SectionHeading)
│   └── ui/              generic, style-only primitives (Button, Card, Badge, GameTile)
├── constants/          config values (WhatsApp number/message)
├── data/                mock JSON standing in for future API responses
├── features/            one folder per page section, each owning its component + styles
├── hooks/               reusable hooks (typed Redux hooks, useWhatsApp)
├── layouts/             page shells (MainLayout: header + sidebar + outlet)
├── pages/                route-level components
├── routes/               router configuration
├── services/            data-fetching layer (currently resolves mock JSON; swap for fetch() later)
├── store/
│   └── slices/          Redux Toolkit slices (navigation, matches, games)
├── styles/               global.css + tokens.css (design tokens)
└── types/                shared TypeScript interfaces
```

## Redux state

- `navigation` — nav links, sidebar items, active sidebar item, mobile sidebar open/close
- `matches` — live match groups, loaded via `loadLiveMatches()` thunk (currently backed by mock JSON, shaped like a future `/api/matches` response)
- `games` — casino games, popular games, card games, loaded via `loadGamesCatalogue()` thunk

## WhatsApp integration

Configured in `src/constants/whatsapp.ts` (`WHATSAPP_PHONE_NUMBER`, `WHATSAPP_DEFAULT_MESSAGE`) and built into a `wa.me` deep link by `src/services/whatsappService.ts`. The floating `Get The ID Now` button (`src/features/whatsapp/WhatsAppButton.tsx`) opens it via `useWhatsApp()`. Works identically on desktop and mobile since `wa.me` links resolve to WhatsApp Web or the native app based on the platform.

## Images

All photography in `public/images/` is real, royalty-free stock photography sourced from Wikimedia Commons (public domain / CC-licensed). Deliberately **no photos of real, identifiable athletes** are used anywhere (including the hero banner) — using a real cricketer's likeness to promote betting without their authorization is a publicity-rights/endorsement risk, so generic stadium, casino-table, and gaming-equipment photography is used instead. Several esports tiles reuse the same 2–3 generic gaming photos (there wasn't a distinct free photo per title); swap in official title art if you have licensing for it.

## Animation

Scroll-triggered reveal animations (`src/hooks/useReveal.ts` + `src/components/common/Reveal.tsx`, IntersectionObserver-based, no extra dependency) fade/slide sections and cards into view once, staggered on grids. Route changes cross-fade via a keyed wrapper in `MainLayout`. Hover states (card lift, image zoom, pill scale, nav underline) and the live-badge/WhatsApp-button pulses are pure CSS. Everything respects `prefers-reduced-motion`.

## Known assumptions / limitations

- Figma Dev Mode inspection (exact hex/spacing/type tokens) wasn't available in this session (no editor access); colors, spacing, and type scale in `src/styles/tokens.css` were read visually from the design and are close but not pixel-exact — recommend a follow-up Dev Mode pass to fine-tune.
- Casino/popular game titles, the "About" copy, and footer contact details are placeholder copy (the corresponding Figma sections weren't fully legible during inspection).
- No backend exists yet; all data comes from `src/data/*.json` via the `services/` layer, which is already shaped to be swapped for real API calls.
- Licensed gambling platforms typically require jurisdiction-specific compliance UI (age verification, responsible-gambling disclosures, license footer) — not present in the source Figma design and not added here; confirm these are handled at the compliance/legal layer.
