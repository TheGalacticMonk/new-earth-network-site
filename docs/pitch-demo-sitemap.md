# Page brief & sitemap — the New Earth Network pitch demo

Owner: `ux-designer`. Status: ready for `copywriter`.
Date: 2026-09-09. Supersedes the consumer-site IA for every route listed here.
Verified against the repo, not assumed: routes in `src/pages/`, collections in
`src/content.config.ts` (`events`, `cities`) plus the unregistered `src/content/signals/`
directory, the six-item nav in `src/components/Navigation.astro`, and the fact that
`src/pages/index.astro` currently renders only `Hero` and `Offerings`.

---

## 0. The decision this document makes

**Two layers, one site. A pitch spine at `/`, and a walkable product demo under `/demo/`.**

Not one long page. Not two sites. The pitch page argues; the demo proves. The funder's
canonical path is the pitch scroll, which is complete and closes on its own; the demo is
entered once, deliberately, from inside it, and every demo screen carries a way back.

Why not fold the product into the scroll as device mockups: see §8.

---

## 1. Who is actually here

**Primary — and there is only one: the funder.** A person who has been sent a link and a
password, who has seen a hundred decks, who is deciding in the first four seconds whether
this is a real company or a mood board. They arrive with three questions in this order:
*what is this, why won't Gaia just do it, and what do you want from me.*

Two people they are *watching* — never designed for separately, never given their own
route:

- **The scattered newcomer** the product is really for. The funder's judgment of this
  company is mostly a judgment of whether this person would show up. Every screen under
  `/demo/` is that person's screen, played back.
- **The person in a city with no room**, who becomes a host. The funder reads this as the
  supply-side scaling question. It is why `/demo/start-a-gathering` is in the sitemap and
  `/demo/cities/[slug]` is not.

A funder reads on a phone, forwarded, between two other meetings, as often as at a desk.
375px is the canvas here for the same reason it is for the product. See §7.

---

## 2. The one job of this site

**Convince one funder that the room is the business — and let them prove it to themselves
by walking the product for ninety seconds — so they take the next meeting.**

Everything on this site is measured against "did they book the conversation." Not
time-on-page, not sections read. If a section does not make that yes more likely or more
honest, it is not in the sitemap.

The single primary action of the entire site, appearing in exactly one place: **the ask
section's "Start the conversation."** Every other section has no CTA, by design. The one
exception is the single hand-off into the demo, which is a *lateral* action, not a
competing one, and it returns.

---

## 3. Sitemap

One line of justification each. Anything not on this list does not exist.

### The pitch spine

| Route | Job in the journey |
|---|---|
| `/gate` (or middleware-rendered at any route) | The funder's first four seconds. It is the first impression, not a turnstile. |
| `/` | The whole argument, one scroll, ends in the ask. This is the site. |

### The demo subtree — the proof

| Route | Justification |
|---|---|
| `/demo` | The product homepage a member actually lands on; answers "is there a product." |
| `/demo/gatherings` | The index, and the only place the "no room in your city yet" state can be shown — the state that justifies the whole host model. |
| `/demo/gatherings/[slug]` | One dated, located room with a working RSVP. The single most persuasive screen on the site. |
| `/demo/signals` | The content layer, one page, deliberately few items — each card visibly carrying the room it leads to. Proves the binding rule at list level. |
| `/demo/signals/[slug]` | One template, three entries. Proves a piece of content is a door, not a title in a catalog. |
| `/demo/start-a-gathering` | The supply side. Answers "does this scale without you flying to every city." |
| `/demo/membership` | One membership, both halves, one price. The point of sale a subscription funder will scrutinize hardest. |

### Deleted

- `/shop` — nothing to sell in a demo, and a merch tab actively contradicts "the gathering
  outranks the subscription."
- `/series`, `/docs-films`, `/music`, `/courses` — four category routes *is* competing with
  Gaia on catalog size, which the concept forbids. They collapse into `/demo/signals`.
