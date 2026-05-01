# Theme Font

Set or change the font family for a restaurant. Fonts are loaded from Google Fonts and applied via CSS custom properties.

## What you need from the user

Ask for these if not already provided in the arguments:

1. **Restaurant ID** — e.g. `my-restaurant` or `verde-kitchen`
2. **Body font** — Google Fonts family name for body text (e.g. `Lato`, `Inter`, `Plus Jakarta Sans`)
3. **Heading font** — optional separate font for headings (e.g. `Playfair Display`, `Fraunces`). Leave blank to use the same as body.

---

## Step 1 — Build the Google Fonts URL

Construct the `fontUrl` from the chosen fonts. Examples:

- Body only: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`
- Body + heading: `https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@400;600&display=swap`

Replace spaces in font names with `+`. Always include `display=swap`.

---

## Step 2 — Update the restaurant config

Edit `packages/config/src/restaurants/<id>.ts`. Read the file first.

Add or update the following fields at the top level of the config object (after `theme`):

```ts
fontUrl: "<constructed-google-fonts-url>",
```

Inside the `theme` object, add or update:

```ts
"--font-family": "'<BodyFont>', sans-serif",
```

If a heading font was provided, also add:

```ts
"--font-family-heading": "'<HeadingFont>', serif",
```

If no heading font, remove `--font-family-heading` if it exists.

---

## Step 3 — Verify global CSS uses the vars

Check `apps/restaurant/src/styles/global.css` — confirm the `body` rule contains:

```css
font-family: var(--font-family, system-ui, sans-serif);
```

If it's missing, add it. Do not change it if it's already there.

Check that headings use `--font-family-heading` if you added one:

```css
h1, h2, h3 {
  font-family: var(--font-family-heading, var(--font-family, system-ui));
}
```

Add this rule if a heading font was provided and the rule doesn't already exist.

---

## Step 4 — Summary

Print what changed:
- Restaurant config updated
- Font URL set
- CSS vars set
- Whether heading font was added or removed

Remind the user: font changes take effect after restarting the dev server (`npm run dev:<id>`).
