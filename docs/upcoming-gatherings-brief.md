# Page brief — The Next Room (homepage gatherings section) + the nav CTA

Owner: `ux-designer`. Status: ready for `copywriter`.
Scope: one homepage section, one schema change, one navigation decision.
Not in scope: `Manifesto.astro` (flagged, no action), the six-item primary nav (flagged
at the end, separate decision), final words, final layout.

Verified against the repo on 2026-09-08 — file/field claims below were read, not assumed.

---

## 0. The two facts that shaped every decision here

**Fact 1: there is no gathering photography in this repo.** Checked `src/assets/`
(three files: `logo-full.png`, `logo-icon.png`, `wand-stars.svg`), `public/` (six
nav/offering SVGs, three favicons, `public/images/earth.jpg`), and `assets/` at the
repo root (four logo variants). `earth.jpg` is the hero globe texture, not a photo of
people. None of the three event entries in `src/content/events/` sets `image`.

So: **this section ships with no photograph, and its no-image state is the design, not
a fallback.** No "photography coming soon" plate — `WhatHappens.astro` can get away with
that in a supporting section; the page's single strongest conversion moment cannot open
with an apology. `art-director` designs the typographic/no-image composition as the real
thing. An optional image slot exists in the schema and should be honoured if a real photo
ever lands, but nothing about the layout may depend on it.

**Fact 2: the homepage currently renders two sections.** `src/pages/index.astro` imports
only `Hero` and `Offerings`; everything else, including `UpcomingGatherings`, is commented
out for LCP reasons. So this is not a swap — it is the third section on the page and the
first one below the offerings grid. It inherits the job of being the page's proof that
any of this is real.

---

## 1. Who this section is for, in order

1. **The scroll-in stranger.** Landed from social, on a phone, has now seen a TV
   headline and a six-icon grid of things the network makes. Their live question is
   *"is any of this actually real, or is it a landing page?"* A dated, located room with
   a street address is the only answer that works.
2. **The returning attendee.** Wants the next date in their city. Should not have to
   read anything to get it.
3. **The person in a city with no room.** Currently gets nothing from this section
   unless every room is full or there are none — which is exactly when the section hands
   them `/start-a-gathering`. See the empty states.

---

## 2. The one job of this section

**Turn "this looks interesting" into one specific date, in one specific place, that a
stranger can say yes to in one tap.**

Everything else it does — naming the signal, naming the host — is in service of making
that one yes credible. If a section element does not make the yes more likely or more
honest, it is not in the section.

---

## 3. Why one room and not three cards

Endorsing `creative-director`'s call, with the structural reason stated so `copywriter`
and `art-director` can hold the line:

A 3-up card grid one section below a 6-up card grid is the same visual sentence twice,
and worse — it converts a decision into a comparison. Three equally-weighted cards ask
the visitor to evaluate options; a stranger with no context cannot evaluate three cities
they don't live in, so they evaluate nothing and scroll. One room removes the choice and
replaces it with a fact. The other rooms still exist, one rung quieter, for the returning
attendee who is scanning for their own city.

**The alternative I seriously considered and rejected:** geolocated "gathering nearest
you" as the featured slot. Rejected — it needs client JS or an edge function for a
three-city, three-event dataset, it produces a wrong or empty answer for the majority of
visitors (there are four cities), and it makes the section's content unpredictable to
everyone writing and designing against it. Revisit at ~20 cities, not now.

---

## 4. Section structure — "The Next Room"

