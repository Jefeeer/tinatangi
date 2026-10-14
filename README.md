# Tinatangi Cafe

Spec landing page for Tinatangi Cafe (Salawag, Dasmariñas, Cavite). Concept "Liwanag": one day in the garden, scrolled (morning facade wiped to dusk, a clock that runs 7:00 AM to 12:00 MN, fairy lights that come on at night). Built by Aurevixa Technologies. Next.js 16, React 19, Tailwind 4, Motion, Lenis. One font family (Figtree).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
npm test           # open/closed logic (Asia/Manila) + AA contrast of every colour pair
npm run screens    # puppeteer screenshots into .screens/ (needs the dev server on :3000)
```

## Environment

See `.env.example`. `NEXT_PUBLIC_SITE_URL` sets canonical/OG/sitemap URLs. `NEXT_PUBLIC_ALLOW_INDEXING=true` lifts the default noindex (this is a concept preview) at launch.

## Editing content

All owner-editable data is in `content/`, shaped like future Supabase tables:

| File | Future table |
|---|---|
| `content/site.ts` | `site_settings` + `copy` (contact details, links, rating, every headline and paragraph) |
| `content/menu.ts` | `menu_categories`, `menu_items`, price-less lists |
| `content/hours.ts` | `opening_hours` (one row per weekday; drives the live Open/Closed badge and JSON-LD) |
| `content/gallery.ts` | `gallery_photos` (path, size, alt, caption) |

Unknown contact details are `null` in `site.ts` (phone, Messenger, email); their buttons stay hidden until filled in. "Message us" falls back to the Facebook page.

## Assets

`scripts/process-logo.mjs` makes the transparent badge and the traced Baybayin mark from the source logo; `scripts/make-assets.mjs` makes the OG image and icons. Photos came from public listings: replace with the owner's originals before launch.

## Deploy

Not deployed. When approved: create the repo, import into Vercel, set the env vars above.
