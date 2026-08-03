# Agriculture Learning Hub Zambia

A production learning platform helping Zambian farmers, agriculture students, and extension workers learn best practices by **crop**, **agro-ecological zone**, and **season** — covering land preparation, fertilizer schedules, pest management, and interactive quizzes, tailored to Zambia's specific farming conditions and available in **English, Bemba, and Nyanja**.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Database Schema](#database-schema)
7. [Testing](#testing)
8. [Security](#security)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui (Base library, Vega preset) |
| Authentication | Clerk (custom pages, webhooks) |
| Database | PostgreSQL (Prisma Postgres hosting) |
| ORM | Drizzle ORM |
| Rate Limiting | Upstash Redis (Cape Town region) |
| Data Fetching | TanStack React Query |
| Animation | Framer Motion |
| Testing | Playwright (E2E) + Vitest (unit) |
| CI/CD | GitHub Actions |

---

## Features

### Core
- **Crop Library** — 14 crops with planting windows, land preparation, fertilizer schedules, spacing, common varieties, and harvest guidance, filterable by search and agro-ecological zone
- **Pest & Disease Directory** — 10 pests/diseases with symptoms, organic and chemical control methods, cross-linked to affected crops
- **Interactive Quizzes** — 150+ questions across all crops, scored and saved per user
- **Seasonal Calendar** — crops grouped by planting month
- **Dashboard** — personal stats, completed crops, quiz history, saved crops, live weather
- **Save & Track Progress** — bookmark crops, mark lessons complete

### Multi-Language Support
Full UI translation across every page (navigation, headings, buttons, toasts, quiz tabs) in **English, Bemba, and Nyanja**. Crop/pest content itself remains in English; UI chrome is fully localized.

### Production Hardening
- Rate limiting on the public weather API and authenticated server actions (Upstash Redis)
- Automated E2E and unit test suites (Playwright + Vitest)
- CI pipeline running tests on every push (GitHub Actions)
- Accessibility: keyboard navigation, ARIA roles, skip link, WCAG-compliant contrast
- SEO: per-page metadata, dynamic Open Graph images, sitemap, robots.txt
- Custom 404 page, loading states, error boundaries, empty states throughout

---

## Project Structure

```
agriculture-learning-hub/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── actions/                  # Server Actions (save, complete, quiz)
│   ├── api/
│   │   ├── weather/route.ts       # Rate-limited weather proxy
│   │   └── webhooks/clerk/route.ts # Clerk user sync webhook
│   ├── calendar/page.tsx
│   ├── crops/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── dashboard/page.tsx
│   ├── pests/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/                    # UI components (Navbar, Quiz, buttons, etc.)
├── components/ui/                 # shadcn/ui primitives
├── db/
│   ├── drizzle.ts                 # Database client (pooled, HMR-safe)
│   ├── seed*.ts                   # Seed scripts
│   └── schema/                    # 8 tables, one file per table
├── e2e/                            # Playwright test suite
├── lib/
│   ├── translations.ts             # English/Bemba/Nyanja dictionary
│   ├── LanguageContext.tsx          # Language provider/hook
│   ├── ratelimit.ts                 # Upstash rate limiters
│   └── quizScoring.ts               # Tested scoring logic
├── proxy.ts                         # Clerk auth middleware (Next.js 16)
├── playwright.config.ts
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A PostgreSQL database (this project uses Prisma Postgres)
- A Clerk account
- An Upstash Redis database
- An OpenWeatherMap API key

### Installation

```bash
git clone <repo-url>
cd agriculture-learning-hub
npm install
```

### Environment setup
Create `.env.local` in the project root (see [Environment Variables](#environment-variables) below).

### Database setup

```bash
npx drizzle-kit push      # create tables from schema
npm run seed                # seed base crops/pests/quizzes
npm run seed:more            # additional crops/pests
npm run seed:more2            # more crops/pests
npm run seed:quizfull          # full quiz question set
```

### Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## Environment Variables

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
CLERK_WEBHOOK_SECRET=

# Database
DATABASE_URL=

# Weather
OPENWEATHER_API_KEY=

# Rate limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

`.env.local` is git-ignored (`.env*` pattern) and must never be committed. If any credential is ever exposed, rotate it immediately at its source dashboard.

---

## Database Schema

8 tables, all UUID-keyed, with `onDelete: cascade` on foreign keys:

| Table | Purpose |
|---|---|
| `users` | Profile synced from Clerk via webhook, plus province/zone/language fields |
| `crops` | Core crop content |
| `pests` | Pest/disease directory |
| `crop_pests` | Many-to-many join between crops and pests |
| `quiz_questions` | Questions per crop |
| `user_progress` | Completion tracking |
| `quiz_attempts` | Score history |
| `saved_crops` | Bookmarks |

Design principles: UUID primary keys (`gen_random_uuid()`), Postgres enums for constrained values (`agro_zone`, `language`), composite primary keys for pure join tables, cascading deletes for referential cleanliness.

---

## Testing

### Unit tests (Vitest)
```bash
npm run test:unit
```
Covers pure logic (quiz scoring) in isolation from the browser.

### End-to-end tests (Playwright)
```bash
npx playwright test --project=chromium --workers=1
```
Covers: crop/pest browsing, search/filter, navigation, quiz access, 404 handling, and auth-gated route protection.

> **Local note:** tests run with `--workers=1` locally to avoid exhausting the database connection pool under parallel load. CI runs with more workers, since GitHub's infrastructure isn't constrained the same way.

### CI
`.github/workflows/playwright.yml` and `.github/workflows/test.yml` run the full suite (build, unit tests, E2E) automatically on every push and pull request.

---

## Security

- All server actions require Clerk authentication before executing any database write
- Rate limiting via Upstash Redis on the public weather endpoint (10 req/min per IP) and on authenticated server actions (20 req/min per user)
- Clerk webhook payloads verified via svix signature before processing
- No secrets ever committed to git (verified via `git log --all --full-history`)
- Dependencies patched against known CVEs (`npm audit`, explicit Next.js security patch)
- `/dashboard` and other protected routes enforced at the middleware layer (`proxy.ts`), not just component-level checks

---

## Deployment

1. Push to GitHub
2. Import the repository into [Vercel](https://vercel.com)
3. Add every environment variable listed above in **Project Settings → Environment Variables**
4. Redeploy after adding variables
5. Register a production Clerk webhook endpoint: `https://<your-domain>/api/webhooks/clerk`, subscribed to `user.created`, `user.updated`, `user.deleted`
6. Switch Clerk to its production instance and update the keys in Vercel
7. Update `metadataBase`, `robots.ts`, and `sitemap.ts` with the real production domain
8. Test the live site end-to-end

Clerk's free tier supports up to 50,000 monthly retained users at no cost — no payment required to run this in production at this scale.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `ETIMEDOUT` database errors during build | Connection pool exhaustion under parallel build workers | Pooled connection with `max` limit + HMR-safe singleton in `db/drizzle.ts` |
| Clerk `<SignIn/>` "not configured correctly" | Duplicate `page.tsx` alongside a catch-all route folder | Only `[[...sign-in]]/page.tsx` should exist, no sibling `page.tsx` |
| `/dashboard` doesn't redirect unauthenticated users | `proxy.ts` missing `auth.protect()` logic | Ensure `createRouteMatcher` + `auth.protect()` are present, not a bare `clerkMiddleware()` |
| Playwright `getByText()` strict mode violations | Text appears in multiple elements | Use attribute selectors (`a[href="..."]`) or scope with `.getByRole("navigation")` |
| `npm install` / large downloads timing out | Network instability, not a code issue | Retry; consider a different network temporarily for large binary downloads (e.g. Playwright browsers) |

---

## License

Private project — Agriculture Learning Hub Zambia.
