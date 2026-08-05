# Design / UX Audit Report

**Site:** http://localhost:3000 (redirect → `/ru`)  
**Date:** 2026-08-05  
**Method:** Browser MCP (navigate, snapshot, screenshot, click, console) + HTML/meta fetch + read-only code inspection  
**Scope:** Analysis only — no code changes

---

## Recheck (after blocked-tab timeouts)

Earlier MCP timeouts were environmental (tab blocked), not product hangs. Re-verified:

| Check | Result |
|-------|--------|
| Light ↔ Dark theme toggle | ✓ Instant; `aria-pressed` updates; no console errors |
| Theme after full re-navigation | ✓ Dark remains pressed after `navigate` to same URL and across `/ru` → `/en` |
| Nav hash click (Biography) | ✓ URL → `#biography`; solid header; bio layout OK in light + dark screenshots |
| Hero CTA «Смотреть афишу» | ✓ → `#schedule` |
| Photo lightbox open / next / close | ✓ `dialog`, counter `1/6`→`2/6`, prev disabled on first, next works |
| Repertoire `<details>` accordion | ✓ Expands to H4 composers + work lists |
| Locale EN | ✓ Full EN copy; dark theme kept |
| Console | ✓ Empty throughout recheck |

**New issues found on recheck (not timeouts):**

1. **Lightbox survives hash navigation** — open photo, then go to `#repertoire`: dialog stays open over new section until Close. Should close on route/hash change or Esc (Esc not re-tested).
2. **RU/EN content parity** — EN awards include «Rachmaninoff Days… 2015»; RU list in snapshot started at MariaFest 2018 (missing that prize).
3. **Name spelling** — EN schedule artists cell uses «Viktoriia» while site brand is «Victoria».
4. Lightbox chrome is thin (arrows/X); background section titles remain readable through overlay — visual noise (minor).

Scores below **unchanged** — recheck confirmed interactions work; it does not clear Critical SEO/copy/brand issues.

---

## Limitations (what could NOT be fully verified)

| Item | Why |
|------|-----|
| Viewport resize to 390×844, 430×932, 768×1024, etc. | Browser MCP has **no setViewport / resize** API. Responsive findings below are from **code breakpoints + desktop screenshots**, not live multi-device captures. |
| Exact WCAG contrast ratios | No computed-style / axe tooling in MCP. Contrast judged visually + from token values. |
| Network waterfall / failed requests panel | No Network API. Checked key URLs via HTTP (`hero`, favicon, `/en` = 200; `/robots.txt`, `/sitemap.xml` = **404**). |
| LCP / CLS / INP numbers | No Lighthouse / Performance API. Qualitative only. |
| Full keyboard Tab-order / `:focus-visible` walk | Partially observed via a11y tree; not a complete keyboard audit. |
| `prefers-reduced-motion` runtime | No motion-preference simulation; **no CSS media query found** in `globals.css`. |
| Esc-to-close lightbox | Not re-tested in this pass. |

---

# Executive Summary

Общая оценка:

| Dimension | Score |
|-----------|------:|
| UI | **6.0**/10 |
| UX | **5.5**/10 |
| Accessibility | **4.5**/10 |
| SEO | **4.0**/10 |
| Visual consistency | **6.5**/10 |
| Mobile readiness | **5.0**/10 *(inferred)* |
| Premium brand fit | **5.5**/10 |

**Verdict in one line:** Competent Next.js portfolio with a strong photographic hero and clean editorial type pairing, but it still reads as a polished student/template site — not yet a booking-ready international artist brand site.

---

# Top 10 проблем