- `/about`, `/principles`, `/faq`, `/contact` — the pitch page absorbs all four. A funder
  who has to click "About" to find out what the company is has already left.
- `/cities`, `/demo/cities/[slug]` — at four cities, a city page is the gatherings index
  with a photo. Revisit at ~20 cities.
- Any "traction," "press," "testimonials," or "partners" section. There is no traction to
  report, and inventing it is the one unrecoverable mistake on this project.

---

## 4. The pitch page, section by section

Scroll order is the argument. Darkness → Signal → Connection, mapped onto the order a
funder actually asks their questions. Each section answers the question the last one
raised.

Format per section: **job** / **contents** / **actions** / **states** / **flags**.

---

### 0 — The gate

**Job.** Make a person who has just typed a URL feel they have arrived somewhere with a
point of view, before they have read a word of the pitch.

**Contents.** The logo. One line of orientation — enough that a funder who half-remembers
the intro email knows they are in the right place, and no more. One password field, one
submit. Nothing else: no nav, no footer links, no "request access" form.

**Actions.** Primary: enter. No secondary.

**States.**
- *Idle* — field focused on load (desktop only; do not steal the viewport on mobile).
- *Submitting* — button label changes, field stays filled, no spinner overlay. Sub-second.
- *Wrong password* — inline, below the field, no page reload, no attempt counter, no "3
  tries remaining" theatre. The field keeps its value and re-focuses. Announced to screen
  readers via a live region.
- *No JS* — must still work. Form posts, page re-renders with the error. Non-negotiable.

**Flags.** No integrity risk. No data gaps. Copy needs one line and one button label —
that is the whole deck for this screen, and it is the hardest 12 words on the project.

---

### 1 — Hero: the one line

**Job.** In four seconds, on a phone, say what this company is and why it is not a
streaming service.

**Contents.** One headline stating the proposition — the complete experience for awakened
souls, online and offline, with the room as the point. One subordinate line, maximum, doing
the work "and here is the mechanic" — not a tagline. The existing dark-violet/nebula
environment and its single signal accent.

**Actions.** None. Deliberately. The hero's only job is to earn the next scroll; a CTA here
competes with the ask and gives the funder somewhere to go before they have a reason.

**States.** Renders identically with JS disabled. LCP element is text, not the globe image.

**Flags.**
- *Integrity risk:* any headline implying an existing network — "thousands of us,"
  "gathering in 40 cities," "join the movement." **Safe alternative:** state the plan in
  the tense of intent, and let the demo carry the concreteness. The hero describes what
  New Earth Network *is for*, never how many people are already in it.

---

### 2 — Darkness: the problem, and why now

**Job.** Establish that the audience is real, large, currently spending money in this
category, and structurally underserved — so that everything after it is a solution to
something, not a preference.

**Contents.**
1. The human problem: an audience that is dispersed, screen-bound, and served exclusively
   by media that ends when the video ends.
2. The category evidence: that people already pay a monthly subscription for consciousness
   media at meaningful scale. This is the only place on the site where numbers belong.
3. The turn: what that spend is *not* buying them.

**Actions.** None.

**States.** If no verified source figure is available at build time, the section ships
with zero numbers and makes the argument qualitatively. It must not ship with a
placeholder number.

**Flags.**
- **DATA GAP (owner).** Any figure used here must be an externally verifiable,
  publicly-sourced, dated third-party number — Gaia's public filings, a named industry
  report. Owner supplies the source; `copywriter` cites it visibly (source + year, on the
  page, not in a comment). No estimate, no rounding up, no "over."
- *Integrity risk:* the slide from a sourced market number into an implied New Earth
  Network number. **Safe alternative:** New Earth Network contributes zero figures to this
  section. Every number here is about the category or the competitor, and reads that way.

---

### 3 — The vibe *(required by owner)*

**Job.** Make the funder *feel* the difference between this and Gaia in the four seconds
before they read the model — because "funner and more hip" is not an argument you can win
in prose.

