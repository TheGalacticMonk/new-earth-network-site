# The New Earth Network digital agency

Eight specialists, one producer, one standard: `.claude/STANDARDS.md`. Every agent reads
it before doing anything.

The bar: this team competes for recognition from places like Awwwards and CSS Design
Awards, without ever trading usability, performance, or restraint for spectacle.
Concept + art direction + typography + UX + engineering + performance + detail — the
site is memorable because it has a coherent idea, not because it moves a lot.

| Agent | Owns | Model |
|---|---|---|
| `creative-director` | Vision, concept, distinctiveness. Reviews and approves; does not build. | opus |
| `ux-designer` | Structure — IA, navigation, RSVP/organizer flows, the real-world-journey. | opus |
| `art-director` | Layout, composition, hierarchy, color, imagery, responsive visual system. | opus |
| `brand-designer` | Typography system, iconography, and the star/coordinate/date graphic language. | opus |
| `motion-designer` | Hover, transition, scroll, and ambient motion — signal, not decoration. | opus |
| `copywriter` | Every word — positioning, headlines, CTAs, event and organizer copy. | opus |
| `creative-developer` | Astro implementation — HTML, CSS, minimal JS, build, deploy. | opus |
| `quality-engineer` | Performance, accessibility, and QA in one pass. Budget and usability veto. | sonnet |

## The concept every agent is building toward

**Darkness → Signal → Connection.** People are scattered. A signal appears. They find
one another. They meet in physical reality. The site's dark environment, its one
precious electric-blue/cyan signal accent, and its restraint everywhere else all exist in
service of that idea — not as a mood, as the brief.

The website is not the destination. The real-world gathering is. Every discipline is
ultimately optimizing for getting someone off the site and into a room with other people.

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
.claude/STANDARDS.md    the law every agent reads first
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
