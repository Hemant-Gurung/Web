# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Turborepo monorepo** for a multi-restaurant platform. It has two Next.js restaurant frontends and shared packages. The Express.js API backend and Payload CMS each live in separate repositories.

## Common Commands

### Run everything
```bash
npm run dev                    # All apps in parallel
```

### Run individual workspaces
```bash
npm run dev:my-restaurant      # Restaurant app (port 3000)
npm run dev:verde-kitchen      # Restaurant app (port 3001)
```

### Build & lint
```bash
npm run build                  # Build all workspaces via Turborepo
npm run lint                   # Lint all workspaces
```

### API client type generation
```bash
npm run generate:api           # Regenerate types from the API's swagger.yaml → packages/api-client/src/schema.d.ts
```

## Architecture

```
apps/
  my-restaurant/    Next.js 16 (port 3000) — Restaurant #1 frontend
  verde-kitchen/    Next.js 16 (port 3001) — Restaurant #2 frontend
packages/
  ui/               Shared React components (Navbar, Footer, forms)
  config/           Shared RestaurantConfig types
  api-client/       Auto-generated type-safe OpenAPI client

# Separate repositories:
# restaurant-platform-api — Express.js API (port 4000) + Prisma ORM
# restaurant-platform-cms — Next.js + Payload CMS (port 3002) — content admin
```

**Data flow:**
- Restaurant frontends call the Express API via the `@repo/api-client` type-safe client
- The Express API lives in a separate repo (`restaurant-platform-api`) and uses Prisma to read/write PostgreSQL (hosted on Supabase)
- Payload CMS lives in a separate repo (`restaurant-platform-cms`) and writes to the same PostgreSQL database
- Shared UI components and config types live in `packages/` and are referenced as `@repo/ui`, `@repo/config`

## Key Patterns

### API client usage
The `@repo/api-client` package wraps `openapi-fetch`. After schema changes in the API repo's `swagger.yaml`, copy the updated file and run `npm run generate:api` to regenerate `packages/api-client/src/schema.d.ts`. The client is used in frontend apps as `apiClient.GET(...)` / `authenticatedClient().POST(...)`.

### Adding a new API endpoint
1. Add the route/handler in the `restaurant-platform-api` repo
2. Document it in that repo's `swagger.yaml`
3. Copy the updated `swagger.yaml` to this monorepo and run `npm run generate:api`
4. Use the updated client in the frontend apps

### Authentication
The Express backend (in `restaurant-platform-api`) uses JWT (`jsonwebtoken`). The `requireAuth` middleware verifies tokens. Admin users are stored in the `Admin` Prisma model with bcrypt-hashed passwords.

### Multi-restaurant support
Both restaurant apps share the same API backend and UI package. Restaurant-specific config (name, branding, etc.) is typed via `RestaurantConfig` in `@repo/config`.

## Environment Variables

**Root `.env.local`:**
- `CMS_URL` — URL for the Payload CMS (default: `http://localhost:3002`)

## API Documentation

When the API server is running (from the `restaurant-platform-api` repo), Swagger UI is available at `http://localhost:4000/api-docs` and the raw OpenAPI JSON at `http://localhost:4000/swagger.json`.
