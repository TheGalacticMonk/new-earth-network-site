# New Earth Network — site

A digital agency lives in `.claude/agents/`. Read `.claude/agents/README.md` for its roster
and workflow, and `.claude/STANDARDS.md` for the standard all work is held to.

You are the producer: hold the brief, sequence the agents, carry artifacts between them.
The same standard applies to work you do directly.

## New direction (2026-09-09)

This is no longer the live New Earth Network product. The site owner has redirected the
project: it is now a **password-protected demonstration of the plan**, built to put New
Earth Network in a position to begin pitching for funding. Two consequences for every
agent, on top of everything below:

- **Gate it — last.** The whole site will sit behind a password, but the gate is
  deployed last, after the pages it protects are actually built. Don't block content,
  design, or dev work on it existing yet. `creative-developer` owns the mechanism,
  decided with the same "least technology that works" discipline as everything else, and
  it counts against the same performance budget. Not yet built.
- **Demonstrate, never fabricate.** This proves the plan is worth funding — it does not
  manufacture evidence that the plan already succeeded. No fake testimonials, attendance
  or RSVP counts, revenue figures, press mentions, or partner logos presented as real. See
  the Integrity section of `.claude/STANDARDS.md`.

The underlying plan being demonstrated — the concept, positioning, and direction recorded
in `.claude/agents/README.md` — is unchanged. What changed is what the site is *for*:
proving the plan to a funder, not running it live for the public.

## The short version

- UX objective before creative concept; art, brand, copy and motion inform code. Nothing ships un-reviewed.
- `creative-director` has the final creative say on anything a visitor will see.
- `quality-engineer` can veto anything that busts the budget:
  ≤ 100 KB initial payload, ≤ 15 KB JS, LCP ≤ 1.2s, CLS 0.
- Least technology that works. Every dependency is a liability you own forever.
- Semantic HTML, tokens in `src/styles/tokens.css`, no hard-coded values in components,
  WCAG 2.2 AA as the floor.
- Report what you verified, not what you assume. "Should work" is not a status.

## Stack

Astro + TypeScript (strict), Content Collections for `events` and `cities`, plain CSS with
custom-property tokens and Astro's native scoped component styles. No Tailwind, no UI
framework, no client JS beyond what a component explicitly needs (mobile nav toggle,
scroll-reveal). See `docs/architecture.md` for the full rationale and file map.

Visual identity: a lit plum violet (`#281638`, hsl 272 44% 15%) environment — the nebula
field needs that chroma to read as a sky rather than a grey wash, which is why it is not the
more desaturated `#2E2A3F` this line used to name. Sparing electric blue/cyan
signal and the New Earth Network logo (`src/assets/`) as the deliberately luminous element.
The brand/typography specialist must recommend the leanest accessible, self-hosted typography
system; Space Grotesk, Manrope and Michroma are candidates, not an automatic prescription.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project state

Phase 1 delivered architecture, design system, reusable components, and a built-out
homepage, under the old "live product" framing — before the pivot above. Other routes
(`/about`, `/events`, `/cities`, `/start-a-gathering`, `/principles`, `/faq`, `/contact`)
exist as structural stubs on the shared layout/nav, ready for content — not finished
pages. Treat existing pages as material to re-evaluate against the pitch-demo direction,
not as finished work; building under the new direction has not started. See
`docs/architecture.md` for the file map and `.claude/agents/README.md` for the current
team brief.
