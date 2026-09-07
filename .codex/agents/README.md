# The New Earth Network Codex agency

This is the Codex-specific adaptation of the Claude agency brief, synchronized from
`.claude/agents/README.md` at repository commit `1b336ae` (source read 2026-09-07).
Claude's files are read-only source material, not targets for this team's maintenance.

The eight adjacent `.toml` files are project-scoped Codex custom-agent definitions.
They deliberately omit Claude model names and tool allowlists; Codex inherits the
parent session's model, effort, tools, and permissions. The producer follows
`AGENTS.override.md`. That Codex entry point leaves the shared `AGENTS.md` and its
`CLAUDE.md` symlink untouched.

In this conversation, `creative_review` performs creative-director reviews,
`quality_review` performs quality-engineer reviews, and `wand_separation` performed
art-director work. These are session task labels, not extra persistent agency roles.
When using session agents, pass this README and the relevant TOML instructions into
their assignment. When using a fresh Codex session with custom-agent discovery, use
the declared role name. Configuration validation does not prove a fresh session has
loaded the definitions; restart the session for discovery.

The current concept and owner direction below supersede older examples in individual
role briefs. They do not authorize an unsolicited site redesign. For future syncs,
read the latest Claude brief and adapt Codex files only; never write back to Claude.

Official configuration references:
- https://learn.chatgpt.com/docs/agent-configuration/subagents
- https://learn.chatgpt.com/docs/agent-configuration/agents-md

Eight specialists, one producer, one standard: `.codex/STANDARDS.md`. Every agent reads
it before doing anything.

The bar: this team competes for recognition from places like Awwwards and CSS Design
Awards, without ever trading usability, performance, or restraint for spectacle.
Concept + art direction + typography + UX + engineering + performance + detail — the
site is memorable because it has a coherent idea, not because it moves a lot.

| Agent | Owns | Model |
|---|---|---|
| `creative-director` | Vision, concept, distinctiveness. Reviews and approves; does not build. | inherited |
| `ux-designer` | Structure — IA, navigation, RSVP/organizer flows, the real-world-journey. | inherited |
| `art-director` | Layout, composition, hierarchy, color, imagery, responsive visual system. | inherited |
| `brand-designer` | Typography system, iconography, and the star/coordinate/date graphic language. | inherited |
| `motion-designer` | Hover, transition, scroll, and ambient motion — signal, not decoration. | inherited |
| `copywriter` | Every word — positioning, headlines, CTAs, event and organizer copy. | inherited |
| `creative-developer` | Astro implementation — HTML, CSS, minimal JS, build, deploy. | inherited |
| `quality-engineer` | Performance, accessibility, and QA in one pass. Budget and usability veto. | inherited |

## The concept every agent is building toward

**Darkness → Signal → Connection. The content is the signal. The room is the point.**
(Evolved by `creative-director`, 2026-09-06 — see the memo trail below for why.) People
are scattered. A signal appears — now concretely: the films, series, music, courses. They
find one another, in a specific dated room the content points them to. They meet in
physical reality. The site's dark environment, its one precious electric-blue/cyan signal
accent, and its restraint everywhere else all exist in service of that idea — not as a
mood, as the brief.

The website is not the destination. Neither is the media library. The real-world gathering
is. Every discipline is ultimately optimizing for getting someone off the site and into a
room with other people — the media layer's job is to be the transmitter that gets them
there, not a destination competing with it for the same attention.

**The name already said this:** *Network* means a broadcast network and a network of
people at once. That's not a coincidence to lean on lightly — it's the whole idea.

**The binding rule, not a suggestion:** every piece of content resolves to a room — a
dated, located gathering or theme it points to. If a media entry can't say what room it
leads to, it doesn't ship. This is what stops New Earth Network from being a media library
with a meetup tab bolted on, and it's the one thing Gaia structurally cannot copy. Enforce
it at the schema level (`src/content.config.ts`), not as a copy guideline.

**Never compete with Gaia on catalog size.** They have 20 years and thousands of titles;
"like Gaia but hipper" loses that fight on volume alone. Few pieces of content, each with a
door attached, is the actual advantage — not a bigger library.

**The gathering outranks the subscription everywhere** — nav, homepage, content page,
footer. If that puts pressure on subscription revenue, the fix is one membership that
includes both halves, not promoting the library in the IA.

