# Add API Integration

Add a new CMS-backed read or write to the Next.js frontend. Follows the patterns established for menu (read) and reservations (write).

---

## Before you start — read these rules

### Auth header format (Payload CMS)
```http
Authorization: admins API-Key <CMS_API_KEY>
```
- The prefix is the **collection slug that owns the key** — always `admins` for this project.
- `users API-Key` is wrong and will return 403.
- Menu reads use `publicRestaurantRead` — no auth header needed.

### Filtering by restaurant (Payload REST)
Payload ignores flat query params. Always use the `where` syntax:
```
?where[restaurant][equals]=<slug>
```
Not `?restaurant=<slug>` — that returns all documents unfiltered.

### Env vars
- `CMS_URL` — server-only (no `NEXT_PUBLIC_` prefix). Read at module level: `process.env.CMS_URL ?? "http://localhost:3002"`.
- `NEXT_PUBLIC_RESTAURANT_ID` — available on server and client.
- `CMS_API_KEY` — server-only, never send to the browser.
- Env files load via `cp apps/restaurant/.env.<id> apps/restaurant/.env.local` — run `npm run dev:<id>` to trigger this.

### Always include `restaurant` on writes
Every CMS collection that is scoped per-restaurant requires the `restaurant` field on create. Omitting it returns:
```json
{"errors":[{"message":"The following field is invalid: Restaurant"}]}
```
Always add: `restaurant: process.env.NEXT_PUBLIC_RESTAURANT_ID`

### Server actions keep secrets server-side
Use a Server Action (`"use server"`) for writes — no need for a separate `/api/` proxy route. The action already runs server-side so `CMS_API_KEY` is never exposed.

### Error debugging
Always log the raw response body on failure:
```typescript
const body = await res.text();
console.error("[feature] CMS error:", res.status, body);
```
`JSON.stringify(error)` from `openapi-fetch` returns `{}` for 5xx — use raw fetch instead.

---

## Pattern A — CMS read (server component)

Use this for pages that display CMS content (like the menu page).

**1. Add the fetch to the page server component:**

```typescript
// apps/restaurant/src/app/<feature>/page.tsx
const CMS_URL = process.env.CMS_URL ?? "http://localhost:3002";
const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID!;

export const revalidate = 3600; // adjust as needed

export default async function FeaturePage() {
  try {
    const params = new URLSearchParams({
      "where[restaurant][equals]": RESTAURANT_ID,
      sort: "order",
    });

    const res = await fetch(`${CMS_URL}/api/<collection-slug>?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[feature] CMS error:", res.status, body);
      return <FeatureUnavailable />;
    }

    const json: { docs: CmsItem[] } = await res.json();
    const items = json.docs ?? [];

    return <FeatureClient items={items} />;
  } catch (err) {
    console.error("[feature] fetch failed:", err);
    return <FeatureUnavailable />;
  }
}
```

**2. Check the actual field names** by fetching one raw document first:
```
GET <CMS_URL>/api/<collection-slug>?limit=1
```
Inspect the response to confirm field names before writing types.

---

## Pattern B — CMS write (server action)

Use this for forms that create CMS documents (like reservations).

**1. Create the server action:**

```typescript
// apps/restaurant/src/app/<feature>/actions.ts
"use server";

const CMS_URL = process.env.CMS_URL ?? "http://localhost:3002";
const CMS_API_KEY = process.env.CMS_API_KEY;
const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID;

export async function submitFeature(data: FeatureData): Promise<void> {
  const res = await fetch(`${CMS_URL}/api/<collection-slug>`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(CMS_API_KEY && { Authorization: `admins API-Key ${CMS_API_KEY}` }),
    },
    body: JSON.stringify({
      // map form fields to CMS fields
      restaurant: RESTAURANT_ID, // required — scopes to this restaurant
      ...data,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[feature] CMS error:", res.status, body);
    const message = (() => {
      try { return JSON.parse(body).message; } catch { return null; }
    })();
    throw new Error(message ?? "Failed to submit");
  }
}
```

**2. Wire the action to the form:**

```typescript
// apps/restaurant/src/app/<feature>/page.tsx
import { submitFeature } from "./actions";
import { FeatureForm } from "@repo/ui";

export default function FeaturePage() {
  return <FeatureForm onSubmit={submitFeature} />;
}
```

---

## Common errors and fixes

| Error | Cause | Fix |
|-------|-------|-----|
| 403 `You are not allowed to perform this action` | Wrong auth header prefix | Change `users API-Key` → `admins API-Key` |
| 400 `Restaurant field is required` | Missing `restaurant` in body | Add `restaurant: RESTAURANT_ID` to the POST body |
| 400 `path cannot be queried: <field>` | Wrong field name or flat param used | Fetch `?limit=1` to see real field names; use `where[field][equals]` syntax |
| 500 `Something went wrong` | Malformed `where` query | Check field name exists; use bracket syntax not flat params |
| `ECONNREFUSED` | `CMS_URL` falling back to localhost | Restart dev server with `npm run dev:<id>` to reload `.env.local` |
| Empty `JSON.stringify(error)` | Using `openapi-fetch` for 5xx errors | Switch to raw `fetch` and call `res.text()` for error body |

---

## Checklist

- [ ] Fetched `?limit=1` to verify real field names before writing types
- [ ] Used `where[restaurant][equals]` filter (not flat param)
- [ ] Included `restaurant: RESTAURANT_ID` in POST body
- [ ] Used `admins API-Key` header (not `users API-Key`)
- [ ] Server action used — `CMS_API_KEY` never sent to browser
- [ ] Error handling logs `res.status` + `res.text()` body
- [ ] Dev server restarted after env file changes
