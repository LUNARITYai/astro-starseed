# Astro Starseed

<p align="center">
  <img src="docs/images/banner.png" alt="Astro Starseed banner" width="100%" />
</p>

A modern Astro starter template by [LUNARITY](https://lunarity.ai) — production-ready, opinionated, and built for speed.

<p align="center">
  <img src="docs/images/preview.png" alt="Astro Starseed preview" width="100%" />
</p>

## Stack

| Layer           | Technology                                                                                                                                                                                                                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | <a href="https://astro.build" target="_blank" rel="noopener noreferrer">Astro 6</a>                                                                                                                                                          |
| UI              | <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React 19</a> + <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">shadcn/ui</a>                                                                 |
| Styling         | <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">Tailwind CSS 4</a> · <a href="https://developer.mozilla.org/en/docs/Web/CSS/color_value/oklch" target="_blank" rel="noopener noreferrer">OKLch</a> design tokens |
| Animations      | <a href="https://www.framer.com/motion/" target="_blank" rel="noopener noreferrer">Framer Motion 12</a>                                                                                                                                      |
| Icons           | <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer">Lucide React</a>                                                                                                                                                      |
| Forms           | <a href="https://react-hook-form.com" target="_blank" rel="noopener noreferrer">React Hook Form</a> + <a href="https://zod.dev" target="_blank" rel="noopener noreferrer">Zod</a>                                                            |
| Content         | <a href="https://docs.astro.build/en/guides/content-collections/" target="_blank" rel="noopener noreferrer">Astro Content Collections</a> + <a href="https://mdxjs.com/docs/" target="_blank" rel="noopener noreferrer">MDX</a>              |
| Testing         | <a href="https://playwright.dev" target="_blank" rel="noopener noreferrer">Playwright</a> (E2E)                                                                                                                                              |
| Language        | <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer">TypeScript</a> (strict)                                                                                                                             |
| Package manager | <a href="https://pnpm.io/" target="_blank" rel="noopener noreferrer">pnpm</a>                                                                                                                                                                |
| Node            | <a href="https://nodejs.org/en/docs" target="_blank" rel="noopener noreferrer">Node 22.x</a> (LTS)                                                                                                                                           |

## Features

- **Hybrid rendering** — Astro static generation + React islands for interactive components
- **Dark / light mode** — system preference detection, localStorage persistence, flash prevention
- **i18n ready** — type-safe translation system with URL-based locale routing and hreflang support
- **SEO optimised** — Open Graph, Twitter Card, JSON-LD structured data, canonical URLs, sitemap
- **16 shadcn/ui components** pre-installed and theme-aware
- **Responsive layout** — mobile-first, safe-area aware, accessible touch targets
- **E2E tests** — Playwright with Desktop + Mobile Chromium, screenshots/videos on failure
- **Strict code quality** — TypeScript strict mode, Prettier, engine-strict Node version

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:4321)
pnpm dev
```

## Recommended AI Setup

For AI-assisted workflows with `shadcn/ui`, configure the official shadcn MCP
server for your client. If you use Codex, also install the shadcn Codex skill.

### Codex

1. Install the Codex skill:

```bash
pnpm dlx skills add shadcn/ui
```

2. Add the shadcn MCP server to `~/.codex/config.toml`:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

### Claude Code

Add the shadcn MCP server to your project `.mcp.json`:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

Restart Claude Code, then run `/mcp` to confirm the server is connected.

### Gemini CLI

Add the shadcn MCP server to your project `.gemini/settings.json`:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

You can also add it via the Gemini CLI:

```bash
gemini mcp add shadcn npx shadcn@latest mcp
```

Sources:

- shadcn MCP docs: https://ui.shadcn.com/docs/mcp#configuration
- Gemini CLI MCP docs: https://google-gemini.github.io/gemini-cli/docs/tools/mcp-server.html

## Scripts

```bash
pnpm dev               # Development server
pnpm build             # Production build
pnpm preview           # Preview production build

pnpm format            # Format all files with Prettier
pnpm format:check      # Check formatting without writing

pnpm optimize-svgs     # Optimise SVGs in public/icons/

pnpm test:e2e          # Run Playwright E2E tests (headless)
pnpm test:e2e:ui       # Run with Playwright UI
pnpm test:e2e:headed   # Run with visible browser
pnpm test:e2e:debug    # Debug mode
pnpm test:e2e:report   # Open last HTML report
pnpm test:e2e:install  # Install Chromium for Playwright
```

## Project Structure

```
src/
├── components/
│   ├── ui/            # shadcn/ui components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Logo.tsx
│   └── Footer.astro
├── layouts/
│   └── Layout.astro   # Base layout (SEO, theme, scripts)
├── pages/
│   └── index.astro
├── i18n/
│   ├── ui.ts          # getLangFromUrl, useTranslations, getLocalizedPath…
│   └── locales/
│       └── en.json
├── hooks/
│   └── useTheme.ts
├── lib/
│   └── utils.ts       # cn() helper
├── content/
│   └── config.ts      # Content collection schemas
├── styles/
│   └── global.css     # Tailwind + CSS design tokens
└── site.config.ts     # Site-wide metadata
```

## Adding a New Language

1. Create `src/i18n/locales/<lang>.json` (copy `en.json` as a base)
2. Add the locale to `src/i18n/ui.ts`
3. Update `astro.config.mjs` i18n settings

## Theming

Design tokens are defined as CSS variables in `src/styles/global.css` using the OKLch color space. Both `:root` (light) and `.dark` variants are provided. All shadcn/ui components consume these variables automatically.

To customise, edit the `--background`, `--primary`, `--accent` (etc.) values in `global.css`.

## Local MCP overrides

Copy `.mcp.json.local.example` → `.mcp.json.local` and adjust paths for
machine-specific MCP servers (e.g. `filesystem`). The `.local` file is
gitignored.

## License

MIT