**Contents.** This is the show-don't-tell section and it is the hardest one on the page.
Structure, not decoration:
- A short statement of the tonal position — livelier, less earnest, less new-age catalog —
  in six words, not a paragraph.
- The demonstration itself: the type system, the environment, the signal accent, the
  language, sitting side by side in a way that *is* the brand rather than describing it.
  `art-director` and `brand-designer` own the execution; the structural requirement is that
  the funder can tell the difference without being told what the difference is.
- One honest edge: naming what New Earth Network is *not* (not a wellness catalog, not a
  festival, not a retreat brand) sharpens this faster than three more adjectives.

**Actions.** None.

**States.** No-image is the default assumption. `src/assets/` contains three files, none of
them photography of people, and no `events` entry sets `image`. This section ships
typographically or it does not ship.

**Flags.**
- **INTEGRITY RISK — the highest on the page.** The obvious execution is a grid of faces or
  a wall of gathering photography. Stock imagery of crowds, or creator portraits presented
  without attribution, reads as evidence of an existing community. **Safe alternative:**
  build the vibe from type, color, motion, and language — no human photography at all —
  or, if imagery is unavoidable, only visibly-credited stock with the credit rendered on
  the page. `art-director` does not get to decide this one alone; it goes to
  `creative-director`.
- *Integrity risk:* mood-board tiles labeled as "our aesthetic" that are actually other
  people's work. Same rule: credited, or gone.

---

### 4 — What Gaia can't copy

**Job.** Answer the first objection every funder in the room will raise, before they raise
it, in the shortest section on the page.

**Contents.** The binding rule, stated once, hard: *every piece of content resolves to a
room — a dated, located gathering. If a piece of content can't say what room it leads to,
it doesn't ship.* Then the consequence: this is not a feature Gaia can bolt on, because it
is a production constraint applied before a title exists, not a tab added after.

**Actions.** None. This section's power is that it does not ask for anything.

**States.** None. Static text, no data dependency.

**Flags.**
- *Integrity risk:* characterizing Gaia beyond publicly documented fact, or disparaging it.
  **Safe alternative:** describe Gaia only as what it verifiably is — a subscription
  library of consciousness media — and let the structural point do the work. A pitch that
  attacks the incumbent reads as insecure; one that names a thing the incumbent's
  architecture forbids reads as inevitable.
- Note for `creative-developer`: the binding rule is enforced at the schema level in
  `src/content.config.ts`, not as a copy guideline. The `signals` collection is currently
  unregistered and has no room field. Registering it with a **required** link to an event
  is what makes this section true rather than aspirational.

---

### 5 — The model *(required by owner)*

**Job.** Explain the business mechanic — what is sold, to whom, and how the two halves pay
for each other — clearly enough that a funder can repeat it to a partner from memory.

**Contents.**
1. **The Gaia half, stated plainly.** A monthly membership. Recurring revenue, known
   category, known economics. This is the familiar part and it should be stated with
   confidence, not apologized for.
2. **The half Gaia doesn't have.** Real-world gatherings, and the fact that they are not a
   separate product line — one membership covers both.
3. **The loop, as a diagram, not a paragraph.** Content brings someone in → the content
   points at a specific room → the room is where the relationship becomes real → a person
   who has been in the room does not churn like a person who watched a video. Three or four
   nodes maximum. This diagram is the section; the prose around it is caption.
4. **Why the room is the moat, financially:** retention and word-of-mouth are acquisition
   and churn, which is where subscription businesses live or die.
5. **What the room costs to run** — named as a category of cost, honestly, because a funder
   who spots you hiding the unit economics of physical events stops trusting the rest.

**Actions.** None on the page. Detailed numbers live in the materials the ask links to.

**States.** Renders as a static diagram. No JS. Must be legible at 375px — which means it
is a vertical stack on mobile, not a scaled-down horizontal flow.

