# Academic website \u2014 Spanish heritage-language sociolinguist

A bilingual (English/Spanish), accessible, SEO-optimized academic website built for
an ABD PhD candidate in Applied Linguistics on the 2026\u20132027 job market,
specializing in the sociolinguistics of Spanish as a heritage language in the
United States.

Built with **Next.js (App Router) + TypeScript + React + Tailwind CSS**, statically
generated, with content kept in plain TypeScript data files so it can be edited
without touching any component code.

> **This repository ships with sample placeholder content only.** No real
> publications, institutions, advisors, grants, or findings are represented.
> Replace every `[BRACKETED PLACEHOLDER]` before publishing.

---

## 1. Setup

Requires Node.js 18.18+ (20 LTS recommended).

```bash
npm install
```

## 2. Development

```bash
npm run dev
```

Visit `http://localhost:3000` \u2014 you'll be redirected to `/en` (or `/es`,
based on your browser's `Accept-Language` header).

## 3. Type-check & lint

```bash
npm run typecheck
npm run lint
```

## 4. Production build

```bash
npm run build
npm run start
```

The site is statically generated at build time (`generateStaticParams` covers
both locales for every route), so it deploys well to any static or edge
host.

## 5. Deployment

- **Vercel** (recommended, zero-config for Next.js): connect the repo and
  deploy. Set `RESEND_API_KEY` / `CONTACT_TO_EMAIL` as environment variables
  if you wire up real email sending (see \u00a77).
- **Any Node host**: run `npm run build && npm run start`.
- **Static export**: if you don't need the contact form's server action,
  you can adapt `next.config.mjs` with `output: "export"` and swap the
  contact form for a third-party form service.

Before going live, update `siteConfig.siteUrl` in `content/site-config.ts`
to your real domain \u2014 it feeds metadata, canonical URLs, JSON-LD, and the
sitemap.

---

## 6. Content editing (no code changes required)

All editable content lives in `/content/*.ts` as plain typed arrays/objects.
Open the relevant file, copy an existing entry, and fill in the fields \u2014
TypeScript will flag anything missing or misspelled.

| What you want to update              | File                                |
|---------------------------------------|--------------------------------------|
| Name, title, email, ORCID, social links, affiliations | `content/site-config.ts` |
| Publications                          | `content/publications.ts`            |
| Courses taught                        | `content/courses.ts`                 |
| Talks & conference presentations      | `content/talks.ts`                   |
| News & media appearances              | `content/news.ts`                    |
| Research areas (Research page)        | `content/research-areas.ts`          |
| Community-engaged projects            | `content/community-projects.ts`      |
| Biography (short/medium/extended) & dissertation details | `content/bio.ts` |
| UI text (buttons, labels) in English/Spanish | `content/i18n/dictionaries/en.json` / `es.json` |

To add a new publication, for example, open `content/publications.ts` and
append an object matching the `Publication` type in `lib/types.ts`:

```ts
{
  slug: "unique-url-safe-id",
  title: "Full publication title",
  authors: ["Candidate Name", "Co-author Name"],
  year: 2026,
  type: "journal-article",
  status: "published",
  venue: "Journal Name",
  abstract: "...",
  keywords: ["..."],
  themes: ["heritage-spanish-us"], // must match a research-areas.ts slug
  doi: "10.xxxx/xxxxx",
  links: { publisher: "https://...", pdf: "https://..." },
  peerReviewed: true,
  openAccess: false,
  language: "en",
}
```

### Files to replace

Place real files at these paths (referenced throughout the site) in `/public`:
- `public/cv-placeholder.pdf` \u2192 rename/replace with the real CV
- `public/research-statement-placeholder.pdf`
- `public/teaching-statement-placeholder.pdf`
- `public/dei-statement-placeholder.pdf`
- `public/dissertation-abstract-placeholder.pdf`
- `public/job-market-paper-placeholder.pdf`
- `public/sample-syllabus-placeholder.pdf`

If a document isn't ready yet, remove the corresponding button/link rather
than linking to a missing file.

### Portrait / headshot

The homepage hero has an optional portrait slot (`components/Hero.tsx`). The
site is fully functional without a photo. To add one, place an image in
`public/images/` and swap the placeholder `<div>` for a Next.js `<Image>`
with descriptive `alt` text.

---

## 7. Contact form

`components/ContactForm.tsx` posts to a server action in
`app/[locale]/contact/actions.ts`. Out of the box it validates input and
silently discards likely-bot submissions via a hidden honeypot field, but
does **not** send email anywhere \u2014 you must wire up a provider.

The action includes a commented example using [Resend](https://resend.com/);
any transactional email API (Postmark, SES, your institution's SMTP relay)
works the same way. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in
`.env.local` (copy `.env.example`) once configured.

---

## 8. Bilingual (English/Spanish) content

Routing uses a `/[locale]/...` structure (`/en/...`, `/es/...`).
`middleware.ts` redirects `/` to the visitor's preferred locale based on
`Accept-Language`. The `LanguageSwitcher` component preserves the current
page when toggling languages and updates `<html lang>` automatically via
the locale layout.

Per-item content (publications, talks, news, etc.) carries its own
`language` field, so a piece of content only appears when relevant; the UI
chrome (nav, buttons, filters) is fully translated via
`content/i18n/dictionaries/{en,es}.json`.

---

## 9. Accessibility

- Skip-to-content link, semantic landmarks (`header`/`nav`/`main`/`footer`)
- Visible focus rings on all interactive elements
- Keyboard-operable mobile menu (Escape to close, focus returns to trigger)
- Publications filters and contact form use proper `<label>`s and
  `aria-live` status regions
- `prefers-reduced-motion` respected globally
- No information conveyed by color alone (status uses text + color)

Before publishing, run:

```bash
npm run build && npm run start
```

and test with Lighthouse, axe DevTools, and full keyboard-only navigation.

---

## 10. SEO

- Per-page `generateMetadata` with canonical + hreflang alternates
- Open Graph / Twitter card metadata
- JSON-LD: `Person` and `WebSite` on every page, `ScholarlyArticle` on
  published publications
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and
  `/robots.txt` automatically from the same route list
- All site identity fields (name, title, institution, ORCID, etc.) are
  centralized in `content/site-config.ts` \u2014 update once, applies
  everywhere

---

## 11. Project structure

```
app/
  layout.tsx                 Root HTML shell
  sitemap.ts, robots.ts
  [locale]/
    layout.tsx                Header/Footer, <html lang>, JSON-LD
    page.tsx                  Home
    about/page.tsx
    research/page.tsx
    dissertation/page.tsx
    publications/page.tsx
    teaching/page.tsx
    cv/page.tsx
    talks/page.tsx
    community/page.tsx
    news/page.tsx
    contact/page.tsx, actions.ts
components/                   Reusable, presentation-only UI
content/                      All editable data (see \u00a76) + i18n dictionaries
lib/                          types.ts, i18n.ts, seo.ts
```

Data (`content/`) is fully separated from presentation (`components/`,
`app/`) so future edits rarely touch component code.
