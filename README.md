<div align="center">

# Mihir Prajapati — Portfolio

**A motion-led portfolio for a civil estimator, quantity surveyor, and project coordinator.**

[Explore the code](https://github.com/mihirp610/Mihir-Portfolio) · [Report an issue](https://github.com/mihirp610/Mihir-Portfolio/issues)

</div>

<br />

## Built with clarity and momentum

This is a one-page professional portfolio designed to present experience, selected work, skills, education, and contact details in a focused, editorial interface. The experience pairs purposeful transitions with an accessible fallback for visitors who prefer reduced motion.

### What’s inside

- Full-screen hero with an interactive role-scramble treatment
- Scroll-linked motion, section reveals, progress indicator, and smooth scrolling
- Custom shader-line hero background powered by Three.js
- Structured sections for experience, projects, skills, education, and contact
- Accessible UI primitives from Radix UI and responsive Tailwind styling
- Contact form with client-side validation
- Server-rendered TanStack Start application, ready for Cloudflare deployment

## Technology

| Area              | Tools                                                  |
| ----------------- | ------------------------------------------------------ |
| Application       | React 19, TypeScript, TanStack Start & TanStack Router |
| Interface         | Tailwind CSS 4, Radix UI, Lucide icons                 |
| Motion & graphics | Framer Motion, Lenis, Three.js                         |
| Forms             | React Hook Form, Zod                                   |
| Tooling           | Vite 7, ESLint, Prettier                               |
| Deployment target | Cloudflare Workers via Nitro                           |

## Quick start

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm 10+

### Run locally

```bash
git clone https://github.com/mihirp610/Mihir-Portfolio.git
cd Mihir-Portfolio
npm install
npm run dev
```

Vite will print the local URL in the terminal. This project is configured to use port `8080` by default, so it is typically available at [http://localhost:8080](http://localhost:8080).

To make the dev server explicitly available on your local machine:

```bash
npm run dev -- --host 127.0.0.1
```

Stop the server at any time with <kbd>Ctrl</kbd> + <kbd>C</kbd>.

## Quality checks

Run these before opening a pull request or deploying:

```bash
# Static analysis
npm run lint

# TypeScript validation
npm run typecheck

# Type-check, then create the production build
npm run build
```

`npm run build` includes `typecheck`, so a build will fail if TypeScript reports an error. To inspect the generated production build locally, run:

```bash
npm run preview
```

## Project map

```text
src/
├── components/
│   ├── portfolio/       # Portfolio sections, animation helpers, form, and shader effects
│   └── ui/              # Reusable Radix-based UI primitives
├── hooks/               # Shared React hooks
├── lib/                 # Utilities and error handling
├── routes/              # TanStack file-based routes
├── router.tsx           # Router configuration
├── server.ts            # Server entry point
└── styles.css           # Global tokens and styles
```

## Customizing the portfolio

The page composition lives in [`src/routes/index.tsx`](src/routes/index.tsx). Each portfolio section is a focused component in [`src/components/portfolio`](src/components/portfolio), making content and presentation changes easy to isolate.

Common starting points:

| Change                                  | Where to look                                                                      |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| Page metadata and section order         | `src/routes/index.tsx`                                                             |
| Hero copy and roles                     | `src/components/portfolio/Hero.tsx`                                                |
| Professional experience and projects    | `src/components/portfolio/Experience.tsx`, `Projects.tsx`, and `FeaturedBuild.tsx` |
| Contact details and form presentation   | `src/components/portfolio/Contact.tsx`                                             |
| Global palette, typography, and spacing | `src/styles.css`                                                                   |

## Deployment

The Vite configuration generates a Cloudflare-compatible Nitro build. Create the production output with:

```bash
npm run build
```

The client files are emitted to `dist/client` and the server bundle to `dist/server`. Deployment configuration is maintained in [`wrangler.jsonc`](wrangler.jsonc).

## Contributing

Keep changes focused, run the quality checks above, and format edited files with:

```bash
npm run format
```

## Credits

Designed and developed for **Mihir Prajapati**. The interface is built with React, TanStack Start, Tailwind CSS, Framer Motion, and Three.js.