**Flags.**
- **DATA GAP (owner).** Membership price point, and whether the gathering layer is
  included, ticketed, or both. The section can be briefed and written without it; it
  cannot be finished without it.
- **INTEGRITY RISK.** The gravitational pull here is a revenue projection chart, a
  cohort curve, or a unit-economics table. Rendered on a page, those read as reported
  results. **Safe alternative:** the page carries the *mechanic* only — no charts, no
  numbers. Projections go in the data room behind the ask, where they are visibly a model
  with stated assumptions. If any illustrative figure must appear on-page, it is labeled
  as an assumption in the same visual weight as the number itself, never in a footnote.

---

### 6 — See it working *(the hand-off)*

**Job.** Get the funder to stop reading and start using — the single thing this build can
do that a PDF cannot.

**Contents.** One sentence of framing that sets expectations honestly: this is a working
demonstration, the gatherings and cities in it are examples, the RSVP works and will not
sign you up for anything. Then one entry point.

**Actions.** Primary (lateral): **enter the demo** → `/demo`. No secondary. Do not offer
four deep links into the demo; a menu of entry points turns a walkthrough into a choice
and the funder makes none of them.

**States.** The link is a plain anchor and works with JS off. No modal, no new tab — a new
tab breaks the back path and orphans the ask.

**Flags.**
- **INTEGRITY RISK — the structural one for the whole build.** A funder deep in `/demo/`
  can forget they are in a demonstration, or forward a demo URL to someone who never saw
  this framing. **Safe alternative, and it is mandatory:** a persistent demo bar on every
  `/demo/*` route (see §5), so the framing travels with the page instead of living only
  here.

---

### 7 — The roster *(required by owner)*

**Job.** Answer "who is actually going to make this content and lead these rooms" with
names a funder can look up.

**Contents.** A set of person cards. Each card, at minimum:
- Name.
- What they do for New Earth Network, in the network's language — *host*, *transmitter*,
  the term `copywriter` lands — not "influencer."
- One line on who they are, in their own register.
- Their room or their signal: what they are making, or what gathering they lead. This is
  the field that makes the roster mean something. A name with no room attached is a logo
  wall.
- Portrait, optional. The layout must not depend on one.

**Actions.** None. Do not link cards to external profiles — it sends the funder off-site
mid-pitch, which is the one thing a pitch page cannot afford.

**States.** All three are real and must be designed:
- *Populated, few* — three to six names. Design for this. Do not build a grid that looks
  starved below twelve.
- *Populated, one or two* — the layout must make two names look deliberate, not empty.
  A single confirmed name presented at full width with what they are making is stronger
  than six thin cards.
- *Empty* — if no names are confirmable by build time, the section states honestly what
  stage roster conversations are at and what a card will contain. An honest empty state is
  a defensible answer to a funder's question; a fabricated card is a dead pitch.

**Flags.**
- **DATA GAP (owner) — blocking. This section cannot be written or designed to completion
  without real input.** Required from the owner, per person: name, what they make or lead,
  whether they have agreed to be named publicly in a funding context, and whether a
  portrait exists and is cleared for use.
- **INTEGRITY RISK — hard rule.** No invented names, no invented bios, no follower counts,
  no reach or audience-size figures, no "in conversation with" implying a commitment that
  does not exist. Follower counts are specifically banned even when real: they are a
  traction claim about the network by proxy, and they invite a funder to do arithmetic the
  company has not earned. **Safe alternative:** if the pipeline is worth showing, show it
  as pipeline — clearly labeled as conversations in progress, with roles rather than names,
  and never in the same visual treatment as a confirmed card.

---

### 8 — Who is building it

**Job.** Answer the question funders actually fund: is this person the one to do it.

**Contents.** Real names, real roles, one line each on why this person and not someone
else — the specific experience that makes the room-and-signal thesis theirs to execute.
The smallest possible version of this section. If it is one founder, it says one founder,
at full width, without padding.

**Actions.** None.

