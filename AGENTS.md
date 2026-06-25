# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with HMR (http://localhost:5173)
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

## Architecture

This is a **React 19 + Vite** single-page app for K2 Journeys, a travel company. The app uses `react-router-dom` v7 with `BrowserRouter`.

**Routing** (`src/App.jsx`): Root `/` redirects to `/about`. Two routes: `/about` → `AboutPage`, `/contact` → `ContactPage`. A minimal `Navbar` (in `src/Navbar.jsx`) renders above all routes with React Router `<Link>` elements.

**Pages** live in `src/pages/`:
- `AboutPage.jsx` — a fully self-contained page component with its own internal navbar, hero, "Our Journey" timeline, and team section. All styling is done with inline `style` props using a teal/rose/gold color palette (`#1F8A8C`, `#D45B72`, `#D79A3B`) on a dark navy (`#0D1321`) or warm off-white (`#F4F0E8`) background. Uses `lucide-react` icons. Loads Inter + Playfair Display from Google Fonts via an injected `<style>` tag.
- `ContactPage.jsx` — uses CSS Modules (`ContactPage.module.css`) for styling. Has a controlled contact form with local `submitted` state; no backend integration, submission is purely client-side.

**Styling approach is mixed**: `AboutPage` uses inline styles exclusively; `ContactPage` uses CSS Modules. `src/index.css` defines global CSS custom properties (light/dark color tokens) and base typography, though `AboutPage` overrides these entirely with its own inline styles.

**Icons**: `lucide-react` is the icon library. `AboutPage` also has a few hand-rolled inline SVG icons for flag/map/users.

## Key Notes

- `AboutPage` contains its own duplicate navbar (separate from `src/Navbar.jsx`) styled for the K2 Journeys brand — the `src/Navbar.jsx` is rendered by `App.jsx` above it, creating two navbars on that route. This is likely intentional during development.
- There is no backend, API layer, or state management library. All state is local React `useState`.
- No TypeScript — the project is plain JSX.
