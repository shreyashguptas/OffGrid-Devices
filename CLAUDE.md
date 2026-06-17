# OffGrid Devices — Claude working notes

## Brand & design system

The OffGrid Beacon brand has a **canonical handoff bundle** maintained by the user in Claude Design. It is the source of truth for every visual decision on this site — palette, typography, spacing, geometry, button styling, section structure, logo usage, copy voice.

**Always consult the handoff before changing any visual treatment** — palette, typography, spacing, buttons, sections, layout, logo, copy voice. This applies to the whole repository: main, every worktree, every branch.

**Bundle URL** (re-fetch each session — the contents are not checked in):

```
https://api.anthropic.com/v1/design/h/LP4kX6eGU0pKu4FQcWS7sQ?open_file=Brand+Handoff.html
```

The URL serves a gzipped tarball. Use WebFetch, then `gunzip` + `tar -xf` into `$CLAUDE_JOB_DIR/design-handoff/`. The bundle unpacks to:

- `offgrid/README.md` — agent instructions, read first
- `offgrid/project/Brand Handoff.html` — entrypoint
- `offgrid/project/handoff/tokens/` — `tokens.json`, `tokens.css`, `tokens.scss`, `tailwind.preset.js` (canonical token values)
- `offgrid/project/handoff/copy/copy-deck.md` — voice + headline bank
- `offgrid/project/handoff/logo/{svg,png}/` — official mark + wordmark assets
- `offgrid/project/*.jsx` — section prototypes; `homepage-backcountry.jsx` is the canonical hero pattern
- `offgrid/chats/chat{1..5}.md` — design conversation transcripts

In-repo token mappings live in `src/app/globals.css` (`--app-pitch`, `--app-bark`, etc.). When the handoff and the in-repo tokens disagree, the **handoff wins** — update `globals.css`.

### Quick reference

- Palette: Pitch `#1B1813` · Bark `#3A2E22` · Coal `#100D09` · Bone `#F1ECE0` · Sand `#D9C9A8` · Ember `#FF6A00` (Ember-Deep `#A84A00` for Ember-as-text on light bg) · Dim `#9A9082`
- Type families: Archivo (display, 900, `-0.04em`, uppercase) · Inter Tight (body, 400/500) · Newsreader (editorial, 400 italic, `-0.01em`) · JetBrains Mono (mono, 500, `0.06em`, uppercase)
- Display scale: D1 128/0.88 · D2 80/0.92 · D3 56/1.0 · D4 40/1.05
- Body scale: B1 21/1.5 · B2 16/1.55 · B3 13/1.55
- Editorial scale: E1 44/1.18 · E2 24/1.4
- Mono scale: M1 13/1.4 · M2 11/1.4
- Geometry: `border-radius: 0` everywhere · `1px` hairlines (canonical color Bone @ 10% = `#F1ECE01A`) · `120px` section vertical padding · `56px` page gutter · `1280px` max width
- Primary button: `font: 700 13px/1 Archivo; letter-spacing: 0.14em; padding: 18px 28px; bg: Ember; fg: Pitch`
- Logo: **Beacon Ring** mark — an open "O" ring (`stroke-width 22` in a `0 0 200 200` viewBox) with a lit apex node at top; wordmark "OFFGRID" in Archivo 900. Bracketed variant (survey-corner brackets) is for motion/instrument moments only. In-repo: `src/components/shared/WaypointMark.tsx`, `src/lib/beaconMarkSvg.ts` (favicon/OG), `public/logo.svg`, `public/brand/*.svg`.
- **Changed an icon/favicon?** Bump `ICON_VERSION` in `src/lib/iconVersion.ts` so caches and future PWA installs pick up the new art (`public/icon-192.png`, `public/icon-512.png`, `public/logo.svg`, `src/app/icon.png`, `src/app/apple-icon.png`). An already-installed iOS home-screen tile can't be refreshed by code — it must be deleted and re-added.
- **One accent**: Ember appears once per surface. Never two.
- No drop shadows on surfaces. Type does the heavy lifting; chrome stays quiet.