| Приоритет | Проблема | Где | Почему важно | Impact | Effort |
|-----------|----------|-----|--------------|--------|--------|
| Critical | Нет `og:image` / Twitter image при `summary_large_image` | Metadata | Share cards пустые/непредсказуемые; пресса и агенты видят «сырой» линк | High | Low |
| Critical | Нет `robots.txt` и `sitemap.xml` (404) | `/robots.txt`, `/sitemap.xml` | Индексация и discoverability сломаны на уровне базовой SEO-гигиены | High | Low |
| Critical | Gender mismatch: «Пианист» vs «Пианистка» | Hero role vs Bio/keywords | Подрывает доверие к бренду в первый экран | High | Low |
| High | YouTube = `@edurmajor`; Facebook = share URL с `mibextid` | Footer / `siteConfig` | Выглядит как личный/черновой аккаунт разработчика, не артиста | High | Low |
| High | Contact = Gmail only, no form / press kit / management | Contact | Агенты фестивалей ждут professional channel + материалы | High | Med |
| High | Photo alts = «Фотография 1…6» | Photos | A11y + SEO fail; gallery бесполезна для поиска/скринридеров | High | Low |
| High | Desktop nav only from `xl` (1280px); tablet = burger only | Header | На iPad landscape IA хуже, чем ожидают от premium site | Med | Med |
| High | Concert table `min-w-[800px]` → horizontal scroll on tablet | Schedule | Classic mobile/tablet UX debt | Med | Med |
| Medium | Past concerts hidden on mobile (`hidden md:block`) | Schedule | Потеря контента/доказательства карьеры на основном устройстве | Med | Low |
| Medium | Hero always `zinc-950` + white; theme barely affects first viewport | Hero / Theme | Theme switcher feels ornamental; hierarchy of brand vs system chrome weak | Med | Med |

---

# Подробный аудит

## 1. Hero

### Что хорошо
- Full-bleed B&W photography — правильный «atmospheric plane» для пианиста.
- Имя как H1 в Playfair — доминирующий brand signal.
- Next concert card + CTA «Смотреть афишу» даёт actionable next step.
- Hero image preload + `sizes="100vw"` — правильный LCP intent.

### Что плохо
- Role label **«ПИАНИСТ»** (мужской род) на женском портрете — Critical copy error.
- Два конкурирующих якоря внимания: огромное имя слева и белая CTA-карточка справа (split focus).
- Hero **не реагирует на light/dark** (`bg-zinc-950 text-white` всегда) — тема не меняет первый экран.
- Overlay hardcoded `zinc` / `white`, не design tokens.
- CTA `rounded-none` + `bg-white` ломает button-system (`rounded-md` elsewhere).
- На мобиле crop `object-left` — риск обрезать лицо (не проверено resize’ом).

### Конкретные наблюдения
- Hierarchy score: **6/10** — фото сильно, композиция bottom-heavy, середина viewport часто «пустое небо/фон».
- Концерт в карточке дублирует venue+city длинной строкой → мелкий текст, слабая читаемость.

### Скриншот
Сделан (light): hero full-bleed + name + next-concert card. Dark: hero визуально тот же (by design).

---

## 2. Навигация

### Что хорошо
- Landmarks: `banner`, `main`, `contentinfo`.
- Theme/Locale controls с `aria-label` / `aria-pressed`.
- Mobile drawer с крупными serif-пунктами и lock body scroll.
- Header становится solid + blur после scroll (`SCROLL_THRESHOLD = 24`).

### Что плохо
- Desktop nav `hidden … xl:flex` — между ~768–1279 только hamburger.
- `aria-label="Main"` **захардкожен на английском** на RU-сайте.
- Нет skip link.
- Нет явного active-section indicator (все пункты одинаковы).
- На overlay-hero ссылки `text-white/70` — тонкие, мелкие; риск слабого контраста на светлых участках фото.
- Правый кластер (theme 3 icons + locale) визуально шумит рядом с именем.

### Конкретные наблюдения
- 7 пунктов — на грани перегруза для single-page; «Главная» рядом с brand link redundant.
- `SiteControls` (fixed top-right duplicate) существует в коде, но не используется в layout — мёртвый паттерн / риск путаницы.

