# Add Restaurant

Add a new restaurant to the monorepo. This project uses a single Next.js app (`apps/restaurant`) that serves multiple restaurants via `NEXT_PUBLIC_RESTAURANT_ID`. Each restaurant is a separate Vercel project.

## What you need from the user

Before writing any files, ask for these details if not already provided in the arguments:

1. **ID** — lowercase, hyphenated slug (e.g. `sunset-bistro`). Used in file paths, env vars, and Vercel.
2. **Name** — display name (e.g. `Sunset Bistro`)
3. **Tagline** — short one-liner (e.g. `"Fresh. Simple. Nourishing."`)
4. **Description** — one sentence used on the home page
5. **Locales** — supported language codes, first is default (e.g. `en` or `en,nl,fr`)
6. **Primary colour** — hex code for the brand colour (drives the entire theme)
7. **Footer background** — dark hex for the footer (usually a very dark shade of the primary)
8. **Body background** — page background hex
9. **Reservations** — yes or no (walk-ins only?)
10. **Hero image strip** — yes or no (does it have a logo + banner image, or plain like Verde Kitchen?)
11. **CMS API key** — the Payload CMS API key for this restaurant (can be left as a placeholder)

Once you have the details, implement the following steps in order and mark each complete.

---

## Step 1 — Config file

Create `packages/config/src/restaurants/<id>.ts`.

Use the `RestaurantConfig` type from `../restaurant`. Model it after the existing configs:

- `packages/config/src/restaurants/my-restaurant.ts`
- `packages/config/src/restaurants/verde-kitchen.ts`

**Theme generation from primary colour `#RRGGBB`:**

Derive all theme vars programmatically:

- `--color-primary`: the exact hex provided
- `--color-primary-dark`: darken by ~15% (reduce each RGB channel by ~15%)
- `--color-primary-glow`: `rgba(R, G, B, 0.40)`
- `--color-primary-glow-md`: `rgba(R, G, B, 0.25)`
- `--color-primary-glow-sm`: `rgba(R, G, B, 0.20)`
- `--color-primary-glow-xs`: `rgba(R, G, B, 0.12)`
- `--color-primary-border`: `rgba(R, G, B, 0.45)`
- `--color-surface`: `rgba(255, 255, 255, 0.06)`
- `--color-surface-hover`: `rgba(255, 255, 255, 0.10)`
- `--color-border`: `rgba(255, 255, 255, 0.10)`
- `--color-footer-bg`: the footer hex provided
- `--color-body-bg`: the body hex provided

**Locales:**

Set `locales` to the array provided (e.g. `["en"]` or `["en", "nl", "fr"]`).

If multiple locales are provided, add translation fields for tagline, description, and story. Use sensible translations (or placeholder text the user can replace):

```ts
taglineTranslations: {
  nl: "...",
  fr: "...",
},
descriptionTranslations: {
  nl: "...",
  fr: "...",
},
// inside about:
storyTranslations: {
  nl: ["...", "..."],
  fr: ["...", "..."],
},
```

If only one locale (`["en"]`), omit all `*Translations` fields.

**Hero config** (only if user said yes to hero):

```ts
hero: {
  logoSrc: "/<id>/logo.png",
  backgroundMobileSrc: "/<id>/background-mobile.jpg",
  backgroundDesktopSrc: "/<id>/background-desktop.jpg",
},
```

**About, stats, team, homeFeatures** — use reasonable placeholder content that fits the restaurant's cuisine/concept. The user can edit later.

**Contact** — use placeholder address/phone/email/hours matching the restaurant's city if known.

---

## Step 2 — Register in the app config

Edit `apps/restaurant/src/config/restaurant.ts`:

1. Import the new config: `import { <camelCaseId>Config } from "@repo/config";`
2. Add it to the `configs` map: `"<id>": <camelCaseId>Config,`

Read the file first before editing.

---

## Step 3 — Menu data

Menu data is fetched live from the CMS (`/api/menu-items` and `/api/menu-categories`). No local JSON file is needed.

Remind the user to add the menu categories and items for this restaurant in the Payload CMS admin panel, setting the `restaurant` field to `<id>` on each record.

---

## Step 4 — Public assets directory

Only do this step if the user said yes to a hero image strip. If no hero, skip it.

Create `apps/restaurant/public/<id>/README.md` with:

```text
Place the following image assets here:
- logo.png — restaurant logo (shown in hero strip)
- background-mobile.jpg — hero background for mobile (≤768px)
- background-desktop.jpg — hero background for desktop
```

---

## Step 5 — Environment file

Create `apps/restaurant/.env.<id>`:

```bash
NEXT_PUBLIC_RESTAURANT_ID=<id>
NEXT_PUBLIC_LOCALES=<locales>
NEXT_PUBLIC_CMS_URL=https://your-cms-url.com
CMS_URL=https://your-cms-url.com
CMS_API_KEY=<cms-api-key-or-placeholder>
```

`NEXT_PUBLIC_LOCALES` is a comma-separated list matching `restaurantConfig.locales` (e.g. `en` or `en,nl,fr`). The first entry is the default locale used by the middleware.

`CMS_URL` is server-only (used in server actions and menu fetches with API key — always points to production). `NEXT_PUBLIC_CMS_URL` is browser-exposed (used for the public `/api/checkout` endpoint).

---

## Step 6 — Root package.json scripts

Edit `/Users/hemantgurung/Web/package.json`. Read it first, then add two new scripts alongside the existing ones:

```json
"dev:<id>": "cp apps/restaurant/.env.<id> apps/restaurant/.env.local && npm run dev --workspace=restaurant",
"build:<id>": "cp apps/restaurant/.env.<id> apps/restaurant/.env.local && npm run build --workspace=restaurant"
```

Note: use the `cp .env.<id> .env.local` pattern — do NOT use `--env-file` flag, it does not work correctly with Next.js.

---

## Step 7 — Summary

When done, print a checklist of everything created/modified, then show the Vercel setup instructions for this restaurant:

```text
Vercel project settings for <Name>:
  Framework:        Next.js
  Root Directory:   apps/restaurant

Environment variables to set in Vercel dashboard:
  NEXT_PUBLIC_RESTAURANT_ID = <id>
  NEXT_PUBLIC_LOCALES       = <locales>
  NEXT_PUBLIC_CMS_URL       = https://your-cms-url.com
  CMS_URL                   = https://your-cms-url.com
  CMS_API_KEY               = <the api key>
```

Also remind the user:

- Add menu categories and items via the Payload CMS admin panel (set `restaurant` field to `<id>`)
- Replace placeholder about/team/story content in `packages/config/src/restaurants/<id>.ts`
- If multi-locale: fill in real translations for `taglineTranslations`, `descriptionTranslations`, `storyTranslations`
- Add real image assets to `apps/restaurant/public/<id>/` (if hero enabled)
- Generate a CMS API key in the Payload admin panel if not done yet
