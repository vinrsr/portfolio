# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js + Turbopack) at http://localhost:3000
npm run build    # Production build
npm start        # Serve the production build
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
```

There is no test suite. A Husky **pre-push** hook (`.husky/pre-push`) runs `npm run build`, so a push fails if the build fails — always confirm `npm run build` passes before pushing.

## Architecture

Single-page personal portfolio built with the Next.js App Router (`src/app`). The site is one scrollable page: `src/app/page.tsx` stacks four section components in order — `ManifestoSection`, `LabSection`, `ConnectSection`, `FooterSection`. There is effectively no routing; navigation is anchor-based via section `id`s (`#manifesto`, `#lab`, `#contact`).

`src/app/layout.tsx` is the root layout (minimal metadata + favicon). It imports `globals.css`; each section component imports its own dedicated stylesheet from `src/app/styles/` (e.g. `manifesto.css`, `lab.css`, `connect.css`, `footer.css`). Styling is plain CSS files plus Tailwind v4 — there is no CSS-module convention here.

### 3D / React Three Fiber

The visual centerpiece is interactive 3D rendered with `@react-three/fiber` and its ecosystem (`drei`, `rapier` physics, `postprocessing`). Two independent `<Canvas>` scenes exist:

- `src/components/ManifestoVisual.tsx` (`Sculpture`) — renders the 3D logo (`src/components/3d-logo/Vinrsr_logo_3d.jsx`) with a mouse-tracking `CameraRig`.
- `src/components/balls/balls.tsx` — a Rapier physics scene of floating spheres that react to a kinematic pointer collider, with N8AO post-processing.

**Client-only / hydration patterns to preserve when editing these components:**
- Any component using a `<Canvas>`, `window`, or `ReactPlayer` must be a Client Component (`"use client"`) and gate browser-only rendering behind a `hasMounted`/`isMounted` state set in `useEffect`, returning `null` until mounted. This avoids SSR/hydration mismatches — `lab.tsx`, `ManifestoVisual.tsx`, and `balls.tsx` all follow this.
- Mobile is detected ad hoc via `window.innerWidth` (e.g. `< 768` / `< 900`) to reduce work — `balls.tsx` drops the sphere count to 5 on mobile, `ManifestoVisual.tsx` shrinks the model scale. Performance on mobile is a recurring concern (see git history); keep these guards when modifying scenes.

### Conventions

- **Path alias:** `@/*` → `src/*` (e.g. `@/components/...`, `@/lib/utils`).
- **shadcn/ui** is configured (`components.json`, "new-york" style, lucide icons). UI primitives live in `src/components/ui`; `cn()` in `src/lib/utils.ts` merges class names (clsx + tailwind-merge).
- Icons come from `@iconify/react` (`<Icon icon="mdi:..." />`); some come from lucide via shadcn.
- Section reveal animations use `framer-motion` with a shared `containerVariants`/`childVariants` stagger pattern (duplicated across `manifesto.tsx` and `connect.tsx`).
- The contact form (`connect.tsx`) posts to a **Formspree** endpoint — no backend.
- Tailwind config (`tailwind.config.js`) is minimal; note its `content` globs point at `./app` and `./components` (project root), while actual code lives under `src/` — Tailwind v4 picks up classes via the PostCSS plugin regardless.
