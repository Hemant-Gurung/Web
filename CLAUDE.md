# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Turborepo monorepo** for a multi-restaurant platform. It has a single Next.js app (`apps/restaurant`) that serves multiple restaurants via the `NEXT_PUBLIC_RESTAURANT_ID` environment variable. Each restaurant is deployed as a separate Vercel project pointing at the same codebase. The Express.js API backend and Payload CMS each live in separate repositories.

## Common Commands

### Run locally

```bash
npm run dev:my-restaurant      # My Restaurant (port 3000)
npm run dev:verde-kitchen      # Verde Kitchen (port 3000)
```

### Build

```bash
npm run build:my-restaurant    # Build for My Restaurant
npm run build:verde-kitchen    # Build for Verde Kitchen
npm run build                  # Build all workspaces via Turborepo
npm run lint                   # Lint all workspaces
```

### API client type generation

```bash
npm run generate:api           # Regenerate types from the API's swagger.yaml → packages/api-client/src/schema.d.ts
```

### CMS type generation

```bash
npm run generate:cms-types     # Run payload generate:types in CMS repo → packages/ui/src/payload-types.ts
```

Run this after adding or changing fields in Payload CMS collections. The script also strips the `declare module 'payload'` block from the output — that block requires the `payload` npm package which is not installed in the frontend.

## Architecture

```text
apps/
  restaurant/         Single Next.js 16 app — serves all restaurants via env var
    messages/         Translation files: en.json, nl.json, fr.json
    middleware.ts     next-intl locale routing (redirects / → /en, /nl, etc.)
    src/
      app/
        layout.tsx              — minimal root layout (html/body, theme, lang attr)
        [locale]/               — all pages live here; locale param drives translations
          layout.tsx            — NextIntlClientProvider, Navbar, Footer, CartShell
          page.tsx / menu/ checkout/ about/ contact/ reservations/ order/success/
      components/     HeroHeader (restaurant-specific image strip), CartShell
      config/         Loads the right RestaurantConfig based on NEXT_PUBLIC_RESTAURANT_ID
      i18n/
        routing.ts              — defineRouting() using restaurantConfig.locales
        request.ts              — getRequestConfig(), loads messages/[locale].json
      styles/         global.css (reset), App.css (hero/layout)
    public/
      my-restaurant/  logo.png, background-fire*.jpg
    .env.my-restaurant
    .env.verde-kitchen

packages/
  ui/               Shared React components (Navbar, Footer, Hero, forms, cart, checkout, i18n)
    src/
      payload-types.ts           — generated Payload CMS types (run generate:cms-types)
      components/
        CartProvider.tsx         — React Context + localStorage cart state
        CartDrawer.tsx           — slide-in cart panel + fixed cart button; uses useTranslations("Cart")
        CheckoutForm.tsx         — checkout form + order summary; uses useTranslations("Checkout")
        MenuPageClient.tsx       — menu grid + tabs; uses useTranslations("Menu")
        LocaleLink.tsx           — wraps next/link, auto-prefixes /{locale} to all internal hrefs
        LanguageSelector.tsx     — EN/NL/FR toggle buttons; hidden when restaurant has only 1 locale
  config/           RestaurantConfig types + per-restaurant config objects
    src/
      restaurant.ts              — types + getNavLinks() (labels are now translation keys, not hardcoded)
      restaurants/
        my-restaurant.ts         — locales: ["en"]
        verde-kitchen.ts         — locales: ["en", "nl", "fr"]
      index.ts                   — re-exports all configs and types
  api-client/       Auto-generated type-safe OpenAPI client

# Separate repositories:
# restaurant-platform-api — Express.js API (port 4000) + Prisma ORM
# restaurant-platform-cms — Next.js + Payload CMS (port 3002) — content admin
```

## Adding a New Restaurant

