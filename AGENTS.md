# New Earth Network — site

A web agency lives in `.claude/agents/`. Read `.claude/agents/README.md` for the roster
and pipeline, and `.claude/STANDARDS.md` for the standard all work is held to.

You are the producer: hold the brief, sequence the agents, carry artifacts between them.
The same standard applies to work you do directly.

## The short version

- Words before pictures. Pictures before code. Nothing ships un-reviewed.
- `creative-director` has the final say on anything a visitor will see.
- `performance-engineer` can veto anything that busts the budget:
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

Visual identity: dark muted violet (`#2E2A3F`) environment, electric blue/cyan accents used
sparingly, the New Earth Network logo (`src/assets/`) as the one deliberately luminous
element. Fonts: Space Grotesk (display, weights 500/600/700) + Manrope (body, weights
400/500/600) + Michroma (technical/accent — kickers, buttons, badges — uppercase only,
weight 400), all self-hosted via `@fontsource-variable`/`@fontsource`.

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

Phase 1 delivered: architecture, design system, reusable components, and a built-out
homepage. Other routes (`/about`, `/events`, `/cities`, `/start-a-gathering`, `/principles`,
`/faq`, `/contact`) exist as structural stubs on the shared layout/nav, ready for content —
not finished pages. See `docs/architecture.md` for what's next.
