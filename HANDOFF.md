# Sofle Studio — handoff

A **bun-native fork of [`cormoran/dya-studio`](https://github.com/cormoran/dya-studio)** (a ZMK-Studio web app with USB **and Bluetooth** keymap editing), being rebranded + tailored for the **Eyelash Sofle** keyboard. License: **AGPL-3.0** (inherited — keep it; a public deploy/distribution must publish source + keep upstream attribution).

This file is the handoff for continuing in a dedicated session **inside this folder** (`~/Projects/sofle-studio`). The sibling firmware repo is `~/Projects/zmk-sofle`.

## Status: bun conversion DONE + verified ✅

- `bun install` works; a **`postinstall`** (`scripts/build-client-deps.sh`) builds the git-dependency ZMK Studio client packages that bun can't build itself.
- `bun run dev` ✅ (dev server at http://localhost:5173) and `bun run build` ✅ (production `dist/` builds clean) — both verified.
- Toolchain: bun 1.3.14, React 19 + Vite (rolldown-vite) + TS. npm/pnpm lockfiles removed; `bun.lock` is the lockfile.

### How to run

```bash
bun install      # also builds the client packages via postinstall
bun run dev      # http://localhost:5173 (open in Chrome/Edge for WebSerial/WebBluetooth)
bun run build    # production build → dist/
```

### Key gotcha (why scripts/build-client-deps.sh exists)

Two deps are **git deps with npm-oriented postinstall builds** bun won't run:

- `@cormoran/zmk-studio-react-hook` (`github:cormoran/react-zmk-studio`) — `postinstall: npm run build`
- `@zmkfirmware/zmk-studio-ts-client` (`github:cormoran/...#custom-studio-protocol+bluefy`) — `postinstall: run-script-os`

So we build them directly with their own `tsc`. The react-hook pins its **own nested copy** of ts-client at a different ref, so the script builds **every** copy (all ts-client first, then react-hook). Missing `@types/web-bluetooth` + `@types/w3c-web-serial` were added as devDeps so those builds are type-clean. **Do not rename these dep package names** — they are the real ZMK Studio protocol client.

## Done so far (committed here)

- `package.json`: name `dya-studio` → **`sofle-studio`**; scripts npm→bun; `postinstall` + `build:client-deps`; added `@types/web-bluetooth` + `@types/w3c-web-serial`; dropped the pnpm-only config block.
- `scripts/build-client-deps.sh` (new).
- `index.html`: `<title>` + og:title/description → **Sofle Studio**.

## Remaining work (next steps)

### 1. Finish the DYA → Sofle rebrand (cosmetic strings)

Replace user-visible "DYA Studio" / "DYA" branding (NOT the `@cormoran`/`@zmkfirmware` dep names). Files with refs (from `grep -rni dya src index.html README.md .github wrangler.toml`):

- `README.md` (rewrite for Sofle Studio + AGPL/upstream attribution)
- `src/components/SplashScreen.tsx`, `ConnectionNoticeDialog.tsx` (“DYA Studio collects…”)
- `src/components/KeycodeSelector.tsx` (comments), `src/layouts/AppLayout.tsx`, `src/pages/{HomePage,BLEConnectionsPage,CustomSubsystemsPage,KeymapPage}.tsx`, `src/contexts/ThemeContext.tsx`, `src/lib/behaviorMetadata.ts`
- `src/lib/connectionNoticeStorage.ts` + tests: localStorage keys `dya-studio-connection-notice-*` (rename to `sofle-studio-*` if desired — changes stored consent state)
- Branding assets: `src/assets/dya.svg`, `public/` (favicon/og-image), the `dya2*.jpeg` / `dya-dash*.jpeg` images in `src/` (replace with Sofle imagery or drop)
- `.github/copilot-instructions.md`

### 2. Make it keyboard-specific (the real tailoring)

- `src/lib/layouts.ts` defines DYA physical layouts (`DYA_DASH`, `DYA_DASH_ARROW`, `DYA2_ANSI`, `DYA2_JIS`). **Add an `EYELASH_SOFLE` PhysicalLayout** (64 keys) and make it the default. Source of truth for the physical layout: `~/Projects/zmk-sofle/config/eyelash_sofle.json` (keymap-drawer layout) and the keymap `config/eyelash_sofle.keymap`.
- `src/lib/transport/demo.ts`: swap the demo keyboard/layouts to the Sofle.
- Remove DYA-Dash-specific features that don't apply (e.g. 25mm trackball UI) if the Eyelash Sofle doesn't have them — its pointing is a small joystick/encoder; trackball CPI panels may be irrelevant.

### 3. CI / deploy / privacy

- `.github/workflows/test.yml` + `release.yml`: convert to bun (`oven-sh/setup-bun`, `bun install`, `bun run …`).
- `wrangler.toml`: Cloudflare deploy — re-target to your account or drop (not needed for local use).
- `index.html`: remove the Google Analytics snippet (it points at cormoran's GA via `%VITE_GOOGLE_ANALYTICS_ID%`); also update og:image / og:url / twitter:site once you have a deploy URL.

### 4. Publish (decide first — outward-facing)

- **GitHub fork vs fresh repo?** A `gh repo fork cormoran/dya-studio` keeps the upstream link (easy to pull fixes) but starts as `rdlu/dya-studio` (rename to `sofle-studio` after). A fresh `rdlu/sofle-studio` is cleaner but loses the fork link. Either way: **AGPL** → if public/deployed, source must stay published + attribute cormoran.
- Current git: `origin` still points at `cormoran/dya-studio`. Set your remote before pushing.

### 5. Wire back into zmk-sofle

- Once published, point `~/Projects/zmk-sofle` `mise run studio` at this fork’s URL and drop its inline `build-client-deps` loop (the fork’s postinstall handles it). Tracked in **zmk-sofle Issue #30**.

## Cross-refs

- zmk-sofle **PR #28** — DYA Studio firmware (v2.5.0 candidate, awaiting hardware test, Issue #29).
- zmk-sofle **Issue #30** — this fork’s plan (Option A single-fork vs Option B fully-bun-native 3 forks).
