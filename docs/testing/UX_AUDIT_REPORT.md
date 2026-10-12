# UX audit report

## Scope and result

Audit date: 2026-10-12. Inventory: 1 public route (`/`), 3 documented critical flows, no authentication, remote-data, modal, or server error/empty state flows. The interaction inventory covers anchor navigation, mobile navigation, project gallery controls, and the client-side contact form.

The Chromium 390×844 smoke audit passed: 6/6 tests (100%). It exercised runtime/network error capture, overflow, 44px touch targets, keyboard focus, WCAG 2.2 AA axe rules, navigation under rapid interaction, invalid/Unicode/long form input and duplicate submission, gallery state, and browser history recovery. `npm run typecheck` passes. Lint has 7 pre-existing React fast-refresh warnings and no errors.

The permanent suite is configured for 13 viewports × Chromium, Firefox, and WebKit (39 projects), dark mode and reduced motion. The local Firefox binary on this macOS runner cannot create its temporary profile (`Could not find profile folder`); Firefox is still present in CI and is not removed or skipped there. Chromium baselines were generated; visual runs intentionally do not auto-accept future changes.

## Defects found and disposition

| ID | Severity | Category | Page / viewport | Finding and reproduction | Resolution |
| --- | --- | --- | --- | --- | --- |
| UX-001 | High | Performance / console | `/`, reduced motion, Chromium 390×844 | Load with `prefers-reduced-motion: reduce`; React logged an SSR hydration mismatch because motion preference differed between server and first client render. | Fixed in `src/hooks/use-reduced-motion.ts`; its initial client state matches SSR, then updates after hydration. |
| UX-002 | High | Accessibility | `/`, Chromium 390×844 | Run axe; muted text (including gallery instruction/status) was below AA contrast. | Fixed by raising `--muted-foreground`, removing the low-opacity gallery label, and making decorative marquee text meet contrast. |
| UX-003 | High | UX logic | Contact flow, all sizes | Submit valid fields; the UI previously said “Message sent” but did not transmit anything. | Fixed in `ContactForm.tsx`: it creates a populated `mailto:` draft and says that the email client was opened. Delivery remains the user’s email-client action. |
| UX-004 | Medium | Responsive / interaction | Touch widths | Menu, gallery dots, and several text links had undersized hit areas. | Fixed with 44×44 coarse-pointer targets; automated touch audit enforces it. |
| UX-005 | Medium | Accessibility / navigation | Anchored sections | Follow a navigation anchor; a fixed header could obscure the destination; keyboard focus had no explicit treatment. | Fixed with section scroll margin and a visible `:focus-visible` ring. |

No Critical defects remained after the fixes. Screenshots/traces on a failure are stored in `test-results/` and uploaded by CI; none are required for the passing smoke result.

## Open items and limits

- Local Firefox execution is blocked by its Playwright profile-launch failure on this machine, not by an app assertion. CI installs and executes Firefox. Reinstalling the local Firefox binary did not resolve it.
- “Email client opened” cannot prove that the visitor sends the email; the form deliberately does not use a production service or test credentials.
- Automated checks cannot judge comprehension, credibility, emotional response, content hierarchy, or actual screen-reader behavior.

## Human validation plan

Run five 20–30 minute moderated think-aloud sessions with consent, including mobile and keyboard/screen-reader users and people with varied construction-industry familiarity. Ask participants to identify relevant experience, compare projects, and start an enquiry without naming controls. Record task completion, time, errors, confidence, and verbatim confusion points; de-identify notes and prioritize recurring issues. Validate the contact email handoff on participants’ real email clients.
