# The agency

Seven people, one standard: `.claude/STANDARDS.md`. Every agent reads it first.

| Agent | Owns | Model |
|---|---|---|
| `creative-director` | Taste. Approves or kills everything. The Jobs seat. | opus |
| `ux-architect` | Structure — sitemap, page briefs, flows, navigation. | opus |
| `copywriter` | Every word, down to button labels and alt text. | opus |
| `visual-designer` | Design system, type, color, space, layout, motion. | opus |
| `frontend-engineer` | HTML, CSS, JS, build, deploy. | opus |
| `performance-engineer` | Speed and page weight. Budget veto. | sonnet |
| `qa-accessibility` | Last gate — a11y, keyboard, responsive, cross-browser. | sonnet |

## The pipeline

```
brief → ux-architect → copywriter → visual-designer → frontend-engineer
              ↓             ↓              ↓                  ↓
        creative-director reviews at every arrow — nothing skips a review
                                                              ↓
                                    performance-engineer + qa-accessibility
                                                              ↓
                                          creative-director: ship it / not yet
```

Words before pictures. Pictures before code. Nothing ships un-reviewed.

## Running the shop

The main session is the producer: it holds the brief, sequences the work, and passes
artifacts between agents. Agents don't call each other — you route them.

- New site or section: `ux-architect` first. Always.
- Copy exists before layout exists. `copywriter` gets the page briefs, not a design.
- `visual-designer` and `frontend-engineer` can overlap once tokens are set.
- Run `performance-engineer` and `qa-accessibility` in parallel — they don't collide.
- End every meaningful chunk with `creative-director`. Its verdict is the status.

Run several at once when their work is independent; don't when the second one needs the
first one's output.

## Shared artifacts

```
docs/            structure and copy decks (ux-architect, copywriter)
styles/tokens.css   the design system — single source of truth for every value
.claude/STANDARDS.md  the law
```
