# AGENTS.md — Project Context for AI Agents

## Overview

**Astro Starseed** is a high-performance Astro 5 starter template by [LUNARITY](https://lunarity.ai).
Hybrid rendering: Astro for static generation, React 19 for interactive islands.

- **Framework:** Astro 5 (Hybrid mode)
- **UI:** React 19 + shadcn/ui (Radix primitives)
- **Styling:** Tailwind CSS 4 via `@tailwindcss/vite`, OKLch design tokens
- **Animations:** Framer Motion 12
- **i18n:** Custom type-safe URL-based routing
- **Testing:** Playwright E2E
- **Runtime:** Node 22.x (enforced via `.npmrc`)
- **Package manager:** `pnpm` exclusively

## Commands

```bash
pnpm dev              # Dev server → http://localhost:4321
pnpm build            # Production build
pnpm preview          # Preview production build
pnpm format           # Prettier (write)
pnpm format:check     # Prettier (check only)
pnpm test:e2e         # Playwright E2E (headless)
pnpm test:e2e:ui      # Playwright with UI runner
pnpm test:e2e:debug   # Playwright debug mode
pnpm test:e2e:install # Install Chromium for Playwright
```

## Architecture

### File map

| Path | Purpose |
|---|---|
| `src/layouts/Layout.astro` | Single base layout (SEO, JSON-LD, Navbar, Footer) |
| `src/site.config.ts` | Global metadata — import from here, never hardcode |
| `src/styles/global.css` | Tailwind + OKLch CSS variable design tokens |
| `src/components/ui/` | shadcn/ui primitives — use CLI to add/update, do not edit manually |
| `src/components/` | Custom components |
| `src/lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |
| `src/hooks/useTheme.ts` | Dark/light mode — `.dark` class on `<html>` |
| `src/i18n/ui.ts` | i18n helpers: `getLangFromUrl`, `useTranslations`, `getLocalizedPath` |
| `src/i18n/locales/<lang>.json` | Translation files |
| `src/content/config.ts` | Content collection schemas (Zod) |
| `astro.config.mjs` | Astro config, integrations, i18n routing |

### Key rules

- Use `cn()` from `src/lib/utils.ts` for all conditional class merging.
- Never use raw hex colors — extend the OKLch token system in `src/styles/global.css`.
- Astro components (`.astro`) for static content; React (`.tsx`) for interactive elements.
- React islands must use Astro client directives: `client:load`, `client:visible`, etc.
- All shadcn/ui components are added via `pnpm dlx shadcn add <component>`.
- TypeScript strict mode is on — all code must be properly typed.

### i18n

- Default locale `en` has no URL prefix; other locales are prefixed (e.g., `/pl/`).
- To add a locale: create `src/i18n/locales/<lang>.json`, register in `src/i18n/ui.ts`, update `astro.config.mjs`.

### Testing

- Playwright targets `http://localhost:4321`.
- Viewports: Desktop Chromium 1280×720, Mobile iPhone 12 375×667.
- Dev server must be running before tests, or configure `webServer` in `playwright.config.ts`.