Component: replace the body of `src/components/home/UpcomingGatherings.astro`. Keep the
filename (it is already wired into `index.astro`'s commented import block) or rename to
`NextRoom.astro` — `creative-developer`'s call, no structural consequence.

The section is **one full-bleed band, single column, one object**. Not a card, not a grid
item, no `EventCard` — `EventCard.astro` stays as-is for `/events` and `/cities/[slug]`
and is not used here. This section is deliberately unlike anything else on the page.

### 4.1 The selection rule

```
featured  = upcoming events, sorted by date ascending,
            excluding status 'full' and status 'cancelled',
            take the first
others    = the remaining upcoming events (including 'full' and 'cancelled'),
            sorted ascending, take up to 3
```

Where `upcoming` means **`date >= today`**, not `status !== 'past'`.

> Bug worth fixing while you are in here: `UpcomingGatherings.astro` (line 10) and
> `src/pages/events/index.astro` both filter on `status !== 'past'`, which depends on a
> human editing a markdown file the morning after every gathering. They don't. Filter on
> the date; keep `status: 'past'` as an override, not the mechanism.

Featured excludes `full` because a room you cannot enter is the worst possible thing to
put in the page's one conversion slot. It still appears in the list below, honestly
labelled.

### 4.2 Information order — the questions in the order a stranger asks them

Mobile order is the canonical order. Desktop may redistribute across columns but must not
reorder the DOM.

| # | Element | Its one job | Source |
|---|---|---|---|
| 1 | Section kicker | Say this is *one* thing, not a listing | copy |
| 2 | **Datestamp — date + city** | The two facts that make it real. Largest type in the section. | `date`, `cityName` |
| 3 | `<h2>` — event title, linked to `/events/[slug]` | Name it, and carry the "more detail" affordance without spending a button on it | `title` |
| 4 | Time + venue | Answer "where exactly, when exactly" before anything discursive | `time`, `venue`, `address` |
| 5 | **The signal line** | Why this room exists. The one sentence on this page that Gaia structurally cannot write. | new `signal` reference — §5 |
| 6 | Description | One or two sentences on what happens | `description` |
| 7 | Host line | Who is holding it. A named human is what makes a room with strangers survivable. | new `host` field — §5 |
| 8 | Status + capacity, one line | Honest scarcity, never manufactured | `status`, `capacity` |
| 9 | **Primary action — RSVP** | The only button in the section | `rsvpUrl` |
| 10 | Divider | Signal that the featured room has ended | — |
| 11 | The other rooms — plain rows, not cards | Let a returning attendee find their own city in one scan | `others` |
| 12 | One text link, "all gatherings" | Exit to `/events` | — |

**Hierarchy notes that are structural, not visual taste:**

- **The datestamp leads, not the title.** "Sun 20 Sep · Los Angeles" tells a stranger
  more than "Eastside Circle" does. The title is the second thing they read, not the
  first. Semantically the `<h2>` is still the title (one `<h1>` on the page, in Hero;
  heading order stays legal); the datestamp is a `<p>` containing a real
  `<time datetime="…">`, styled as the display element. `art-director` gets the freedom
  to make the datestamp enormous.
- **The signal line sits *above* the description**, not below it. The signal is the
  reason the room exists; the description is what the room is. Cause before content.
- **One button.** RSVP only. The event title is a link, "all gatherings" is a link, the
  other-room rows are links. Links are not buttons and do not compete.

### 4.3 The "other rooms" list

Rows, not cards. Each row is one full-width link to `/events/[slug]`, minimum 44px tall,
containing: date · city · title · status. No image, no description, no per-row RSVP —
a per-row RSVP button is four competing primary actions in one section.

Cap at three rows on the homepage regardless of how many events exist. Today there are
two. If `others` is empty, omit the divider, the list, and the "all gatherings" link
entirely — with exactly one upcoming room, `/events` is a page that shows you the thing
you are already looking at, and sending someone there is a dead end wearing a link.

### 4.4 States — all of these are Tuesday

| State | What renders | Primary action |
|---|---|---|
| **Normal** | As above | RSVP → `rsvpUrl` |
| **Featured event has no `rsvpUrl`** (true of all three events today) | Identical, but the button must never be dead | Button → `/events/[slug]`, label becomes a "how to join"-shaped phrase (copywriter). Never render an RSVP button that goes nowhere. |
| **Featured event is `few-spots`** | Status line carries it in the signal accent | RSVP, unchanged |
| **Every upcoming event is `full`** | No featured slot. Section collapses to one honest line + the full rooms as a list. | → `/start-a-gathering` |
| **An event is `cancelled`** | Never featured. Appears in the list, struck, with the word "cancelled", not a link to an RSVP. | Row still links to the detail page so the visitor can find out what happened |
| **No upcoming events at all** | One line and one action. Not "check back soon" — that is a request to leave. | → `/start-a-gathering` |
| **Loading / no-JS** | Not applicable and must stay that way. This section is statically rendered at build time and requires **zero client JS**. No skeletons, no fetch, no CLS. | — |
| **Failure** | There is no runtime failure mode by construction. A malformed event entry fails `astro build`, not the visitor's page load. That is the correct place for it to fail. | — |

### 4.5 Mobile UX — 375px is the canvas

- Single column, full-bleed band, generous vertical rhythm. Nothing side-by-side.
- The RSVP button is **full-width and the widest tappable target in the section**, and it
  must be reachable without the visitor reading steps 5–8. Practically: keep the block
  from datestamp to button inside roughly one and a half phone screens. If copy pushes it
  past that, the copy is too long — cut the description, not the host line.
- Every "other room" row is a full-width tap target, ≥44px, whole row hot, not just the
  title text.
- No horizontal scrollers, no carousels, no swipe. A carousel here would hide rooms 2 and
  3 behind a gesture nobody performs.
- The address is a plain text string, not a map embed. A map embed is a third-party
  script and blows both the JS budget and the third-party rule.

---

## 5. Schema — attaching the signal to the room

### 5.1 The problem with the current schema

`src/content.config.ts` `events` has fourteen fields and none of them can say what a
gathering came out of. The README's binding rule ("every piece of content resolves to a
room… enforce it at the schema level") currently has nothing to enforce, in either
direction.

### 5.2 What I'm specifying

**A new `signals` collection, and one required reference from every event to it.**

```ts
// src/content.config.ts
const signals = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/signals' }),
  schema: () =>
    z.object({
      title: z.string(),
      kind: z.enum(['series', 'film', 'documentary', 'music', 'course', 'broadcast']),
      part: z.string().optional(),   // "Episode 3", "Side B" — a specific moment, not just a brand
      href: z.string().optional(),   // where to watch/listen; omit until it exists
    }),
});

// events, added fields:
signal: reference('signals'),                    // REQUIRED. no default, not .optional()
host: z.object({ name: z.string(), role: z.string().optional() }),  // REQUIRED
status: z.enum(['open', 'few-spots', 'full', 'cancelled', 'past']).default('open'),
```

`reference()` is imported from `astro:content` alongside `defineCollection`/`z`.

**Why this is genuinely enforced and not a copy guideline:** `reference('signals')` is
validated at build. A missing `signal:` fails the build. A `signal:` pointing at a slug
with no file fails the build. A typo fails the build. `astro check` and `npm run build`
both catch it before a human ever sees the page. That is the schema-level enforcement the
README asked for.

**Direction, and why only one field is authored.** The rule is stated in the README as
content → room. I am enforcing it as room → signal, authored once on the event, and
deriving content → room by filtering:

```ts
const roomsFor = (signalId: string) =>
  events.filter((e) => e.data.signal.id === signalId && e.data.date >= today);
```

One authored field, both directions available, no circular required references between
two collections (which would be unbootstrappable and would break every time an event
passes). The `/series`, `/docs-films`, `/music`, `/courses` pages, when they get built,
read the derived side — every media entry displays the rooms it leads to without anyone
authoring a second link.

**One honest limitation, stated plainly:** zod validates one entry in isolation, so it
*cannot* express "every signal must lead to at least one upcoming room." That half of the
binding rule needs a build-time guard — a function in `src/lib/` that throws during the
build if a signal has no non-past event. Specify it now, implement it when a media page
exists to break. Do not claim the schema covers it; it doesn't.

### 5.3 The "first gathering in a new city" case

`austin-first-signal.md` is the test: what signal did a city's very first gathering come
out of? Answer: the `broadcast` kind — the network's own transmission — and it is a real
`signals` entry with a real page, not a null. It is legitimate exactly once and becomes a
loophole the moment there are three of them. If a second `broadcast` entry gets authored
to dodge the requirement, the rule has already failed and that is worth escalating rather
than routing around.

### 5.4 Rendering the signal line

- With `href`: the signal title is a link. `kind` and `part` render as quiet metadata.
- Without `href` (the honest state today — nothing is watchable yet): plain text, same
  content, no link. The line still does its job; it names the transmission the room came
  out of. Do not invent a placeholder destination.
- `copywriter` owns the connective phrase. It should be short enough to sit on one line
  at 375px and should read as provenance, not as a plug.

### 5.5 Migration required before this builds

Making `signal` and `host` required breaks the build until content exists. That is the
point. Required work, in order:

1. Create `src/content/signals/` with entries the three current events can point at
   (at minimum one, of kind `broadcast`).
2. Add `signal:` and `host:` to all three files in `src/content/events/`.
3. Optionally add real `rsvpUrl` values — none of the three has one today, which means
   the fallback in §4.4 is the *current* live behaviour, not a hypothetical.
4. `npx astro check && npm run build` must pass. If it doesn't, content is missing, which
   is the schema working.

`rsvpUrl` stays optional. I considered making it required — a room you can't say yes to
isn't a room — but drop-in gatherings are real and forcing a fake URL is worse than the
fallback. Flagging instead: filling in real RSVP destinations is a content task with
direct attendance consequences.

---

## 6. The nav CTA

### 6.1 The decision

Confirmed: remove `Subscribe` from `Navigation.astro` (currently
`<HeartSignalButton href="/#subscribe">Subscribe</HeartSignalButton>`, line 45) and give
the signal-ring treatment — `HeartSignalButton.astro`'s `.signal-btn`, the gradient ring
plus glow plus heart burst — to Hero's `Get Started` submit button.

### 6.2 The rule for every other route

The nav is shared via `BaseLayout`, so this needs a rule, not a homepage patch. The rule:

> **The masthead carries exactly one CTA, and it is the gathering. It is present on
> every route except where a stronger, more specific CTA already owns the page.**

Concretely, the nav CTA is **hidden** on:
- `/` — Hero's now-signal-treated submit owns the page's one primary action. Two
  signal-ring buttons in one viewport is the same visual sentence twice, which is exactly
  what `creative-director` just rejected in the card grid, and it contradicts the
  standing "fewer, bigger signals" note.
- `/events` and `/events/[slug]` — the CTA would point at the page you are on, and on a
  detail page it would compete with that page's own RSVP button, which is the single most
  important button on the site.

And **shown** on everything else: `/about`, `/cities`, `/cities/[slug]`, `/series`,
`/docs-films`, `/music`, `/courses`, `/shop`, `/principles`, `/faq`, `/contact`,
`/start-a-gathering`. Destination `/events`. Label points at the room — "Find a
gathering" shape; `copywriter` owns the words.

Implementation shape (one expression, in `Navigation.astro`):

```
const showNavCta = !(currentPath === '/' || currentPath.startsWith('/events'));
```

### 6.3 Why not simply remove it everywhere

That was the alternative, and it's the one I rejected. `/series`, `/music`, `/shop` and
`/courses` are precisely the pages where the difference from Gaia has to be visible, and
with no nav CTA and no content yet they become a media library with no door — the exact
failure the README names. The README's complaint is not "there is a persistent CTA," it
is that the persistent CTA is Subscribe. The fix is to change what it points at, not to
delete the slot.

### 6.4 Mobile menu

`MobileNavigation.astro` takes `primaryLabel`/`primaryHref` and renders its own
`HeartSignalButton`. **The mobile menu's CTA is always present, on every route including
the homepage**, pointing at `/events`.

This is not an inconsistency with 6.2, it is the same rule applied correctly: the mobile
menu is a full-screen dialog. Hero is never on screen at the same time as it, so nothing
competes. On a phone the menu *is* the navigation, and the one thing it must always offer
is a way to a room. It sits at the bottom of the panel (`margin-top: auto`, already
there) — thumb-reachable, last thing in the tab order, correct.

### 6.5 What this means for the signal treatment

The signal-ring treatment is the site's one "this is the important thing" mark, and
**only one instance may be visible at a time**. Homepage: Hero's submit. Every other
route: the nav CTA. Mobile menu: its own CTA. By the rule in 6.2 these never coexist.

Note for `creative-developer` (not a design decision, a duplication warning): Hero's
submit is a `<button type="submit">` inside a form; `HeartSignalButton` renders an `<a>`.
The treatment must be extracted into one shared, token-driven implementation that renders
either element — `Button.astro` already demonstrates the `href ? 'a' : 'button'` pattern.
Do not copy the `.signal-btn` CSS into `Hero.astro`; that is two things to keep in sync
forever. Hero's existing submit styling (`--color-hero-cta-fill`, cyan border,
`--shadow-glow-md` on hover) is replaced by the treatment, not layered under it.

