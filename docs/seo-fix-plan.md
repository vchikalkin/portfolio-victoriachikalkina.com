# SEO fix plan — victoriachikalkina.com

Status: metadata Phase 1–2 applied in code (fixing-metadata). Deploy + GSC verify still open.  
Source: SEO audit 2026-10-13 (localhost + prod + codebase).

## Goal

Ship the new URL model cleanly so GSC stops fighting redirects, and close the remaining quick SEO gaps.

**Canonical model (current code):**
- EN = `https://victoriachikalkina.com/` (not `/en`)
- RU = `https://victoriachikalkina.com/ru`
- `x-default` → `/`
- `/en` = noindex + canonical `/` (duplicate of English home)

---

## Phase 0 — Deploy + verify

Already done in code: no redirect from `/` to `/en`; English served at `/`.

After deploy, check:

- [ ] `curl -sI https://victoriachikalkina.com/` → **200** (not 307/301 to `/en`)
- [ ] Canonical on `/` → `https://victoriachikalkina.com`
- [ ] `/en` → `noindex` (or 301 → `/`)
- [ ] Sitemap lists `/` + `/ru` with xhtml hreflang
- [ ] GSC → URL Inspection on `/` and `/en`; request indexing for `/`
- [ ] GSC → Sitemaps: resubmit `sitemap.xml`
- [ ] Confirm old redirect errors clear after recrawl

---

## Phase 1 — Critical URL hygiene

| # | Task | Status |
|---|------|--------|
| 1.1 | `/en` noindex (canonical already `/`); root `/` forced indexable | Done in code |
| 1.2 | Absolute hreflang URLs via `getLocaleUrl` (align with sitemap) | Done in code |
| 1.3 | Sitemap hreflang (self + siblings + x-default); no fake `lastmod` / ignored `changefreq`/`priority` | Done in code |

Optional later: host-level 301 `/en` → `/` (Vercel/Cloudflare) — nicer than noindex alone.

---

## Phase 2 — Meta / schema / social

| # | Task | Status |
|---|------|--------|
| 2.1 | `MusicEvent.name` = program | Done |
| 2.2 | Descriptive gallery alts | **Open** (outside metadata skill scope) |
| 2.3 | Richer meta descriptions en/ru | Done |
| 2.4 | Facebook `sameAs` — strip tracker query | Done (share permalink; replace if you have a `/username` profile URL) |
| 2.5 | `og:image` + `twitter:summary_large_image` | Deferred (text-only messenger previews for now) |

---

## Phase 3 — Polish (after GSC settles)

| # | Task | Notes |
|---|------|--------|
| 3.1 | Person `description` from bio blurb | optional |
| 3.2 | Localize `knowsAbout` on `/ru` | low |
| 3.3 | SSR `html[lang]` without client script | optional |
| 3.4 | Rich Results Test on `/` and `/ru` | after deploy |
| 3.5 | GSC: redirect/canonical errors cleared | 2–4 weeks |

---

## Post-deploy smoke

```bash
curl.exe -sI "https://victoriachikalkina.com/"
curl.exe -sI "https://victoriachikalkina.com/en"
curl.exe -s "https://victoriachikalkina.com/sitemap.xml"
curl.exe -s "https://victoriachikalkina.com/robots.txt"
```
