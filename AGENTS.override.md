# New Earth Network — Codex instructions

A digital agency lives in `.codex/agents/`. Read `.codex/agents/README.md` for its roster
and workflow, and `.codex/STANDARDS.md` for the standard all work is held to.

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

## Current brief and project state

Read `.codex/agents/README.md` for the updated online/offline direction and documented
homepage drift. Media is the signal; gatherings are the connection. Every media entry
must lead to a dated, located gathering or a theme that leads to one. Gathering
hierarchy outranks subscriptions. Do not expand the drifted IA/copy before UX and copy
briefs exist; keep user-requested bounded refinements within their authorized scope.
Inspect the actual files before treating historical Phase 1 notes as current state.

## Codex agency operation

The eight `.codex/agents/*.toml` files define the role briefs. Use the matching custom
agent when available; otherwise pass its developer_instructions and shared brief to
the session subagent. The producer routes handoffs, assigns non-overlapping files,
and requests creative and quality review at the appropriate stages. Session labels
are not additional roles. Only delegate bounded work that benefits from a specialist.

This override is for Codex. Do not edit `.claude/`, `CLAUDE.md`, or `AGENTS.md` while
maintaining it. `CLAUDE.md` is a symlink to `AGENTS.md`; preserve both bytes and link.
The user's latest direction takes precedence over historical role examples. Read the
shared Codex brief before any role-specific brief, and report verification limits.
