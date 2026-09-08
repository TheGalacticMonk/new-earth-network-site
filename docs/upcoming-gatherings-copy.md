# Copy deck — The Next Room (homepage section) + the nav CTA

Owner: `copywriter`. Status: ready for `creative-director` review, then `art-director` /
`brand-designer` / `motion-designer`, then `creative-developer`.
Input: `docs/upcoming-gatherings-brief.md` (`ux-designer`). Structure is not re-litigated
here — every string below is keyed to that brief's section and row numbers.

Content files written in this pass (real files, not specimens — see §9):
`src/content/signals/` (3 new entries) and the `signal:` / `host:` blocks in all three
`src/content/events/*.md`. Verified: `npx astro sync && npx astro check` → 0 errors.

---

## 1. What this section says, in one line

*There is a real room, on a real date, in a real park, and a named person will be standing
in it.* Every string below is either that fact or the shortest possible path to yes.

The section carries **no headline of its own.** The datestamp is the headline (brief §4.2,
hierarchy note 1) and the `<h2>` is the event title, which comes from content. Adding a
section headline above a display-size datestamp would give the band two competing first
lines and push the button off the first screen. This is the deliberate absence, not an
oversight.

---

## 2. Section strings, in brief §4.2 row order

| # | Element | String | Notes |
|---|---|---|---|
| 1 | Kicker | `THE NEXT ROOM` | Singular. Definite article. Says "one thing" before the eye reaches anything else. Caps is a `brand-designer` call; the words are these three. |
| 2 | Datestamp | `SUN SEP 20` · `LOS ANGELES` | Format spec in §3. |
| 3 | `<h2>` | `{event.title}` → "Eastside Circle" | From content. Linked to `/events/[slug]`, no extra affordance text. |
| 4 | Time + venue | `6:00 PM · Elysian Park` <br> `Elysian Park, Los Angeles, CA` | Time first — "when exactly" outranks "where exactly" for someone deciding. Address on its own line, plain text (brief §4.5). |
| 5 | Signal line | See §4 | |
| 6 | Description | `{event.description}` | From content. Unchanged in this pass — see §9.3. |
| 7 | Host line | `Look for Maya Reyes, Los Angeles organizer.` | Template: `Look for {host.name}, {host.role}.` — without role: `Look for {host.name}.` See §5. |
| 8 | Status + capacity | `40 spots. A few left.` | Template in §6. |
| 9 | Primary action | `Save me a spot` / fallback `How to join` | See §7. |
| 10 | Divider | — | No words. |
| 11 | Other rooms | Optional heading `Other rooms` | See §8. |
| 12 | Exit link | `All gatherings →` | See §8. |

---

## 3. How a date reads