1. Add a new config file at `packages/config/src/restaurants/<id>.ts` implementing `RestaurantConfig`
2. Register it in `packages/config/src/index.ts` (add to the `configs` map in `apps/restaurant/src/config/restaurant.ts`)
3. Add menu data at `apps/restaurant/src/data/<id>/menu.json`
4. Add public assets at `apps/restaurant/public/<id>/`
5. Create `apps/restaurant/.env.<id>` with `NEXT_PUBLIC_RESTAURANT_ID=<id>` and `CMS_API_KEY`
6. Add dev/build scripts to root `package.json`
7. Create a new Vercel project pointing to this repo with `NEXT_PUBLIC_RESTAURANT_ID=<id>` and `CMS_API_KEY` set in its environment

## Vercel Deployment

Each restaurant is a **separate Vercel project** using the same GitHub repo:

| Vercel Project | Root Directory  | Key Env Vars                                             |
|----------------|-----------------|----------------------------------------------------------|
| my-restaurant  | apps/restaurant | `NEXT_PUBLIC_RESTAURANT_ID=my-restaurant`, `CMS_API_KEY` |
| verde-kitchen  | apps/restaurant | `NEXT_PUBLIC_RESTAURANT_ID=verde-kitchen`, `CMS_API_KEY` |

## Key Patterns

### Restaurant config selection

`apps/restaurant/src/config/restaurant.ts` reads `NEXT_PUBLIC_RESTAURANT_ID` (inlined at build time by Next.js) and exports the matching `RestaurantConfig`. All pages import from `@/config/restaurant`.

### Theme

Each `RestaurantConfig` has a `theme` object — a flat map of CSS custom properties (`--color-primary`, etc.). These are injected on the `<html>` element in `layout.tsx` as inline styles, so all shared UI components automatically pick up the right brand colours via CSS vars.

### Feature flags

`restaurantConfig.features.reservations` controls whether the reservations page is active. `restaurantConfig.features.ordering` controls online ordering. `getNavLinks()` automatically omits disabled pages from the nav. Each page calls `notFound()` if its flag is false.

`restaurantConfig.orderType` can be `"takeaway"`, `"eat-in"`, or `"both"`. When `"both"`, the checkout form shows a toggle. When fixed to one type, no toggle is shown.

### Internationalisation (next-intl)

All pages live under `app/[locale]/`. The `middleware.ts` intercepts every request and redirects to the correct locale prefix (e.g. `/` → `/en`).

**Adding a locale to a restaurant:**

1. Add the locale code to `restaurantConfig.locales` in `packages/config/src/restaurants/<id>.ts`
2. Add a `messages/<locale>.json` file in `apps/restaurant/messages/`

**Translation namespaces** (all in `messages/*.json`):

- `Nav` — navigation labels
- `Menu` — menu page (title, All tab, Add button)
- `Cart` — cart drawer
- `Checkout` — checkout form labels and buttons
- `OrderSuccess` — post-payment confirmation page
- `About`, `Contact`, `Reservations` — page headings

**`getNavLinks()`** now returns translation keys as `label` values (e.g. `"menu"`, `"about"`). The `[locale]/layout.tsx` translates them via `getTranslations("Nav")` before passing to `<Navbar>`.

**`LocaleLink`** must be used instead of `next/link` anywhere inside `packages/ui` components — it reads `useLocale()` and auto-prefixes `/{locale}` to every internal href. Do not use bare `next/link` in shared components.

**`LanguageSelector`** renders nothing when `locales.length <= 1`, so single-locale restaurants are unaffected.

### API client usage

The `@repo/api-client` package wraps `openapi-fetch`. After schema changes in the API repo's `swagger.yaml`, copy the updated file and run `npm run generate:api` to regenerate `packages/api-client/src/schema.d.ts`.

### Authentication

The Express backend (in `restaurant-platform-api`) uses JWT (`jsonwebtoken`). The `requireAuth` middleware verifies tokens. Admin users are stored in the `Admin` Prisma model with bcrypt-hashed passwords.

