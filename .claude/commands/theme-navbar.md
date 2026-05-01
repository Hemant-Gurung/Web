# Theme Navbar

Change the navbar variant for a restaurant. Controls the navigation layout and style.

## Available variants

| Variant | Description |
|---------|-------------|
| `drawer` | Burger menu (default). Slides in from the left. Best for restaurants with a full-bleed hero image. |
| `topbar` | Horizontal fixed bar at the top with inline links. Best for clean, content-focused layouts without a hero. |

## What you need from the user

Ask for these if not already provided in the arguments:

1. **Restaurant ID** — e.g. `my-restaurant` or `verde-kitchen`
2. **Variant** — `drawer` or `topbar`

---

## Step 1 — Update the restaurant config

Edit `packages/config/src/restaurants/<id>.ts`. Read the file first.

- If variant is `"drawer"`: remove the `navbarVariant` field entirely (drawer is the default).
- If variant is `"topbar"`: add or update `navbarVariant: "topbar"` at the top level of the config object.

---

## Step 2 — Check TopBar visibility

The layout renders both `<TopBar />` and `<Navbar>`. When using `topbar` variant the two bars may stack.

Read `apps/restaurant/src/app/[locale]/layout.tsx` and check if `<TopBar />` is rendered.

- If the user chose `topbar` and `<TopBar />` is present: inform the user that TopBar and the topbar Navbar will both appear — ask if they want TopBar hidden for this restaurant.
- If yes: wrap `<TopBar />` with a condition: `{restaurantConfig.navbarVariant !== "topbar" && <TopBar />}`

---

## Step 3 — Optional colour adjustments

If the user chose `topbar`, suggest they may want to adjust the navbar background. The topbar uses `--color-footer-bg` by default. To use a different colour, add to the theme:

```ts
"--color-nav-bg": "#your-colour",
```

And update `Navbar.css` `.ui-nav-topbar` to use `var(--color-nav-bg, var(--color-footer-bg, #111))`.

Only make this change if the user explicitly asks for a different navbar colour.

---

## Step 4 — Summary

Print what changed and remind the user to restart the dev server.