**States.** One person, or several. Both are designed. There is no empty state — if this
section can't be filled, there is no pitch.

**Flags.**
- **DATA GAP (owner).** Names, roles, the one line each.
- *Integrity risk:* titles that imply a staffed organization — "Head of Community" for a
  role nobody holds yet. **Safe alternative:** name the people who exist. Roles being
  hired for belong in the use-of-funds in §10, where they are correctly framed as a plan.

---

### 9 — The five-step plan *(required by owner)*

**Job.** Show a funder that the path from here to an operating, growing company is
sequenced by dependency and not by calendar optimism — and that each step proves something
falsifiable before the next one is funded.

**Contents.** Five steps. Each one carries: the step's name, what it produces, and — the
field that makes this section credible — **what it proves.** A plan step that doesn't prove
something is a wish.

My proposed five, grounded in the concept rather than startup boilerplate. Owner confirms
or replaces:

1. **Transmit.** Produce the first small slate of signals — films, a series, music,
   a course — each one built with a room already attached, before production starts.
   *Proves:* the binding rule is producible, not just a thesis.
2. **Open the first room.** Run gatherings in one city, hosted by the network itself,
   against that slate. *Proves:* the conversion the entire company rests on — a person
   watches something and physically shows up.
3. **Hand over the keys.** Turn attendees into hosts: the organizer playbook, the tooling,
   the standard. Second and third cities run without network staff on the ground.
   *Proves:* supply replicates. This is the step that separates a company from a local
   event series.
4. **Close the loop.** One membership covering both halves, live. *Proves:* the revenue
   mechanic — the room sells the subscription and the subscription fills the room.
5. **Broadcast wide.** Scale the roster and the city map together, on the ratio the earlier
   steps established. *Proves:* the thing this raise is actually for.

**Actions.** None.

**States.** Step 1 must state honestly where the company stands today — including, if true,
that it has not started. A plan whose first step is already claimed as complete without
evidence poisons the other four.

**Flags.**
- **DATA GAP (owner).** Which city is step 2. What the step 1 slate actually is. Timing per
  step. Capital required per step, if it is to be tied to §10.
- *Integrity risk:* rendering steps with checkmarks, progress bars, or "in progress"
  badges that imply completed work. **Safe alternative:** the five steps render as a
  sequence with no completion state at all, unless a step is genuinely done and the owner
  can say what evidence backs it.

---

### 10 — The ask

**Job.** Say what is wanted, what it buys, and make saying yes a single tap.

**Contents.**
1. The amount, and the structure if it is decided.
2. Use of funds, in the shape of the plan above — a funder should be able to map the money
   onto steps 1–5 without a translation layer. Three or four buckets, not twelve.
3. What the round unlocks: which step it carries the company through.
4. The action.

**Actions.** Primary, and the only true CTA on the site: **start the conversation.** One
tap to a real destination — a mailto with a pre-filled subject, or a scheduling link.
Not a contact form: a form adds fields, a submit state, an error state, and a delay between
a funder's intent and a human, all for a person who already has your email address.
Secondary, permitted here only: request the full materials / data room.

**States.**
- The mailto destination must be a real, monitored address. A dead link at the ask is the
  only bug on this site that costs money.
- If a scheduling link is used, it is a plain anchor to an external page. No embedded
  widget: it is a third-party script, and it defaults to no.

**Flags.**
- **DATA GAP (owner) — blocking.** The amount, the structure, the use-of-funds split, and
  the destination for the CTA.
- *Integrity risk:* round-status theatre — "60% committed," "closing in three weeks,"
  a list of existing investors who have not committed. **Safe alternative:** state the ask
  and the use of funds. Nothing about who else is in.

---

### 11 — Footer

**Job.** Close the page without opening anything.

**Contents.** Logo, one confidentiality line, the year. No link list — every route in the
sitemap has already been offered in context, and a footer nav here exists only to give a
funder somewhere to wander at the moment you want them to email you.