### 6.6 Cleanup this decision forces

- `EmailSignup.astro` is **cut**, per `creative-director`. It is the only thing in the
  repo that owns `id="subscribe"`, so removing it and the nav's `/#subscribe` links in
  the same pass leaves no dead anchor. Verified: the only references to `subscribe` are
  `EmailSignup.astro:5`, `Navigation.astro:45` and `:75`, plus comments in
  `Hero.astro`. Also delete its commented-out import in `index.astro` (line 21) and its
  entry in the commented block at lines 60–68 — leaving them is a broken import waiting
  for whoever uncomments next.
- `Hero.astro`'s comments at lines 19–25 and 368–371 both reference EmailSignup and "the
  nav Subscribe button" as live things. They stop being true in this pass. Fix them in
  the same commit — the back of the cabinet gets finished.
- The `#subscribe` scroll-offset rule inside `EmailSignup.astro` (lines 46–47) goes with
  the file. Nothing else depends on it.

---

## 7. The flow this section exists to serve

```
Instagram story → homepage (Hero: what this is) → Offerings (what the network makes)
  → THE NEXT ROOM ─┬─ tap RSVP ─────────────────→ RSVP destination → shows up
                   ├─ tap the title ────────────→ /events/[slug] → RSVP → shows up
                   ├─ tap another room's row ───→ /events/[slug] → RSVP → shows up
                   ├─ tap the signal ───────────→ the content it came from → back to a room
                   └─ tap "all gatherings" ─────→ /events → their city → RSVP
```

Failure branches, all handled in §4.4:
- No room in their city → they reach `/events`, see the cities that do have rooms, and the
  next structural job (out of scope here) is that `/events` must route a city-less visitor
  to `/start-a-gathering`. Flagged, not solved in this brief.
- Featured room full → never featured; the all-full state routes to `/start-a-gathering`.
- Room cancelled → visible and labelled, never featured, never a dead RSVP.
- No rooms at all → one line, one action, `/start-a-gathering`.

Longest path from "landed" to "said yes": three taps (scroll, RSVP, submit). That number
is the section's actual success metric.

---

## 8. Flagged, not decided here

- **`Manifesto.astro`** — per the producer's brief, flagged only. Its "that job is done"
  claim still contradicts the concept; it should not be uncommented before it is rewritten.
- **The six-item primary nav** — Events, Series, Docs & Films, Music, Courses, Shop is
  over the five-item ceiling and drops About / Cities / Start a Gathering entirely, which
  is the README's other standing complaint. That is a whole-site IA decision, deliberately
  not smuggled into a section brief. It should be the next `ux-designer` pass, and it
  should happen before the media routes get real content built on top of the current
  structure.
- **`/events` for a visitor with no city** — see §7. Needs its own small brief.
