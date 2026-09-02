# EquipWorld

Heavy equipment marketplace. Next.js 14 (App Router) + Supabase + Vercel.

## ⚠️ Important — read before using

This codebase is a **reconstruction**, not a recovery of the original deployed source.
The original live site (`equipworld.vercel.app`) was deployed via direct file upload to
Vercel with no Git history, and the source could not be retrieved. This version was
rebuilt from documentation of the site's features (category specs, listing cards, photo
enforcement, browse filters, and the new in-app messaging system).

**What this means practically:**
- Core flows (browse, listing detail, sell → draft, messaging) are functional and wired
  to your real Supabase schema (`listings`, `listing_photos`, `inquiries`, `messages`,
  `profiles`).
- Exact styling, copy, edge-case handling, and any bug fixes made to the original site
  are **not** preserved — this uses plain Tailwind defaults, not your original design.
- Auth pages (`/login`), photo upload flow (`/sell/[id]/photos`), and listing edit page
  are referenced but not yet built out — see TODO below.
- Treat this as a solid starting point to review and refine, not a guaranteed match to
  what was live before.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + anon key
npm run dev
```

## TODO before this fully replaces the live site

- [ ] Build `/login` (Supabase auth UI)
- [ ] Build `/sell/[id]/photos` (photo upload + publish flow — must enforce photos
      exist before status can move from `draft` to `active`)
- [ ] Build `/listing/[id]/edit`
- [ ] Rebuild real category spec fields in `lib/specs.ts` (only 3 sample categories
      included here — excavator, wheel_loader, crane)
- [ ] Match original visual design/branding
- [ ] Add saved searches, favorites, map view (Phase 2 backlog, not started)