---

## 3. Секции

### Что хорошо
- Повторяемый паттерн: uppercase eyebrow → serif H2 → content.
- Section rhythm `py-20 md:py-28` + muted alternate (`bg-secondary/40`) — предсказуемо.
- Bio: сильный контент (консерватория, ESKAS, награды, площадки).
- Repertoire: accordion/`details` — хорошая progressive disclosure.

### Что плохо
- **Медиа:** только 2 YouTube; audio пустой — секция «тонкая» для артиста.
- **Афиша:** 2 upcoming; past скрыты на mobile.
- **Контакты:** один mailto-блок — выглядит недоделанным для «бронирования и прессы».
- Geneva row: venue = «Женева, Швейцария» при city = «Женева» — data smell.
- Artists «—» без пояснения для solo Mozart — выглядит как дыра в данных.
- Vertical whitespace между блоками на wide desktop иногда «пустая зона», не «luxury air».

### Скриншот
Light: Афиша + Медиа. Dark: Афиша + Медиа. Contact (light capture).

---

## 4. Карточки

### Что хорошо
- Media cards: border + aspect-video + consistent padding.
- Concert mobile cards (code): border + labeled fields — разумный fallback.
- Contact email card: clear hover border.

### Что плохо
- MediaCard показывает badge `youtube` поверх embed — дешёвый UI tell.
- Next-concert card: glassmorphism (`bg-white/5`, blur) vs flat media cards — две эстетики.
- Photo tiles: no radius vs buttons `rounded-md` / controls `rounded-full` — три радиус-языка.
- Hover scale на фото `duration-500` без reduced-motion.

---

## 5. Кнопки

### Что хорошо
- CVA variants: default / ghost / outline / secondary / link; focus ring defined.
- Icon buttons `size-10` — близко к 44px target.

### Что плохо
- Hero CTA overrides secondary → `rounded-none bg-white text-zinc-950` — one-off.
- Primary/secondary hierarchy на странице почти не используется (мало CTA).
- Locale uses `size="sm"`, theme uses `size="icon"` в одном shell — высоты близки, но паттерн смешанный.
- Disabled / active states не наблюдались в UI (мало stateful controls).

---

## 6. Типографика

**Families:** Playfair Display (serif) + Source Sans 3 (sans) via `next/font` — уместно для classical brand.

### Что хорошо
- H1 → H2 scale: hero `text-5xl→8xl`, sections `text-3xl→5xl`.
- Eyebrows: tracking `0.2–0.25em`, uppercase — editorial.
- Body `text-base/lg` + `leading-relaxed` в bio — читаемо.

### Что плохо
- Table body `text-sm` + `text-foreground/70` — мелкий и бледный.
- Column headers `text-xs` + `/50` opacity — borderline caption.
- Nav `text-sm` thin on photo — premium sites often use slightly stronger weight.
- Media titles H3 same level as «Видео» H3 — hierarchy collision.
- Title meta uses «Пианист»; keywords «пианистка» — inconsistency across surfaces.

**Hierarchy consistency:** 6.5/10  
**Brand fit of type:** 7.5/10  
**Readability dark (observed):** headings good; secondary gray on `#0a0a0a` weaker.

---

## 7. Отступы

### Фактическая система
- Container: `max-w-6xl` (~1152px), `px-6` / `lg:px-8`.
- Sections: `py-20` / `md:py-28` (~80/112).
- Heading block: `mb-12` / `md:mb-16`.
- Gaps: 4/6/8/12/16/20 — в целом 4px-ish Tailwind scale, не строгий 8px everywhere.

### Проблемы
- Hero bottom grid `gap-12` vs section internals `space-y-4/10` — разные «языки» плотности.
- Contact: большой пустой верх после repertoire на скрине — ощущение случайного воздуха.
- Table cells `py-5/6` + long wrapping = uneven row heights (ожидаемо, но тяжело).

---

## 8. Цвета