**Actions.** None.

---

## 5. The demo subtree

The demo is not a separate experience. It is the pitch's evidence, and it is the
scattered newcomer's real site — designed exactly as it would be for them, because a demo
that is designed for the funder is not a demo of anything.

### The demo bar — on every `/demo/*` route, no exceptions

A single persistent, low-profile bar at the top of every demo screen:

- A short, unambiguous statement that this is a working demonstration and its gatherings
  and cities are examples.
- One link back: **← the plan**, returning to `/#see-it-working` — the section they left
  from, so the scroll resumes into the roster, the plan, and the ask rather than dumping
  them at the top of the page.

It is static. No animation beyond a single entrance, no scroll behaviour, no dismissal.
It solves the forwarded-link problem: any demo URL arriving cold carries its own framing.

### Product navigation — replacing the current six-item nav

`src/components/Navigation.astro` currently ships Events, Series, Docs & Films, Music,
Courses, Shop, with "Subscribe" as the only persistent CTA. That is Gaia's information
architecture and Gaia's CTA. Inside the demo, it becomes four items:

**Gatherings · Signals · Start a gathering · Membership**

The gathering is first and it is first everywhere. Four items, no dropdown, no seventh
thing. The persistent CTA is not "Subscribe" — it is the next room.

### `/demo` — the product homepage

**Job.** Show a funder what a scattered newcomer sees, and prove the site's own gravity
runs toward a room and not toward a catalog.

**Contents, in scroll order:** the hero proposition → **the next room** (one dated, located
gathering, per `docs/upcoming-gatherings-brief.md`, which stands and should be built as
briefed) → the signals that lead to rooms → one membership, both halves → the host
invitation. **Primary action: RSVP to the featured room.**

The hierarchy is the argument. If a funder scrolls this page and comes away thinking
"streaming service with an events tab," the pitch has failed on the one screen where it
was most concretely demonstrable.

### `/demo/gatherings`

**Job.** Show the room supply, and — more importantly — show what happens when there
isn't one.

**Contents.** Upcoming rooms, soonest first, with city, date, venue, and status. Filter by
city only if there is more than one screen's worth; at four cities there isn't, so there is
no filter.

**Primary action:** open a room.

**States — all four are the design, not edge cases:**
- *Rooms available* — the normal case.
- *A room that is full* — the card stays visible and legible, marked full, and offers the
  next nearest room in its place. A full room is proof of demand, not an error; never hide
  it. The `status` enum in `src/content.config.ts` already carries `full`.
- *No room in this city yet* — the single most important state in the product. It does not
  say "no results." It says the network isn't there yet, and hands the visitor
  `/demo/start-a-gathering`. This state is the reason the host model exists and a funder
  should be shown it deliberately.
- *A cancelled room* — stays on the page, marked, with the reason and the next alternative.
  Silently deleting a cancelled gathering is how a community loses trust in a calendar.

### `/demo/gatherings/[slug]`

**Job.** Turn interest into "I'm going" in one tap.

**Contents.** Date, time, venue, address, city — above everything, scannable in one glance.
What happens in the room, short. Who is hosting. The signal it came from, linked. Then
RSVP.

**Primary action: RSVP.** One field — email — and one button. Nothing else. Every
additional field is a real-world empty chair, and this screen exists to demonstrate exactly
that discipline to a funder. Name, phone, "how did you hear about us," dietary preferences:
all rejected. Ask afterwards, in the confirmation, if at all.

**States:**
- *Open* — RSVP is the page's only action.
- *Few spots* — surfaced honestly, no countdown timer, no "3 people viewing this."
- *Full* — the RSVP control becomes a single alternative: the next room, dated and linked.
  Not a waitlist form. A waitlist is a second product with its own states and no
  demonstrated demand for it.
- *Past* — the page still resolves (links get forwarded), states plainly that it happened,
  and offers the next room.
