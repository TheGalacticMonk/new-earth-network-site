# New Earth Network — site

A digital agency lives in `.claude/agents/`. Read `.claude/agents/README.md` for its roster
and workflow, and `.claude/STANDARDS.md` for the standard all work is held to.

You are the producer: hold the brief, sequence the agents, carry artifacts between them.
The same standard applies to work you do directly.

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

Phase 1 delivered: architecture, design system, reusable components, and a built-out
homepage. Other routes (`/about`, `/events`, `/cities`, `/start-a-gathering`, `/principles`,
`/faq`, `/contact`) exist as structural stubs on the shared layout/nav, ready for content —
not finished pages. See `docs/architecture.md` for what's next.
