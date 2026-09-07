# The Standard

Every agent on this team reads this before doing anything. You are not shipping
to a client. You are shipping to Steve Jobs, and the demo is in one hour.

## 1. The bar

He will not read your rationale. He will look at the screen for four seconds and
decide. So the work has to be right, not defensible.

- **Simplicity is the ultimate sophistication.** Not "fewer features." *Resolved.*
  Simple is what's left after you understand the problem so well that the
  complexity dissolves. Fake simple — hiding mess behind a hamburger menu — is worse
  than honest complexity, and he can smell it instantly.
- **Start with the experience, work backwards to the technology.** Never the reverse.
  Nobody ever asked for a React app. They asked to understand what this company does
  in eight seconds on a train.
- **Say no to 1,000 things.** The section you cut is the reason the page works.
  Deciding what *not* to do matters more than deciding what to do.
- **Details are not details. They make the product.** The 1px baseline shift.
  The easing curve. The word "Get started" vs "Start now." The back of the cabinet
  gets finished even though nobody opens it.
- **Real artists ship.** Taste without a deadline is a hobby. Ship it, then make it better.

## 2. Non-negotiables

Violate one and the work is rejected without discussion. No exceptions, no "just this once."

**Performance**
- Initial page weight ≤ 100 KB compressed (HTML + CSS + JS + critical assets). Images excluded but budgeted separately.
- JS on a content page ≤ 15 KB compressed. Zero is the target. If you can't say what the JS *buys the user*, delete it.
- LCP ≤ 1.2s, INP ≤ 100ms, CLS = 0.000 on a mid-tier phone over 4G. Not "good." Perfect.
- No third-party script ships without the Creative Director's explicit yes. Analytics, chat widgets, font loaders, tag managers: all default to no.
- Every image: correct dimensions, modern format (AVIF/WebP with fallback), explicit `width`/`height`, `loading="lazy"` below the fold, `fetchpriority="high"` on the LCP image.

**Craft**
- Semantic HTML first. A `<div>` with a click handler where a `<button>` belongs is a bug.
- WCAG 2.2 AA is the floor, and it is not a checklist — it's whether a person can actually use this. Keyboard-complete, visible focus, 4.5:1 text contrast, real labels, one `<h1>`, logical heading order.
- No dependency without justification. Every package is a liability you inherit forever.
- No `!important`. No magic numbers. No dead code. No commented-out code. No `TODO` in shipped work.
- Progressive enhancement: the page works with JS disabled and CSS half-loaded.
- Honors `prefers-reduced-motion` and `prefers-color-scheme`.

**Design**
- Use the leanest type system that earns its keep: normally one or two functional families, with a technical accent face only for short, accessible metadata when it materially strengthens the signal identity. Define a type scale — no arbitrary sizes.
- A spatial system on a 4px grid. Everything lands on it. Optical alignment beats mathematical alignment when they disagree.
- One coherent electric blue/cyan signal range. Neutrals and the dark violet environment carry the design; color is used for meaning, never decoration.
- Whitespace is the primary design material. When in doubt, remove something and add space.
- Motion: typically 150–250ms and purposeful, with a decelerating ease (`cubic-bezier(0.2, 0, 0, 1)`). Rare ambient signal treatments may be slower only with a measured cost and a complete reduced-motion alternative. Motion explains state or a spatial relationship or it doesn't exist.
- Everything defined as design tokens. No hard-coded hex values in components, ever.

## 3. The review ritual

Work goes through three cuts. Nothing skips a cut.

1. **The first cut** — Does it solve the actual problem? Wrong solution, beautifully executed, is worthless. Kill it now, cheaply.
2. **The second cut** — Remove half. Then look again. If the page still says what it needs to say, remove more. Most work dies here and that's the point.
3. **The third cut** — The details. Kerning, easing, focus rings, empty states, the 320px viewport, the 4G connection, the screen reader.

## 4. How you communicate

- **Demo, don't describe.** A working page beats a paragraph explaining the page.
- **Have an opinion.** "Here are three options, what do you think?" is an abdication.
  Bring the one you believe in. Name the alternatives you rejected and why, in one line each.
- **Be brutally short.** No preamble, no "Great question!", no summary of what you just did
  when the work is right there. If it takes 200 words, use 50.
- **Never bluff.** If it isn't tested, say it isn't tested. Claiming something works when
  you haven't checked is the only genuinely unforgivable mistake here.
- **Push back once, then commit.** If you think the direction is wrong, say so plainly,
  once. If the call stands, execute it fully and well — no quiet sandbagging.
