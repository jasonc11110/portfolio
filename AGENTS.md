# jasonc11110-portfolio

Portfolio site for jasonc11110. Built with Next.js 16 (App Router), Tailwind v4, shadcn/ui, Framer Motion.

## Commands

```sh
pnpm dev          # dev server (Turbopack)
pnpm dev --host 0.0.0.0  # dev server on local network
pnpm build        # production build (includes TypeScript check)
pnpm start        # production server
pnpm lint         # TypeScript type-check (tsc --noEmit)
```

## Architecture

- `app/layout.tsx` — root layout: retro dark theme, Geist Mono font, SEO metadata, Vercel Analytics (prod only), full-page snap-mandatory
- `app/page.tsx` — single page layout: Navbar → Hero → About → ProjectTimeline → Footer
- `app/globals.css` — muted retro palette (CSS variables), utility classes (`.scanlines`, `.crt-glow`, `.terminal-cursor`), theme architecture (swap `:root` to change theme)
- `components/`:
  - `navbar.tsx` — retro terminal-style bar, monospace uppercase links, blinking logo cursor
  - `hero.tsx` — scanline overlay, terminal-style name/tagline, status badge, monospace CTAs
  - `about.tsx` — two terminal windows (bio + skills), stats as env vars, retro-colored tags
  - `project-timeline.tsx` — scroll-driven timeline with center dashed line, animated nodes, project cards, detail modal (TerminalWindow)
  - `footer.tsx` — CSS grid background, simplified contact, monospace layout
  - `terminal-window.tsx` — shared retro container with `● ● ●` title bar
  - `retro-tag.tsx` — colored monospace tag component for skills/tech
  - `loading-screen.tsx` — Tetris auto-player loading screen (NES colors, green-themed glow)
  - `ui/dialog.tsx` — shadcn Dialog for project detail modals
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `@/*` path alias maps to project root

## Theme System

All colors defined as CSS custom properties in `:root` (`globals.css`). To add a new theme:
1. Create a class like `.theme-cyberpunk { --primary: ...; }`
2. Add that class to `<html>`
3. Override only the variables you want to change

Retro accent utility colors available: `retro-cyan`, `retro-red`, `retro-yellow`, `retro-blue`, `retro-orange`, `retro-purple`.

## Conventions

- Geist Mono primary font (monospace throughout)
- `snap-y snap-mandatory` on `<html>` — each section is a snap target
- Sections: Hero (`snap-start`) → About (`snap-start`) → TimelineHeader (`snap-center`) → Project cards (`snap-center`) → Footer (`snap-start`)
- CSS variables in `:root` on oklch/hex
- TypeScript strict mode, bundler module resolution
- Framer Motion for scroll animations: scroll transforms, spring physics, staggered reveals
- `use client` on all interactive components
- No ESLint (Next.js 16 incompatible with eslint-config-next peer deps)
- `pnpm.overrides.lodash: ">=4.18.0"` to patch recharts transitive dep

## Deploy

Ready for Vercel. Vercel Analytics kicks in automatically in production. No `vercel.json` needed — Next.js defaults work.