**Payload CMS API key auth:** API keys live on the `admins` collection (slug = `admins`). The correct header format is:

```http
Authorization: admins API-Key <key>
```

Not `users API-Key` — Payload requires the collection slug that owns the key.

## Environment Variables (per restaurant env file)

- `NEXT_PUBLIC_RESTAURANT_ID` — slug matching a key in the configs map (`my-restaurant`, `verde-kitchen`)
- `NEXT_PUBLIC_LOCALES` — comma-separated locale list for this restaurant (e.g. `en` or `en,nl,fr`); first entry is the default locale used by middleware
- `NEXT_PUBLIC_CMS_URL` — browser-exposed CMS URL (used by client-side code only; may point to a preview deployment)
- `CMS_URL` — server-only CMS URL; always points to production. Used for menu fetches (with API key) and checkout POST. Never use `NEXT_PUBLIC_CMS_URL` in server actions — Vercel preview deployments require auth cookies that server-to-server requests cannot send.
- `CMS_API_KEY` — API key for server-side CMS requests (menu items with images)

## CMS Collections (Payload CMS)

| Collection       | Slug                | Auth required |
|------------------|---------------------|---------------|
| Menu Categories  | `menu-categories`   | No            |
| Menu Items       | `menu-items`        | Yes (images)  |
| Orders           | `orders`            | Yes           |
| Reservations     | `reservations`      | No            |
| Contact Messages | `contact-messages`  | No            |

**Menu Categories fields:** `name`, `order`, `restaurant`

**Menu Items fields:** `name`, `description`, `price`, `available`, `image` (upload), `category` (relation → menu-categories), `order`, `restaurant`

**Orders fields:** `restaurant`, `type` (takeaway/eat-in), `status`, `customer` (name/phone/email), `items` (array: name/price/quantity), `total`, `tableNumber`, `notes`, `stripeSessionId`

Filter by restaurant slug via `?where[restaurant][equals]=<slug>` (Payload `where` syntax).

```http
GET /api/menu-categories?where[restaurant][equals]=<slug>&sort=order
GET /api/menu-items?where[restaurant][equals]=<slug>&sort=order&limit=200&depth=2
POST /api/checkout   → { url: string }  (public — no auth needed, rate-limited 10 req/60s per IP)
```

### Menu image fetching

The `image` field on menu items is an upload relation. To get the populated `{ url, ... }` object (not just an integer ID), both conditions must be met:

1. Send `Authorization: admins API-Key <key>` header — unauthenticated requests return raw integer IDs
2. Include `depth=2` in the query — needed to populate nested relations

After fetching, rewrite the image URL hostname to `CMS_URL`'s hostname. Payload stores URLs based on its `serverURL` config; on preview deployments this may point to a different origin that requires Vercel auth cookies, which browser `<img>` tags cannot send cross-origin.

```typescript
function resolveImageUrl(image): string | undefined {
  const u = new URL(media.url);
  u.hostname = new URL(CMS_URL).hostname;
  return u.toString();
}
```

### Online ordering flow

1. User builds cart via `CartProvider` (React Context + localStorage)
2. Checkout page (`/checkout`) renders `CheckoutForm` from `@repo/ui`
3. `CheckoutForm` calls `submitOrder` server action (`apps/restaurant/src/app/checkout/actions.ts`)
4. Server action POSTs to `${CMS_URL}/api/checkout` with cart + customer info + `successUrl`/`cancelUrl`
5. CMS responds with `{ url }` — a Stripe hosted checkout URL
6. Frontend redirects: `window.location.href = url`
7. After payment, Stripe webhook fires → CMS creates the Order record automatically
8. User lands on `/order/success` — static confirmation page, no API call needed

## API Documentation

When the API server is running (from the `restaurant-platform-api` repo), Swagger UI is available at `http://localhost:4000/api-docs` and the raw OpenAPI JSON at `http://localhost:4000/swagger.json`.