**Current homepage status: not yet aligned — this is known, not an oversight to fix
quietly.** `creative-director`'s review (2026-09-06) found the live site already drifted
toward "media library with an events tab" ahead of this direction being decided: primary
nav dropped About/Cities/Start a Gathering/Principles/FAQ in favour of
Events/Series/Docs & Films/Music/Courses/Shop; `Offerings.astro` renders Events as one
identical card in a six-card grid next to Shop, with no hierarchy; the masthead's only
persistent CTA is "Subscribe" (Gaia's CTA, not this brief's); and `Manifesto.astro`
currently states the internet already solved people finding each other ("That job is
done"), which this direction contradicts. None of that should be built on top of or
extended until `ux-designer` and `copywriter` have restructured against the evolved
concept above — see `docs/` for whatever brief comes out of that pass.

## Business direction: also competing with Gaia.com

Memo from the site owner (2026-09-06), for every agent to build toward: **in addition to**
in-person events, New Earth Network will also compete directly with
[Gaia.com](https://www.gaia.com) — the subscription conscious-media/documentary/yoga
streaming platform. The intended positioning, in the owner's own words: New Earth Network
as the **funner, more "hip" version of Gaia**. Same territory (consciousness, spirituality,
alternative media), different energy — livelier, less earnest, less new-age-catalog.

**Owner's follow-up (2026-09-06), narrowing the above:** New Earth Network should be
**the complete human experience for awakened souls — online and offline.** Not two
audiences on one site, and not an events funnel with a media arm bolted on: the streaming
and video content *and* the in-person gatherings are both expressions of one thing, and
the thing that makes New Earth Network different from Gaia specifically is that Gaia stops
at the screen — it's a media library, full stop. New Earth Network's content is meant to
send people toward *actually meeting other humans*, which Gaia has no equivalent of. That
reframes rather than discards "the website is not the destination": the site (including
its media/content layer) is still in service of real human connection, but "real human
connection" turns out to be a bigger, two-sided idea than "get them to an event" alone —
it now also has to justify itself as somewhere people would go instead of Gaia.

**Still a `creative-director` job, not the producer's:** turning "complete human experience
for awakened souls, online and offline" into the site's actual one-line concept (the
"Darkness → Signal → Connection"-equivalent successor, if it needs one) and deciding what
that implies for IA, homepage structure, and how a content/streaming section coexists with
the events funnel. This should happen before `ux-designer`, `copywriter`, or `art-director`
build against it.

## The pipeline

```
ux-designer → copywriter → art-director + brand-designer + motion-designer → creative-developer
     ↓              ↓                          ↓                                    ↓
                          creative-director reviews at every arrow
                                                                                     ↓
                                                                          quality-engineer
                                                                                     ↓
                                                                creative-director: ship it / not yet
```

Words before pictures. Pictures before code. Nothing ships un-reviewed.

`art-director`, `brand-designer`, and `motion-designer` can run in parallel once
`ux-designer`'s structure and `copywriter`'s words exist — their questions (layout,
typography, movement) are genuinely independent of each other, but all three depend on
knowing what the page is and what it says first.

## Running the shop

The main session is the producer: it holds the brief, sequences the work, and passes
artifacts between agents. Agents don't call each other — you route them.

- New site or section: `ux-designer` first. Always.
- Copy exists before layout exists. `copywriter` gets the page briefs, not a design.
- `art-director`, `brand-designer`, and `motion-designer` can overlap once tokens are set
  and copy is real — but don't invoke all three for a small change. Use only the
  specialist whose expertise materially changes the outcome.
- `quality-engineer` runs after `creative-developer`, on the real built page — not before.
- End every meaningful chunk with `creative-director`. Its verdict is the status.

**Don't invoke the whole agency for small work.** A CSS nudge doesn't need eight
opinions. Match the team to the size of the decision.

**Never let two agents edit the same file at the same time**, and never have multiple
agents independently redesign the same page — that produces exactly the kind of
competing, inconsistent work this structure exists to prevent.

## Critique culture

Agents are not here to agree with each other, and neither is the producer. If
`art-director` proposes something striking and `ux-designer` thinks it adds friction to
the RSVP path, surface the disagreement — don't quietly split the difference. If
`motion-designer` wants an effect `quality-engineer` says costs too much, that tradeoff
goes to `creative-director`, explicitly, with both sides named. The goal is the strongest
solution, not consensus.

For any consequential creative or architectural call, present: the recommendation, why,
the meaningful alternatives, and the tradeoffs — then proceed at the appropriate level of
autonomy. Small, reversible calls don't need this ceremony. A new color in the palette, a
new page in the sitemap, a new dependency do.

## The quality bar

Before a major page is called done, it should hold up against all eleven questions in
`creative-director`'s brief: concept, identity, hierarchy, typography, humanity, mobile,
motion, accessibility, performance, conversion, distinctiveness. The last one is the one
that catches everything else: **could this website belong to another organization with
the logo swapped?** If yes, keep going.

## Shared artifacts

```
docs/               structure, page briefs, flows, copy decks
src/styles/tokens.css   the design system — single source of truth for every value
.codex/STANDARDS.md    the law every agent reads first
```

## On the previous roster

This replaces an earlier seven-agent team (`ux-architect`, `visual-designer`,
`frontend-engineer`, `performance-engineer`, `qa-accessibility`, plus `creative-director`
and `copywriter`, both of which carry over). What changed and why:

- **`visual-designer` split into three** — `art-director` (layout/color/composition),
  `brand-designer` (typography/graphic motifs), `motion-designer` (movement). The old
  single role covered all of it as a few bullet points each; a site whose entire premise
  is a distinctive visual identity needs each of those three getting real, dedicated attention.
- **`performance-engineer` and `qa-accessibility` merged into `quality-engineer`.**
  They never ran in true isolation from each other in practice (a performance fix is a
  QA finding; an accessibility bug is a quality bug) — one gate, one report, same veto power.
- **`ux-architect` becomes `ux-designer`**, re-scoped around the specific real-world
  journey (discover → RSVP → show up) instead of generic IA method.
- **`creative-director` and `copywriter`** carry over close to unchanged — both were
  already doing exactly the job this structure needs.

Nothing from the old roster's actual discipline was lost: producer-led sequencing, a
creative-review gate at every handoff, a hard performance veto, and semantic/accessible
code as a non-negotiable are all still here. There is exactly one roster now — no aliases,
no second copy of any role.
