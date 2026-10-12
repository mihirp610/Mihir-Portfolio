# UI quality gate

Any change touching UI, routes, styles, or copy MUST: (a) add or update tests in `tests/ux/` for changed pages, components, and flows; (b) update `docs/testing/USER_FLOWS.md` when the user task changes; (c) run `npm run test:ux`; and (d) not be considered done until the responsive suite passes at all configured viewports.

Commands: `npm run test:ux`, `npm run test:ux:mobile`, `npm run test:ux:visual`, `npm run test:a11y`, and `npm run test:ux:update-snapshots`. Visual baselines live beside their specs under `tests/ux/*.spec.ts-snapshots/` and must be reviewed before committing. The pre-push hook runs `npm run test:ux:smoke`; `npm install` activates it through `prepare`.

Public routes are registered in `tests/ux/routes.ts`; add each new route there. The route-coverage test fails if the registry and generated TanStack routes diverge.