- *Submitting* — the button is disabled with a changed label; the field retains its value.
- *Success* — an inline confirmation replacing the form, which in this build says clearly
  that it is a demonstration and no real RSVP was recorded. This is where the demo could
  most easily mislead, so it is where it must be most explicit.
- *Failure* — the error appears inline, the email stays in the field, and the message names
  a recovery path. Never a full-page error. Never a lost value.
- *No JS* — the form posts and the page re-renders in its success or error state.

### `/demo/signals` and `/demo/signals/[slug]`

**Job.** Prove the binding rule is structural.

**Contents (index).** Few items, presented as few on purpose — the restraint is the
position, and a funder who has seen Gaia will read a deliberately short shelf as
confidence, not as a thin catalog. Each card carries its title, its kind, and, non
-optionally, **the room it leads to**, dated and linked.

**Contents (detail).** What this is. Then, unmissable and above the fold: the room. Then the
piece itself or its trailer.

**Primary action on both:** the room, not the play button.

**States.** A signal whose room has passed points to the next room in that thread, never to
nothing. A signal with no room cannot exist — that is the schema's job, not the designer's.
`src/content/signals/` currently holds three entries and is not registered in
`src/content.config.ts`; registering it with a required event reference is what makes this
section honest.

**Flag — DATA GAP (owner).** Which real signals exist or are in production, and which room
each one leads to. The three files in `src/content/signals/` are narrative fragments, not a
slate.

### `/demo/start-a-gathering`

**Job.** Show a funder that supply scales through people who already showed up, not
through headcount.

**Contents.** What a host actually does, honestly and briefly — a funder is reading this as
an operational-burden estimate, and a vague version reads as "the founder will do all of
it." What the network provides. Then the shortest possible expression of interest: city and
email. Two fields.

**Primary action:** raise your hand.

**States.** Submitting, success (demo-explicit), failure with the value retained, and no-JS
— same discipline as RSVP.

### `/demo/membership`

**Job.** Show the point of sale, and prove "one membership, both halves" is a product fact
rather than a positioning line.

**Contents.** One plan. Not three tiers — a tier table is a Gaia-shaped answer, and this
company's whole claim is that the two halves are one thing. What it includes, both halves,
in one list. What it costs.

**Primary action:** join — which in this build resolves to a demo-explicit confirmation,
never to a real checkout.

**Flags.**
- **DATA GAP (owner) — price.**
- **INTEGRITY RISK.** A price rendered on a demo screen reads as a live offer. **Safe
  alternative:** the demo bar carries the framing, and the join action's confirmation states
  plainly that nothing was charged and no account was created. No "cancel anytime" or
  "join 10,000 members" microcopy — the second is fabricated traction, the first implies a
  live billing relationship.

---

## 6. The flows that decide whether this works

### Flow A — the one that matters: gate → argument → ask

```
password → hero → problem → vibe → what Gaia can't copy → the model
        → [optional detour into the demo] → roster → team → the plan → the ask
        → mailto / scheduling link
```

Failure branches:
- **Wrong password** → inline error, value retained, no lockout. A funder who mistypes and
  gets a lockout screen does not try again.
- **Bounces at the vibe section (mobile, section 3 of 11)** → this is the likeliest failure
  and it has one mitigation: the persistent mobile ask affordance in §7. Not a second CTA —
  the same one, made reachable.
- **Never returns from the demo** → mitigated by the demo bar's return target being the
  section they left, which puts the roster, the plan, and the ask directly under their
  thumb on resume.
- **Arrives via a forwarded `/demo/*` link with no pitch context** → the demo bar frames
  the page and offers the plan. Cold demo URLs must never read as a live consumer product.

### Flow B — the proof loop: the funder walks the newcomer's path

```
/#see-it-working → /demo → the next room → /demo/gatherings/[slug]
                → enter email → RSVP → demo confirmation → ← the plan
```

Target: ninety seconds, four taps, one field. If it takes longer than that, the product's
central claim — that this removes friction between wanting connection and having it — is
being disproved on the screen where it is being asserted.

