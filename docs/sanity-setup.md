# Sanity setup

## 1. Create project

1. https://www.sanity.io/manage — create project (dataset `production`).
2. Copy project ID into `.env.local` (see `.env.example`).
3. API tokens:
   - **Viewer** → `SANITY_API_READ_TOKEN` (required on Next server / Vercel)
   - **Editor** → `SANITY_API_WRITE_TOKEN` (local only, optional after seed)
4. Pick a long random `SANITY_REVALIDATE_SECRET`.

Anonymous API currently only sees `biography` + `siteSettings`; concerts/media/photos need the read token.

## 2. Studio

```bash
pnpm sanity          # local http://localhost:3333
pnpm sanity:deploy   # hosted https://victoria-chikalkina.sanity.studio
```

If Studio shows **Data migration required** (i18n v4 → v5): click migrate on those fields (language moves from `_key` to `language`). Frontend GROQ supports both.

Invite the pianist as **Administrator** on Free (Editor role needs Growth).

## 3. Seed

Initial seed already ran. `pnpm sanity:seed` is disabled — edit in Studio.

## 4. Webhook (after deploy)

Sanity → API → Webhooks → URL:

`https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`

## 5. Env on Vercel

Set at least: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`.  
Do **not** put write token on Vercel unless you need it.
