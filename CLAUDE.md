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

## Architecture

```text
apps/
  restaurant/         Single Next.js 16 app — serves all restaurants via env var
    src/
      app/            Next.js App Router pages (about, contact, menu, reservations)
      components/     HeroHeader (restaurant-specific image strip)
      config/         Loads the right RestaurantConfig based on NEXT_PUBLIC_RESTAURANT_ID
      data/
        my-restaurant/menu.json
        verde-kitchen/menu.json
      styles/         global.css (reset), App.css (hero/layout)
    public/
      my-restaurant/  logo.png, background-fire*.jpg
    .env.my-restaurant
    .env.verde-kitchen

packages/
  ui/               Shared React components (Navbar, Footer, Hero, forms)
  config/           RestaurantConfig types + per-restaurant config objects
    src/
      restaurant.ts              — types + getNavLinks()
      restaurants/
        my-restaurant.ts         — My Restaurant config
        verde-kitchen.ts         — Verde Kitchen config
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

`restaurantConfig.features.reservations` controls whether the reservations page is active. `getNavLinks()` automatically omits disabled pages from the nav. The reservations page itself calls `notFound()` if the flag is false.

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
- `CMS_URL` — URL for the Payload CMS (default: `http://localhost:3002`)
- `CMS_API_KEY` — API key for this restaurant's CMS admin account

## CMS Collections (Payload CMS)

Menu data is fetched directly from Payload CMS — no auth needed, public `publicRestaurantRead` policy.

| Collection      | Slug              |
|-----------------|-------------------|
| Menu Categories | `menu-categories` |
| Menu Items      | `menu-items`      |

**Menu Categories fields:** `name`, `order`, `restaurant`

**Menu Items fields:** `name`, `description`, `price`, `available`, `category` (ID relation to menu-categories), `order`, `restaurant`

Filter by restaurant slug via `?where[restaurant][equals]=<slug>` (Payload `where` syntax). Items are scoped to a category via the `category` field (ID).

```http
GET /api/menu-categories?where[restaurant][equals]=<slug>&sort=order
GET /api/menu-items?where[restaurant][equals]=<slug>&sort=order&limit=200
```

## API Documentation

When the API server is running (from the `restaurant-platform-api` repo), Swagger UI is available at `http://localhost:4000/api-docs` and the raw OpenAPI JSON at `http://localhost:4000/swagger.json`.
