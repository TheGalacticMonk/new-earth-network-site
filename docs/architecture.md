# Architecture — Phase 1

## Stack decision

**Astro + TypeScript (strict) + Content Collections.** No UI framework, no Tailwind.

Why: the brief calls for near-zero client JS, static output, and events/cities that
become data-driven "rather than hardcoded." Astro ships zero JS by default (islands —
you only pay for the interactivity you explicitly add), and Content Collections give
typed schemas for `events`/`cities` now that can point at a real CMS or API later
without touching a single template. Plain CSS with custom-property tokens plus Astro's
native per-component scoped `<style>` keeps the dependency count at just Astro + two
font packages — every dependency is a liability the team owns forever, so we didn't
reach for one we didn't need.

Verified: `npx astro check` — 0 errors. `npm run build` — 15 static pages, no errors.

## Fonts

Three families, each with one job — never mixed outside that job:

- **Display** — `@fontsource-variable/space-grotesk`. Headings and hero/manifesto
  display text. Weights 500/600/700 (h3/h4 500, h2 600, h1 and the hero headline 700
  with tighter tracking — `--tracking-tighter`, `-0.04em` — so the giant headline reads
  dense and confident rather than loose).
- **Body** — `@fontsource-variable/manrope`. Everything read at length. Weights
  400/500/600.
- **Accent** — `@fontsource/michroma` (static, weight 400 only — Michroma has no other
  weight). Uppercase-only, generously tracked (`--tracking-widest`, `0.14em`): kickers,
  button labels, footer column headings, date badges, status/RSVP micro-copy. Never set
  in mixed case — it's designed as a display-caps face and looks wrong otherwise.
  Reserved for short strings (a word or two); longer incidental uppercase text
  (breadcrumbs, location strings, form labels) stays on the body font so nothing wraps
  awkwardly against Michroma's wide letterforms.

All self-hosted, `font-display: swap`, zero runtime JS.

History: shipped first with Space Grotesk + Inter, which read as geometric and
technically precise — closer to a briefing-room dossier than a community events brand.
Tried Bricolage Grotesque + Manrope for warmth, which fixed the tone but lost some of
the brand's "signal/beacon" precision. Landed here: Space Grotesk stays for headlines
(bumped to bolder weights and tighter tracking so it reads as confident/broadcast, not
thin/technical), Manrope stays for body warmth, and Michroma is layered in specifically
for the small uppercase moments — giving those a genuine "technical readout" character
(a TV lower-third, a signal timestamp) without letting that quality dominate the whole
page the way an all-Space-Grotesk, all-caps treatment did before.

## Design tokens

Single source of truth: `src/styles/tokens.css`. Every color, size, radius, shadow,
and timing value used in a component references a token — nothing is hard-coded.
The brand's dark violet / electric cyan palette is fixed regardless of system color
scheme (this identity has no light theme by design — see the comment in the file).

Type scale is fluid (`clamp()`), space is a 4px grid, motion is 150–400ms with a
decelerating ease. Verified all token color pairings actually used in the UI against
WCAG 2.2 AA: the weakest pairing (muted text on the elevated card surface) is 5.0:1,
comfortably over the 4.5:1 floor for body text.

## Content layer

`src/content.config.ts` defines two collections:

- **`events`** — title, city, venue, address, date, time, image, description, RSVP URL,
  status (`open` / `few-spots` / `full` / `past`), capacity.
- **`cities`** — name, region, country, image, summary, status (`active` / `launching`),
  organizer name.

Mock entries live in `src/content/events/*.md` and `src/content/cities/*.md` — plain
frontmatter, no fabricated photography or stats. Swapping this for a headless CMS or
API later means writing a new loader in `content.config.ts`; every page and component
that calls `getCollection()` keeps working unchanged.

## Component architecture

**Primitives** (`src/components/`) — genuinely reused across multiple pages:

| Component | Purpose |
|---|---|
| `Container` / `Section` | Layout and vertical-rhythm wrappers |
| `Button` | Renders `<a>` or `<button>` depending on whether `href` is passed — never a div pretending to be either |
| `Logo` | Optimized `<Image>` wrapper, full lockup or icon-only crop |
| `SectionHeader` | Kicker + heading + optional description, used by every major section |
| `EventCard` / `CityCard` | Render one `CollectionEntry` each; honest placeholder treatment (no fake stock photography) when no image exists yet |
| `CTASection` | Reusable centered call-to-action block |
| `Navigation` / `MobileNavigation` | Header + full-screen mobile menu (see a11y note below) |
| `Footer` | Sitewide footer |
| `AmbientField` | The nighttime backdrop — a soft directional glow plus a deterministic, build-time-generated starfield. Pure CSS, no canvas, no images, no JS |

**Homepage sections** (`src/components/home/`) — composed once, on `index.astro`, not
reused elsewhere, so they aren't in the shared primitives folder: `Hero`, `Manifesto`,
`UpcomingGatherings`, `FindYourCity`, `WhatHappens`, `StartGathering`, `CommunityProof`,
`EmailSignup`.

## Routing

```
/                       homepage (fully built)
/about                  stub — structure + one paragraph
/events                 real: lists all upcoming events from the collection
/events/[slug]          real: renders one event's data
/cities                 real: lists all cities from the collection
/cities/[slug]          real: renders one city + its upcoming events
/start-a-gathering      stub with real 3-step organizer flow copy
/principles             stub
/faq                    real: renders a small FAQ list
/contact                real form (client-side acknowledgment; no backend yet)
```

"Stub" means the route exists on the shared layout/nav with correct heading structure
and honest placeholder copy — not a 404, not lorem ipsum, but not finished content.

## A fix worth knowing about

`Navigation`'s header uses `backdrop-filter` for the frosted sticky-nav effect.
`backdrop-filter` (like `transform`/`filter`) creates a new containing block for
`position: fixed` descendants. The mobile nav panel was originally nested inside the
header and got trapped inside its 64px box instead of covering the viewport — found
during a live-browser mobile check, not by reading the code. Fixed by rendering
`MobileNavigation` as a sibling of `<header>` instead of a child. The mobile menu also
got a proper focus trap, Escape-to-close, and focus restored to the toggle button on
close — it's a full-screen dialog, so it's held to modal-dialog a11y rules.

## Performance, measured

- Homepage HTML + CSS: **~11.2 KB gzipped** (budget: 100 KB)
- Inline JS (nav toggle + form acknowledgment): **~700 bytes raw**, inlined directly
  in the HTML — no separate JS request (budget: 15 KB)
- Logo hero image: optimized to WebP at build time, **1.3 MB → 13 KB**
- All 15 routes build successfully; 0 broken internal links checked

Not yet measured: real Core Web Vitals (LCP/INP/CLS) on a throttled connection —
that needs a Lighthouse run against a deployed or tunneled URL, which is the natural
first step of the next phase.

## Recommended next phase

1. **Real photography** replacing the three honest placeholders (What Happens, City
   cards without images, Community section) — the single biggest visual upgrade
   available, and the brief was explicit about not fabricating it in phase 1.
2. **Finalize long-form copy** — About, Principles, and the manifesto section were
   deliberately left concise/placeholder per the brief.
3. **Wire a real backend** for the email signup and contact form (an ESP for signup,
   a form service or email API for contact) — both are marked in code comments where
   to plug it in.
4. **Lighthouse audit against a deployed URL** to confirm real-device LCP/INP/CLS,
   plus a full keyboard/screen-reader pass on the pages built this phase.
5. Decide on hosting/deploy target (Netlify, Vercel, Cloudflare Pages all work with
   zero config changes to this Astro static setup) and wire CI.
