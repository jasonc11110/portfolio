# jasonc11110-portfolio

Portfolio site for jasonc11110. Built with Next.js 16 (App Router), Tailwind v4, shadcn/ui.

## Commands

```sh
pnpm dev          # dev server (Turbopack)
pnpm dev --host 0.0.0.0  # dev server on local network
pnpm build        # production build (includes TypeScript check)
pnpm start        # production server
pnpm lint         # TypeScript type-check (tsc --noEmit)
```

> **Troubleshooting — EACCES / port in use:** If `pnpm dev` fails with `EACCES: permission denied`, Hermes may be occupying port ranges. Run `netsh interface ipv4 show excludedportrange protocol=tcp` to check. If port 3000 falls in an excluded range, stop Hermes or use a different port (`pnpm dev -p <port>`).

## Architecture

- `app/layout.tsx` — root layout: three fonts (Geist sans, Geist Mono, Instrument Serif display), SEO metadata, Vercel Analytics (prod only). No client-side providers.
- `app/page.tsx` — single page: SiteHeader → Hero → Work → About → Footer.
- `app/globals.css` — editorial monochrome tokens (paper / ink / hairlines), type mapping, `.label` micro-label utility, `.rise` entrance animation, reduced-motion handling.
- `components/`:
  - `site-header.tsx` — static hairline header: serif wordmark, plain nav links, email.
  - `hero.tsx` — asymmetric 12-column hero: role label, large serif statement, supporting paragraph, and a right-hand definition list (focus / stack / currently / elsewhere).
  - `work.tsx` — project index as a hairline-divided list with grayscale thumbnails, year, stack line; clicking a row opens a detail dialog. Client component.
  - `about.tsx` — two-column editorial spread: sticky section label + bio prose + grouped toolkit table.
  - `footer.tsx` — contact section: large serif email link, elsewhere links, colophon bar.
  - `ui/dialog.tsx` — shadcn Dialog used for project details (decoration overridden per instance).
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `@/*` path alias maps to project root
- `public/marvel.html` + `app/api/marvel/route.ts` — hidden shared MCU checklist at `/marvel` (rewrite in `next.config.mjs`), unrelated to the portfolio design.

## Theme System

All colors are CSS custom properties in `:root` (`globals.css`). The palette is deliberately monochrome — black ink on warm paper with a single hairline gray. There is no accent color: hierarchy comes from scale, weight, and spacing.

To change themes, override variables under a class (e.g. `.theme-ink { --background: ...; }`) and add it to `<html>`. Keep the palette near-monochrome; a bright accent is what makes a minimal page look generic.

## Design Rules

- **Type**: Instrument Serif for display headings only; Geist sans for UI and body; Geist Mono for micro-labels and metadata (`11px`, uppercase, `0.18em` tracking). Never set body copy in mono.
- **Rules, not boxes**: separate content with `border-border` hairlines. Avoid cards, shadows, rounded containers, and colored tags.
- **Composition**: asymmetric grids (`grid-cols-12`, label column + content column). No centered stacks; the hero is a Decide/Learn surface, not a dashboard.
- **Imagery**: project screenshots keep their real color inside hairline frames — the page stays monochrome, the work doesn't.
- **Motion**: CSS `.rise` on hero elements only, respecting `prefers-reduced-motion`. No parallax, scroll-jacking, snap sections, mouse trails, scanlines, or loading screens.
- **No filler**: no fake metrics, decorative stats, icon toppers, gradients, or glassmorphism.

## Conventions

- TypeScript strict mode, bundler module resolution
- `use client` only where interaction requires it (`work.tsx`); everything else is a server component
- Sections use `border-b border-border` and generous vertical padding (`py-20 md:py-28`)
- Anchor targets: `#top` (page wrapper), `#projects`, `#about`, `#contact`
- No ESLint (Next.js 16 incompatible with eslint-config-next peer deps)
- `pnpm.overrides.lodash: ">=4.18.0"` to patch recharts transitive dep

## Debugging Workflow

When something is broken or not working as expected, follow this delegation pattern:

1. **@oracle diagnoses** — Delegate the bug to @oracle for root-cause analysis. @oracle reads the code, identifies the bug, and produces a clear diagnosis with specific file paths, line numbers, and what needs to change.
2. **@fixer fixes** — Pass @oracle's diagnosis to @fixer for implementation. @fixer makes the targeted changes based on @oracle's findings.

This separation saves tokens: @oracle is expensive and should only diagnose, not implement. @fixer is fast and cheap for execution.

**Rule of thumb:** Bug found? → @oracle analyzes → @fixer implements. Never let @oracle both diagnose and fix.

## Deploy

Ready for Vercel. Vercel Analytics kicks in automatically in production. No `vercel.json` needed — Next.js defaults work.
