# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Turborepo monorepo** for a multi-restaurant platform. It has two Next.js restaurant frontends, a shared Payload CMS admin, an Express.js API backend, and shared packages.

## Common Commands

### Run everything
```bash
npm run dev                    # All apps and server in parallel
```

### Run individual workspaces
```bash
npm run dev:my-restaurant      # Restaurant app (port 3000)
npm run dev:verde-kitchen      # Restaurant app (port 3001)
npm run dev:server             # Express API (port 4000)
npm run dev:cms                # Payload CMS admin (port 3002)
```

### Build & lint
```bash
npm run build                  # Build all workspaces via Turborepo
npm run lint                   # Lint all workspaces
```

### API client type generation
```bash
npm run generate:api           # Regenerate types from server/src/swagger.yaml → packages/api-client/src/schema.d.ts
```

### Database (run from `server/`)
```bash
npm run db:migrate             # prisma migrate dev (requires DIRECT_URL)
npm run db:generate            # prisma generate (after schema changes)
npm run db:studio              # Open Prisma Studio
```

### CMS migrations (run from `apps/cms/`)
```bash
npm run generate:types         # payload generate:types
npm run migrate:create         # payload migrate:create
npm run migrate                # payload migrate
```

## Architecture

```
apps/
  my-restaurant/    Next.js 16 (port 3000) — Restaurant #1 frontend
  verde-kitchen/    Next.js 16 (port 3001) — Restaurant #2 frontend
  cms/              Next.js + Payload CMS (port 3002) — content admin
packages/
  ui/               Shared React components (Navbar, Footer, forms)
  config/           Shared RestaurantConfig types
  api-client/       Auto-generated type-safe OpenAPI client
server/             Express.js API (port 4000) + Prisma ORM
```

**Data flow:**
- Restaurant frontends call the Express API via the `@repo/api-client` type-safe client
- Express routes use Prisma to read/write PostgreSQL (hosted on Supabase)
- Payload CMS has its own admin UI and writes to the same PostgreSQL database
- Shared UI components and config types live in `packages/` and are referenced as `@repo/ui`, `@repo/config`

## Key Patterns

### API client usage
The `@repo/api-client` package wraps `openapi-fetch`. After schema changes in `server/src/swagger.yaml`, run `npm run generate:api` to regenerate `packages/api-client/src/schema.d.ts`. The client is used in frontend apps as `apiClient.GET(...)` / `authenticatedClient().POST(...)`.

### Adding a new API endpoint
1. Add the route/handler in `server/src/routes/`
2. Document it in `server/src/swagger.yaml`
3. Run `npm run generate:api` to update the type-safe client
4. Use the updated client in the frontend apps

### Authentication
The Express backend uses JWT (`jsonwebtoken`). The `requireAuth` middleware in `server/src/middleware/` verifies tokens. Admin users are stored in the `Admin` Prisma model with bcrypt-hashed passwords.

### Multi-restaurant support
Both restaurant apps share the same API backend and UI package. Restaurant-specific config (name, branding, etc.) is typed via `RestaurantConfig` in `@repo/config`.

## Environment Variables

**Root `.env.local`:**
- `CMS_URL` — URL for the Payload CMS (default: `http://localhost:3002`)

**`server/.env`** (see `server/.env.example`):
- `DATABASE_URL` — Supabase pooled connection (used at runtime)
- `DIRECT_URL` — Supabase direct connection (used for Prisma migrations)
- `JWT_SECRET`, `JWT_EXPIRES_IN`
- `FRONTEND_URL`, `PORT`, `NODE_ENV`

## API Documentation

When the server is running, Swagger UI is available at `http://localhost:4000/api-docs` and the raw OpenAPI JSON at `http://localhost:4000/swagger.json`.