### Tokens (`globals.css`)
Light: white / `#171717` / zinc-like borders.  
Dark: `#0a0a0a` / `#ededed` / `#27272a`.

### Что хорошо
- Единый нейтральный набор; dark/light зеркальны.
- Нет «AI purple» / terracotta cream клише.

### Что плохо
- Палитра = default shadcn zinc grayscale — **нет фирменного акцента** (даже сдержанного).
- Hardcoded `zinc-950`, `white/15`, `black/15` рядом с CSS variables.
- Secondary text at `/50`–`/70` — риск AA fail на small text.
- Destructive token exists but unused in UI (fine).

**Premium brand color story:** weak — monochrome can work, but currently feels template-neutral, not curated artist identity.

---

## 9. Responsive

### Code-inferred matrix risks
| Breakpoint | Expected issues |
|------------|-----------------|
| 390 / 430 | Hero stack; concert card full width; nav burger; table → cards; past concerts **hidden**; 2-col photos OK |
| 768 | Still burger until xl; table appears with **horizontal scroll** (`min-w-[800px]`) |
| 1024×768 | Same — no desktop nav until 1280 |
| 1280+ | Full nav; container narrow relative to 1920 → large side margins |
| 1440 / 1920 | Content feels «strip in the middle»; hero empty upper field |

### Не проверено live
Горизонтальный скролл страницы, thumb-reach CTA, точный crop hero на iPhone — **невозможно без viewport API**.

---

## 10. Dark theme

### Что хорошо
- Toggle works; `aria-pressed` updates; state kept across hash navigation.
- `disableTransitionOnChange` + mount placeholder spans — anti-FOUC intent.
- Content sections in dark look coherent (black bg, white serif titles) — screenshot confirmed.

### Что плохо
- Hero identical in both themes → switcher value unclear on landing.
- Overlay controls use hardcoded white styles vs token `default` variant after scroll.
- Flicker on first paint: mitigated in code; not measured (switch itself felt clean on recheck).

### Recheck note
Persistence **confirmed**: dark stays after re-navigate and after `/ru` → `/en`. Light↔dark toggles without errors.

### Скриншот
Dark: Афиша + Медиа — confirmed.

---

## 11. Accessibility

### Critical
- Photo alts non-descriptive («Фотография N»).
- Likely low contrast on `text-foreground/50` captions and nav-on-hero.
- No skip link.

### Major
- Heading level collision (Media: H2 → H3 «Видео» → H3 titles).
- `aria-label="Main"` English on RU.
- Table on tablet via horizontal scroll — poor for SR/keyboard context switching.
- YouTube iframes always in DOM (even offscreen) — focus/noise risk.
- Target size of hero CTA / text links may fail 24–44px guidance (visual estimate).

### Minor
- Repertoire `summary` custom marker hidden — OK if keyboard works (native details usually does).
- Decorative gradients `aria-hidden` — good.
- Theme icons `aria-hidden` with button labels — good.

**Keyboard / focus:** ring classes exist; full Tab pass not completed.

---

## 12. SEO

### Present ✓
- `title`, `description`, `keywords`
- `canonical` + `hreflang` (ru/en)
- `viewport`
- Open Graph title/description/url/type/locale
- Twitter `summary_large_image` + title/description
- Favicon
- Single H1 (name)
- Hero image preload
- Fonts preloaded (woff2 observed in HTML stream)

### Missing / broken ✗
- **`og:image` / `twitter:image`**
- **`robots.txt` → 404**
- **`sitemap.xml` → 404** (caught by `[locale]` → not-found)
- Structured data (`application/ld+json` Person/Musician/Event) — absent
- `apple-touch-icon`, `theme-color`
- Explicit `robots` meta (index/follow) — absent (defaults OK, but no policy file)
- Root `/` is client redirect `return null` — weak for crawlers hitting bare domain until redirect
- Gallery alts useless for image search
- Gender/title inconsistency harms brand SERP snippet quality