Failure branches: the featured room is full → the detail page offers the next room and the
walk continues; JS is off → every step still completes; the funder taps a signal instead of
the room → the signal detail's primary action is the room, so the path converges anyway.

### Flow C — the empty city, which is the host origin story

```
/demo/gatherings → no room in this city yet → what a host does
                → city + email → raise your hand → demo confirmation
```

This flow is in the sitemap because a funder's real question is "what happens in the 95% of
cities where you have nothing," and the honest answer — the empty state is the recruitment
surface — is a better answer than a map with four pins on it.

---

## 7. Mobile

Designed first, not derived.

**The pitch page at 375px.**
- Eleven sections is a long thumb-scroll. There is no section menu and no jump nav — a
  funder does not want a table of contents, they want the argument. Instead: a hairline
  scroll-position indicator, and nothing else.
- One sticky element on the entire site, permitted because it is the *same* single CTA
  rather than a competing one: a bottom-anchored bar carrying "start the conversation,"
  appearing once after section 2 and never re-animating. Static after entry — no pulse, no
  ambient movement. (The site owner has previously rejected ambient nav motion as "sloppy
  hum" and asked for fewer, bigger signals. That call applies here.)
- The model diagram is a vertical stack at this width, authored as such. Never a scaled or
  horizontally-scrolling desktop diagram.
- Roster and team cards are single-column with a real tap target each, not a 2-up grid of
  postage stamps.

**The demo at 375px.** This is the canvas the product is actually for.
- RSVP: date, venue, and the RSVP control visible without scrolling on the gathering page.
  One field. The email input uses the correct `inputmode` and `autocomplete` so the keyboard
  arrives right the first time.
- Thumb-zone: the RSVP button sits in the lower half of the screen, not pinned to the top
  of a card above the fold-line where a thumb can't comfortably reach.
- The demo bar is one line at this width. If it needs two, it is too wordy — cut the words,
  not the bar.
- No hover-dependent information anywhere in the demo. Anything revealed on hover on a
  desktop must be present without it.

---

## 8. The recommendation, and the alternative I rejected

**Recommended: a pitch spine at `/` with a walkable product demo under `/demo/`, entered
once from inside the argument and framed by a persistent bar.** It gives the funder a
single linear argument that closes on an ask, and it gives them the one thing no deck can —
completing an RSVP with their own thumb and feeling how short the path is. The structure
also stays honest: the demo is designed for the newcomer, which is the only way it
demonstrates anything.

**Rejected: one single long-scroll page with the product embedded as inline device
mockups and screenshots.** It is tidier, it guarantees nobody wanders off before the ask,
and it is a shorter build. I rejected it because it makes the entire decision to build a
website instead of sending a PDF pointless — a scroll full of phone mockups *is* a deck,
rendered more expensively. The single most persuasive thing this project can do is let a
funder tap RSVP and see how little stands between a person and a room. A screenshot of that
proves nothing; it only asserts it. The wandering risk it avoids is real, and it is
addressed instead by the demo bar's return target and the one persistent ask affordance.

---

## 9. What is blocked on the owner

Nothing below can be invented, and three of these block completion rather than just
polish.

| Need | Blocks | Severity |
|---|---|---|
| Roster: names, roles, what each is making, public-naming consent, cleared portraits | §7 | **Blocking** |
| The ask: amount, structure, use-of-funds split, CTA destination | §10 | **Blocking** |
| Team: names, roles, the one line each | §8 | **Blocking** |
| Membership price, and whether gatherings are included or ticketed | §5, `/demo/membership` | High |
| Five-step plan: the step-1 slate, the step-2 city, honest current status | §9 | High |
| A sourced, dated third-party market figure — or an explicit decision to run without one | §2 | Medium |
| Which real signals exist or are in production, and the room each leads to | `/demo/signals` | Medium |

Everything else in this document can be written by `copywriter` and laid out by
`art-director` today.