**`SUN SEP 20`** — day of week, month, date. City is a separate string, same display line
or the line under it (`art-director`'s call).

- **Day of week is not optional.** "Sep 20" makes a stranger do arithmetic; "SUN" tells
  them in one glance whether they are free. It is the single most decision-relevant token
  in the section.
- Month before date. US-first audience (LA, Austin, NYC, London), and `SEP 20` scans
  faster than `20 SEP` for that reader.
- **No year** when the event falls within the next twelve months. Append ` 2027` only when
  it crosses into a different calendar year than today — a year on a date three weeks out
  makes a room feel filed rather than imminent.
- No comma. `SUN SEP 20` is a stamp, not a sentence.
- The visible string is decorative typography over a real
  `<time datetime="2026-09-20">Sun Sep 20</time>`. If the display string is set in caps
  via CSS, the DOM text stays sentence case so screen readers don't spell it out.
- The `·` between time and venue is a separator, not punctuation to read. If it lands in
  the accessible name, replace it with a real space in the markup and let CSS draw it.

`brand-designer` owns whether this becomes `LOS ANGELES ✦ 09.20.26`. If it does, the
day-of-week rule survives the redesign or the redesign loses the section's most useful
token.

---

## 4. The signal line (brief §5.4)

**Connective phrase: `This room came out of`**

Twenty-one characters — one line at 375px with the title wrapping beneath it. It is
provenance in the plainest available English: causal, past tense, closed. It does not
recommend, tease, or invite. It is a credit, and credits are believed precisely because
they aren't selling.

### 4.1 Without `href` — the live state today

```
This room came out of Nobody Is Coming to Save You
Documentary
```

Title plain text, weighted. `kind` (and `part`, if present) as quiet metadata on the line
below or trailing. Nothing here implies anything is watchable, because nothing is.

### 4.2 With `href`

```
This room came out of Nobody Is Coming to Save You ↗
Documentary
```

**Same connective phrase.** The only delta is that the title becomes a link and takes a
trailing `↗` (or `art-director`'s equivalent affordance). Link text is the title alone —
already unique on the page, so no `aria-label` override, no "click here", no visually
hidden padding.

I deliberately did **not** write a second phrase for this state. A room's provenance is
the same fact whether or not a video file has been uploaded yet; changing the sentence
when the asset lands would make the copy report a CMS condition instead of a truth about
the room. The link is the affordance. The words don't need to do it twice.

**Rejected:** `Watch what started it:` — reads as a plug, which is the exact failure mode
§5.4 names, and it inverts the section's job by pointing back at the screen the visitor is
supposed to be leaving.

**Rejected:** `Signal:` — a field label, not a sentence. It makes the site's most
distinctive idea look like database output.

### 4.3 Rule for whoever writes the next signal entry

The signal line must survive being read out loud after the words "this room came out of."
If the resulting sentence is a category ("this room came out of our music collection"),
the signal is wrong — it should be a specific transmission with a name.

---

## 5. The host line

**`Look for Maya Reyes, Los Angeles organizer.`**

`Look for` instead of `Hosted by` because the line exists to solve an actual physical
problem: a stranger walking into Elysian Park at 6pm, seeing forty people, and not knowing
which ones are the ones. "Hosted by" is a byline. "Look for" is an instruction, and it is
only writable by a brand that puts people in real parks — which is the entire point of the
section.

- With role: `Look for {name}, {role}.`
- Without role: `Look for {name}.`
- Roles are authored as short noun phrases, no pronouns, so the string works for any host
  without a gender field in the schema.
- This line does not get cut for length. Brief §4.5: cut the description first.

**Rejected:** `Maya Reyes is holding this one.` — "holding" is one syllable away from
"holding space," which is the wellness register the brand doesn't write in.

---

## 6. Status + capacity, one line (brief §4.2 row 8)

Template: **`{capacity} spots. {state}.`** Two facts, two full stops, no adjectives.

| status | capacity present | capacity absent |
|---|---|---|
| `open` | `40 spots. Open.` | `Open.` |
| `few-spots` | `40 spots. A few left.` | `Nearly full.` |
| `full` | `40 spots. All taken.` | `Full.` |
| `cancelled` | `Cancelled.` | `Cancelled.` |

`A few left` is the honest form of scarcity: it's true (the organizer set it), it's vague
in the direction of *less* pressure, and it never counts down. No "Only 3 left!", no
timers, no "Hurry". The room fills or it doesn't.

In the other-rooms rows this collapses to the state word alone — `Open`, `A few left`,
`Full`, `Cancelled` — because a row is a scan, not a decision.

---

## 7. The button (brief §4.2 row 9, §4.4)

### With `rsvpUrl` — `Save me a spot`

It is the sentence a person actually says, and it completes the line directly above it:
*"40 spots. A few left." → "Save me a spot."* Fourteen characters, comfortable in a
full-width mobile button, and it is a request from the visitor rather than a command at
them — which is the correct emotional direction for walking into a room full of strangers.

**Rejected:** `RSVP` — correct, instantly parsed, and on the button of every event listing
on the internet. This section's whole job is to not feel like a listing.

### Without `rsvpUrl` — `How to join` (current live behaviour for all three events)

Links to `/events/[slug]`. It promises exactly what is on the other side — a page that
explains how to show up — and it makes no reservation it cannot honour. Three words, no
verb the visitor has to disbelieve.

**Rejected:** `Get the details` — vaguer, and "details" is the least interesting noun in
English. **Rejected:** `Learn more` — could be pasted onto any website ever built.

The button never renders without a destination. If a future state produces neither
`rsvpUrl` nor a detail page, the button does not render at all; there is no third label.

---

## 8. The other rooms + the exit

**Optional heading: `Other rooms`** — an `<h3>` above the list. Not in the brief's §4.2
table; I'm proposing it and flagging it as an addition. It earns its place twice: it gives
the returning attendee a scan target for their own city, and it gives the list an
accessible name so a screen-reader user knows the divider meant something. If
`creative-director` reads it as visual clutter above a two-row list, cut it — the section
survives without it, and `art-director` may prefer the divider alone to carry the break.

**Row string:** `SEP 27 · New York · Brooklyn Gathering · Open`

Date without day-of-week here (rows are a scan, not a decision), city second because the
returning attendee is scanning for a city name. Whole row is the link; the accessible name
is the whole row read in order, which is already a complete sentence-shaped thing.

Cancelled row: `OCT 11 · Austin · First Signal · Cancelled`, struck. The word "Cancelled"
is present as text, never as strikethrough alone — strikethrough is not announced.

**Exit link:** `All gatherings →`

Plain, two words, and it promises the one thing `/events` actually delivers: more of these.
Omitted entirely when `others` is empty, per brief §4.3.

**Rejected:** `Every room` — "room" is the brand's word but it needs the surrounding
sentence to decode; as a bare link label it's a riddle at the exact moment the visitor is
leaving. **Rejected:** `View all gatherings →` (the current live string) — "View" is a
word nobody says.

---

## 9. States (brief §4.4)

### 9.1 Every upcoming room is `full`

> **Every room is full. The next one is yours to start.**

Button → `/start-a-gathering`: **`Start a gathering`**

Two sentences, no apology, no "unfortunately". The first is a fact that is quietly
flattering to the network; the second turns the dead end into the only door and hands the
visitor the verb that matches the page they land on. The full rooms still render below as
a list, honestly labelled `Full` — a visitor who sees four full rooms believes the fifth
one is worth starting.

### 9.2 An event is `cancelled`

Never featured. In the list: `Cancelled`, struck, still linked to the detail page. No
explanation string in the section — the reason lives on the detail page, where there's room
to be honest about it, and inventing a generic "this gathering was cancelled" line in the
list would be words that say nothing.

### 9.3 No upcoming events at all

> **Nothing on the calendar. Every room here started with one person picking a date.**

Button → `/start-a-gathering`: **`Start a gathering`**

Not "check back soon" — that is a request to leave, and it's also a lie, because nothing
will appear unless somebody does the thing. The second sentence is the empty state doing
real work: it explains the mechanism of the entire network in eleven words and makes the
ask without ever saying "you should".

**Rejected:** `No gatherings scheduled yet — check back soon, or start one yourself.`
(the current live string) — leads with an apology, buries the action behind a comma, and
"check back soon" asks the visitor to remember a website.

### 9.4 Featured event is `few-spots`

No state copy. The status line already carries it (§6); a second sentence about urgency is
manufactured scarcity wearing a hat.

### 9.5 Loading / no-JS / failure

No strings. Statically rendered, zero client JS (brief §4.4). If a copy string is ever
requested for a skeleton state in this section, something has gone wrong upstream.

---

## 10. The nav CTA (brief §6.2, §6.4)

**Label: `Find a gathering`** → `/events`

Desktop masthead: shown on every route except `/` and `/events*` (brief §6.2).
Mobile menu: always shown, every route, same label, same destination (brief §6.4).

`Find` is the verb because on `/series`, `/music` or `/shop` — the pages where this button
does its actual job — the visitor is not yet looking for a room, and "find" is the word for
discovering something you didn't know was there. "Gathering" over "room" because the nav is
the one place on the site with no surrounding context: `Find a room` decodes as hotel
booking to a cold visitor, and the brand's internal noun shouldn't cost a stranger a beat.
It also matches `/start-a-gathering` and the `/events` page title, so the site's own
vocabulary stays consistent across three routes.

**Rejected:** `Find a room` — shorter, more on-brand, reads like Booking.com without the
page around it. **Rejected:** `Meet in person` — describes the outcome, not the action, and
the nav slot is a door, not a thesis.

The label the nav loses in this pass is `Subscribe`, which is Gaia's CTA and — per the
agency README — the wrong thing for the masthead to be asking for. Nothing replaces it at
`/#subscribe`; the anchor and `EmailSignup.astro` both go (brief §6.6).

---

## 11. The alternate headline

The section's headline is its kicker (§1 explains why there is no separate one).

**Chosen:** `THE NEXT ROOM`
**Alternate:** `ONE ROOM, ONE DATE`

Why I didn't pick it: it explains the section's editorial rule to the visitor instead of
just doing it — a stranger doesn't need to be told there's only one, they can see there's
only one, and a kicker that describes its own restraint is a kicker admiring itself.

Also considered and dropped: `NEXT ROOM OPEN` (collides with the `Open` status word eight
lines later), `UPCOMING GATHERINGS` (the current live string — a listing label on a section
built specifically to not be a listing).

---

## 12. Content files written in this pass

### 12.1 New — `src/content/signals/`

| File | title | kind | part | href |
|---|---|---|---|---|
| `anyone-out-there.md` | Anyone Out There | `broadcast` | Transmission 001 | — |
| `nobody-is-coming-to-save-you.md` | Nobody Is Coming to Save You | `documentary` | — | — |
| `exit-interviews.md` | Exit Interviews | `series` | Episode 6 | — |

**`Anyone Out There`** is the brief §5.3 case: the network's own transmission into a city
where it has nobody yet, which is the only legitimate signal for a city's first-ever
gathering. It is written as a specific thing that was actually broadcast — a question sent
over the air with a date attached — not as a category. Per the brief, this is the **one**
`broadcast` entry; a second one authored to dodge the requirement means the rule has failed
and should be escalated, not routed around.

The other two are real content kinds, because LA and NYC are not first gatherings and have
no excuse to be. Each was written to make its room's existence make sense: you watch
*Nobody Is Coming to Save You* and you want to sit in a circle with people; *Exit
Interviews* ships an episode every two weeks and Brooklyn meets on the same clock.

No `href` on any of them. Nothing is watchable yet, and the brief is explicit: do not
invent a placeholder destination. When a real URL exists, add `href:` and the signal line
becomes a link with no copy change (§4.2).

Each entry has a short markdown body. Nothing renders it today; it exists so the
`/series` and `/docs-films` pages have real words to build against instead of lorem ipsum,
which is the whole reason copy comes before layout.

### 12.2 Edited — `src/content/events/*.md`

Added `signal:` and `host:` to all three:

| Event | signal | host.name | host.role |
|---|---|---|---|
| `austin-first-signal.md` | `anyone-out-there` | Priya Sundaram | Austin's first organizer |
| `la-eastside-circle.md` | `nobody-is-coming-to-save-you` | Maya Reyes | Los Angeles organizer |
| `nyc-brooklyn-gathering.md` | `exit-interviews` | David Kim | Brooklyn organizer |

Fictional organizer personas for a fictional site. Deliberately built on the initials
already sitting in `src/content/cities/` — `Priya S.`, `Maya R.`, `David K.` — so the host
on the homepage is the same person the city page already names. That consistency costs
nothing and is exactly the kind of detail that makes a made-up network read as a real one.

Roles are short noun phrases with no pronouns, per §5. "Austin's first organizer" is true
of that specific event and does a second job: it tells a stranger the room is new and that
showing up matters more than usual.

### 12.3 What I did not change

- **No `rsvpUrl` added.** Brief §5.5 item 3 makes it optional and §4.4 notes the no-RSVP
  fallback is *current live behaviour*. Inventing three fake URLs would have hidden the
  fallback state from `art-director` and `creative-developer` at exactly the moment they
  need to design and build it. `How to join` is the label they will actually ship.
  **Flagged, with attendance consequences:** real RSVP destinations are a content task
  someone has to do before launch.
- **Event descriptions unchanged.** All three are already in voice and inside the mobile
  length budget (brief §4.5). Rewriting them would have been change for its own sake.
- **`status` values unchanged.** No event uses `cancelled`; the enum gains the value in
  `creative-developer`'s schema pass, and §9.2 covers it when it's first used.
- **`src/content.config.ts`, every `.astro` component** — out of scope, `creative-developer` next.

Verified after writing: `npx astro sync` succeeds and `npx astro check` reports 0 errors
with the current schema (unknown frontmatter keys are stripped by zod, so the content sits
inert until the schema lands, and lands fully validated the moment it does).

---

## 13. Handoff notes

**For `art-director`:** the longest string in the featured block is the signal line, and it
is the one that must not wrap to three lines at 375px — `This room came out of` on one
line, title beneath. Budget for the LA case, which is the current featured event and has
the longest signal title of the three.

**For `brand-designer`:** §3 is the date format contract. Day of week survives any stamp
treatment.

**For `creative-developer`:** three strings are templates, not literals — the host line
(§5), the status line (§6), and the signal line (§4). Each has a stated fallback for a
missing optional field. There is no string in this deck for a state the brief doesn't have.

**Open question for `creative-director`:** the `Other rooms` heading in §8 is my addition
to the brief's structure. Keep or cut — I have a mild preference for keep, on accessible-
name grounds.