---

## 13. Performance

### Positive
- `next/font` for Playfair + Source Sans
- Hero `preload` + responsive `srcset`
- YouTube `loading="lazy"`
- SiteImage abstraction for static export vs Next Image

### Risks
- Full-viewport hero photo = LCP candidate; quality/weight not measured.
- Multiple YouTube iframes on page (even if lazy) hurt INP/main-thread when activated.
- Client Header + theme mount placeholders → possible minor CLS on controls.
- No evidence of `prefers-reduced-motion` gating photo hover scale.
- Dev Next.js badge visible in screenshots (prod concern only if left on).

**Console:** empty on checked loads (good for this session).

---

## 14. Design system

### Inconsistencies found
1. Radii: `rounded-full` (controls) / `rounded-md` (buttons) / `rounded-none` (hero CTA) / `rounded-lg` (mobile concert cards) / square photo tiles.
2. Borders: `border-border` vs `border-white/15` vs `border-white/20`.
3. Shadows: button `shadow` / `shadow-sm` vs mostly flat sections — uneven elevation language.
4. Colors: CSS variables vs hardcoded `zinc-*` / `white/*` / `black/*`.
5. Button variants overridden ad-hoc in hero.
6. Nav link styles ≠ Button / Link component system.
7. Locale `sm` height vs Theme `icon` in shared shell.
8. Dead `SiteControls` component vs Header-integrated controls.
9. Muted sections use `bg-secondary/40` only — no third surface token for cards on muted.
10. Platform badge raw string `youtube` vs localized UI everywhere else.

---

# Responsive matrix

| Разрешение | Статус | Проблемы |
|------------|--------|----------|
| 390×844 | **Not live-tested** | Infer: burger nav; stacked hero; table→cards; past concerts hidden; CTA thumb reach uncertain |
| 430×932 | **Not live-tested** | Same as 390 |
| 768×1024 | **Not live-tested** | Infer: burger still; table + horizontal scroll likely |
| 1024×768 | **Not live-tested** | Infer: still no desktop nav (`xl`); table scroll |
| 1280×800 | **Observed (approx desktop)** | Full nav; content OK; side margins start to grow |
| 1440×900 | **Observed** | Wide gutters; hero top empty; table text dense |
| 1920×1080 | **Observed** | max-w-6xl feels narrow; premium «sparse» risks looking unfinished |

---

# Accessibility issues

### Critical
- Non-descriptive image alts in gallery
- Probable contrast failures on muted captions / hero nav
- Missing skip-to-content

### Major
- Broken heading outline in Media
- English aria label on main nav (RU)
- Dense data table accessibility on mid widths
- Insufficient proven keyboard audit

### Minor
- Redundant «Главная» + logo both → `#hero`
- Platform text noise over video
- Focus styles exist but not visually verified on all interactive types

---

# SEO checklist

| Item | Status |
|------|--------|
| Title | ✓ |
| Meta description | ✓ |
| Keywords | ✓ (low value, inconsistent gender) |
| Canonical | ✓ |
| hreflang | ✓ |
| Viewport | ✓ |
| Robots meta | ~ (default; no explicit) |
| robots.txt | ✗ 404 |
| Sitemap | ✗ 404 |
| Open Graph basics | ✓ |
| OG/Twitter image | ✗ |
| Twitter card type | ✓ (`summary_large_image` without image = self-contradiction) |
| Favicon | ✓ |
| Apple touch icon | ✗ |
| Structured data | ✗ |
| H1 | ✓ (one) |
| H2 sections | ✓ |
| Meaningful alts | ✗ gallery; ✓ hero |
| Internal links | ✓ hash nav |
| Indexability | ~ page OK; missing sitemap/robots hurts |
| Client-only root `/` | ✗ weak |

---

# Design system inconsistencies

- Three+ radius languages
- Token colors vs zinc/white hardcodes
- Hero button one-off
- Overlay vs default control chrome
- Table density vs editorial bio density
- Flat media cards vs glass concert aside
- Dead SiteControls duplicate pattern
- Gender/copy system broken across Meta/Hero/Bio
- Social URLs not brand-grade
- Section muted surfaces vs card `bg-card` not always aligned

---

# Quick Wins (до 1 часа)

1. Fix «Пианист» → «Пианистка» (hero + title surfaces).
2. Replace Facebook share URL with clean profile URL; fix YouTube to artist channel.
3. Add `og:image` + twitter image (hero or dedicated press photo).
4. Add `app/robots.ts` + `app/sitemap.ts`.
5. Meaningful photo alts (venue/instrument/year).
6. Localize `aria-label="Main"`.
7. Show past concerts on mobile (remove `hidden md:block` or provide toggle).
8. Fix Geneva venue duplication / empty artists copy.

---

# Medium Improvements (1–4 часа)

1. Desktop nav from `lg` (1024), not only `xl`.
2. Redesign schedule for tablet without `min-w-[800px]` trap (stacked definition list / 2-row layout).
3. Unify radii + migrate hardcodes to tokens.
4. Skip link + audit focus order.
5. Person/Musician JSON-LD + Event for next concert.
6. Contact: custom domain email or clearer booking CTA; link to PDF bio/press kit.
7. `prefers-reduced-motion` for gallery hover.
8. Reduce header control chrome (2-way theme or menu overflow).
9. Close lightbox on hash/nav change (and verify Esc).
10. Align RU/EN awards lists; fix «Viktoriia» → brand spelling in EN schedule.

---

# High Impact Improvements (1–3 дня)

1. Brand system beyond default zinc: curated surfaces, paper/ink metaphor, restrained accent — still monochrome-capable but intentional.
2. Hero composition pass: one dominant story (artist **or** next concert), not dual heroes; theme-aware treatment.
3. Media depth: curated recordings, program notes, audio, press quotes — current 2 videos undersell.
4. Press / booking module: one-pager download, management contact, tech rider, high-res photos with rights.
5. Real responsive QA pass on physical devices / Playwright viewports (MCP cannot resize).
6. Content strategy for schedule density and past-performance storytelling on mobile.

---

# Итог

**Выглядит ли этот сайт как портфолио профессионального концертного пианиста, которому можно доверить выступление на премиальной площадке?**

**Пока — нет, не полностью.** Ближе к «аккуратный современный сайт выпускника / emerging artist», чем к «официальный канал артиста для Victoires / major festival booking».

### Что сильнее всего выдаёт уровень «любительский»

1. **«Пианист» на женском hero** — мгновенный trust kill.
2. **Gmail + тонкий contact** без press kit / management.
3. **YouTube `@edurmajor` и Facebook share-link с `mibextid`** — не artist brand hygiene.
4. **Default shadcn zinc palette + mixed radii** — «хорошо собранный шаблон», не авторская identity.
5. **SEO дыры:** нет OG image, 404 robots/sitemap — сайт не готов к публичному запуску.
6. **Тонкий proof layer в медиа** (2 embed) при сильной биографии — разрыв между CV и «послушать».
7. **Афиша как spreadsheet** на desktop и **обрезанная на mobile** — не curated concert narrative.
8. **Gallery alts «Фотография N»** — незавершённость контента.
9. **Theme switcher, который почти не меняет hero** — product chrome без design consequence.
10. **Dev «N» badge** в скринах (если попадёт в прод-демо) — мгновенный amateur signal.

### Что уже на правильной стороне

Сильная фотография, Playfair/Source Sans pairing, внятная IA single-page, bilingual foundation, next-concert CTA, осмысленная биография и награды.

**Release gate recommendation:** не ship публично до Quick Wins (1)–(5) минимум. После этого — ещё не «Google/Airbnb polish», но уже честный professional artist site.
