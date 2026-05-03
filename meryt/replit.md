# MERYT Platform

Global verified talent ranking platform. NOT social credit scoring — pure proof-of-work NI Score based on 5 verifiable pillars.

## Tech Stack

- **Framework**: Next.js 15 (App Router), TypeScript
- **Styling**: Tailwind v4 (`@tailwindcss/postcss`), CSS variables in `globals.css` — NO `tailwind.config.js`
- **Fonts**: Syne (display), DM Mono (mono), Bricolage Grotesque (body) — loaded via `<link>` in `layout.tsx`
- **Dark mode**: `next-themes` via `.dark` class on `<html>`
- **Auth**: localStorage stub (no Firebase) — `AuthContext.tsx`
- **Path alias**: `@/*` maps to `meryt/` root (so `@/src/...` = `meryt/src/...`)

## Project Structure

```
meryt/
  app/
    page.tsx                     # Main leaderboard homepage (hero, podium, full table, how-it-works, CTA)
    layout.tsx                   # Root layout with ThemeProvider, fonts, full metadata (OG, Twitter, robots)
    globals.css                  # CSS vars (light/dark), animations, responsive utilities, .show-mobile
    not-found.tsx                # Enhanced 404 page with quick links
    error.tsx                    # Enhanced error boundary with error message display
    loading.tsx                  # Global skeleton loading state
    sitemap.ts                   # Sitemap (28 static + profiles + orgs + blogs + tag/university URLs, ~100 total)
    robots.ts                    # Robots.txt
    manifest.ts                  # PWA web app manifest
    opengraph-image.tsx          # Enhanced OG image (1200×630)
    leaderboard/
      page.tsx                   # Full leaderboard: region tabs, category filter, sort, load more, stats
      loading.tsx                # Leaderboard skeleton loader
      opengraph-image.tsx        # Dynamic leaderboard OG image (edge)
      country/[slug]/page.tsx    # Per-country leaderboard (client)
    profile/
      [id]/page.tsx              # Full public profile: hero, score breakdown, sidebar, ShareCard
      loading.tsx                # Profile skeleton loader
    dashboard/page.tsx           # Personal dashboard: rank history, pillar breakdown, activity feed
    verify/page.tsx              # Verification workflow: 5 pillars, evidence submission, progress
    pricing/page.tsx             # Pricing tiers: Explorer/Pro/Elite, monthly/yearly toggle
    search/page.tsx              # Full search + category filter + sort
    about/page.tsx               # About MERYT: mission, NI Score, team
    admin/page.tsx               # Admin panel: users, verifications, scores, reports
    api-docs/page.tsx            # REST API reference: endpoints, params, examples, rate limits
    changelog/page.tsx           # Version history timeline
    settings/page.tsx            # Settings: Profile/Account/Notifications/Privacy/API Keys/Danger Zone
    notifications/page.tsx       # Notifications: read/unread filter, mark all read
    careers/page.tsx             # Careers: 6 open roles
    partners/page.tsx            # Institutional partners directory
    status/page.tsx              # Platform health + component status
    compare/page.tsx             # Side-by-side NI Score comparison for two profiles
    rankings/page.tsx            # Curated ranking lists: Global, STEM, Creative, Social
    press/page.tsx               # Press kit, media coverage, spokesperson directory
    newsletter/page.tsx          # Newsletter subscription + archive preview
    hall-of-fame/page.tsx        # Top 10 all-time performers with milestone badges
    open/page.tsx                # Open metrics: platform stats, tech stack, funding
    score/page.tsx               # NI Score methodology: 5 pillars, formula, FAQ, tiers
    discover/page.tsx            # Browse talent by field, region, tag, momentum
    trending/page.tsx            # Trending movers: biggest gainers, new entries, spotlight
    faq/page.tsx                 # FAQ: 20+ questions across 5 categories
    privacy/page.tsx             # Privacy Policy
    terms/page.tsx               # Terms of Service
    tags/
      page.tsx                   # Tag directory: 77 tags as cloud + table, sorted by count
      [tag]/page.tsx             # Per-tag leaderboard: profiles tagged with specialisation
    university/[slug]/page.tsx   # University profile pages (8 institutions)
    org/[slug]/page.tsx          # Organization profiles: stats, top members, OG image
    blog/
      page.tsx                   # Blog index: 6 posts with tags and search
      [slug]/page.tsx            # Blog post detail with rich body content
      [slug]/opengraph-image.tsx # Per-article OG image (edge)
    embed/[id]/page.tsx          # Embeddable rank card widget (no chrome)
    api/
      leaderboard/route.ts       # GET /api/leaderboard
      profile/[id]/route.ts      # GET /api/profile/:id
      scores/route.ts            # GET /api/scores
      verify/route.ts            # POST /api/verify
      stats/route.ts             # GET /api/stats
      rss/route.ts               # GET /api/rss — Atom feed
      webhook/route.ts           # POST /api/webhook — webhook receiver
      org/route.ts               # GET /api/org
      v1/
        leaderboard/route.ts     # GET /api/v1/leaderboard — paginated, edge, CORS
        leaderboard/opengraph-image.tsx # Leaderboard OG image (edge)
        profile/[id]/route.ts    # GET /api/v1/profile/:id — full profile + context
        search/route.ts          # GET /api/v1/search — full-text + category/country filters
        stats/route.ts           # GET /api/v1/stats — platform aggregates
        compare/route.ts         # GET /api/v1/compare?a=&b= — side-by-side diff
        orgs/route.ts            # GET /api/v1/orgs — org directory with members
        rankings/route.ts        # GET /api/v1/rankings?type= — curated lists
        countries/route.ts       # GET /api/v1/countries — country aggregation
        embed/[id]/route.ts      # GET /api/v1/embed/:id — embed HTML/JSON
        blog/route.ts            # GET /api/v1/blog — versioned blog API
        trending/route.ts        # GET /api/v1/trending — biggest movers
        verify/route.ts          # POST /api/v1/verify — verify submission
        feed/route.ts            # GET /api/v1/feed — activity feed (rank changes, new profiles)
        tags/route.ts            # GET /api/v1/tags — all tags with counts
        universities/route.ts    # GET /api/v1/universities — university aggregation
  src/
    types/index.ts               # All TypeScript types (Contestant, Pillar, Category, etc.)
    lib/
      data.ts                    # 30 contestants (IDs 1–30, global) + TICKER_ITEMS
      utils.ts                   # cn(), formatScore(), getInitials(), clampScore(), pluralize()
    components/
      auth/
        AuthContext.tsx           # Auth state (localStorage, signIn/signUp/signOut)
        AuthModal.tsx             # Sign in / Sign up modal + OAuth stubs
      layout/
        Header.tsx                # Nav, dark mode toggle, auth user menu, mobile hamburger drawer
        Footer.tsx                # 4-column footer (Platform/Company/Community/Support)
        ThemeProvider.tsx         # Wraps NextThemesProvider + AuthProvider
        Ticker.tsx                # Live ranking changes ticker strip
      leaderboard/
        CategoryChips.tsx         # Category filter chips
        FilterRow.tsx             # Timeframe buttons + search input
        LeaderboardRow.tsx        # Single leaderboard row (rank, avatar, score, delta)
        PodiumCard.tsx            # Top-3 podium card (gold/silver/bronze)
        ProfileModal.tsx          # Quick-view profile modal
      profile/
        ProfileModal.tsx          # Full profile modal (homepage version)
      scoring/
        NIScoreEngine.ts          # NI Score calculation: weights, tiers, grade
      ui/
        Badge.tsx                 # Reusable badge with color variants
        Button.tsx                # Reusable button (primary/secondary/ghost)
        ShareCard.tsx             # Share/embed modal: copy URL, copy embed code, social share
        SkeletonRow.tsx           # Skeletons: SkeletonRow, SkeletonCard, SkeletonProfile
      seo/
        JsonLd.tsx                # JSON-LD structured data component
```

## Key Design Decisions

- **No `tailwind.config.js`** — Tailwind v4 configured via `@import "tailwindcss"` + CSS custom properties
- **CSS variables** for all color tokens — enables seamless dark mode via `.dark` class swap
- **Sequential GitHub pushes** — GitHub Contents API requires fresh SHAs; parallel pushes cause SHA mismatch failures
- **Two ProfileModal files** — `leaderboard/ProfileModal.tsx` (quick view) and `profile/ProfileModal.tsx` (full view used on homepage)
- **`@/*` alias** resolves to `meryt/` root, NOT `meryt/src/` — always use `@/src/...` for src files
- **Mobile hamburger** — `.show-mobile { display: flex !important }` at ≤768px
- **`metadata` exports** — `"use client"` pages cannot export `metadata`; use server components for SEO pages
- **Footer** — extracted to `src/components/layout/Footer.tsx`, 4 columns: Platform, Company, Community, Support

## Dev Server

```
cd meryt && npm run dev
```

Runs on port 5000, `0.0.0.0`. Workflow "Start application" manages this.

## GitHub

Repo: `Noorislam-XD/learderboard` (branch: `main`)
Push method: sequential GitHub Contents REST API via Node scripts in `/tmp/`
Token: `GITHUB_PERSONAL_ACCESS_TOKEN` env secret
All files pushed under `meryt/` prefix in the repo.

## NI Score Pillars

| Pillar | Weight | Sources |
|---|---|---|
| Academic | 25% | GPA, degrees, awards |
| Research | 25% | Papers, citations, patents |
| Code | 20% | GitHub commits, OSS impact |
| Creator | 15% | Portfolio, reach, quality |
| Social | 15% | Community, mentorship |

## Phases Completed (26 total)

- ✅ Phase 1: Auth (AuthContext, AuthModal, OAuth stubs)
- ✅ Phase 2: Profiles (Contestant type, data.ts with 30 entries, IDs 1–30)
- ✅ Phase 3: Dashboard (rank history, pillar breakdown, activity feed)
- ✅ Phase 4: Verify (5-pillar verification workflow, evidence submission)
- ✅ Phase 5: NI Score Engine (weights, tier, top strength, grade)
- ✅ Phase 6: Pricing (Explorer/Pro/Elite, monthly/yearly toggle)
- ✅ Phase 7: Search (full-text, category, sort)
- ✅ Phase 8: About (mission, how it works, team, CTA)
- ✅ Phase 9: Admin (verification queue, user management, analytics)
- ✅ Phase 10: API Docs (full endpoint reference with examples and rate limits)
- ✅ Phase 11: Settings (6-tab settings page with toggles)
- ✅ Phase 12: Notifications (read/unread filter, mark all read)
- ✅ Phase 13: Changelog (full version timeline with typed change entries)
- ✅ Phase 14: Org profiles (/org/[slug] with stats, top members, OG image)
- ✅ Phase 15: ShareCard (rank card modal, copy URL, embed code)
- ✅ Phase 16: Footer (reusable 4-column Footer component)
- ✅ Phase 17: SEO (per-page metadata, OG images, sitemap ~100 URLs, robots, loading skeletons)
- ✅ Phase 18: API v1 (15 Edge API routes: leaderboard, profile, search, stats, compare, orgs, rankings, countries, embed, blog, trending, verify, feed, tags, universities)
- ✅ Phase 19: Content pages (press, newsletter, partners, status, careers, faq, privacy, terms)
- ✅ Phase 20: Compare + Rankings pages (side-by-side comparison, curated ranking lists)
- ✅ Phase 21: Hall of Fame + Open Metrics + NI Score methodology pages
- ✅ Phase 22: Discover page (browse by field, region, tag, momentum)
- ✅ Phase 23: University profile pages (8 institutions, /university/[slug])
- ✅ Phase 24: Blog OG images + Leaderboard OG image (dynamic edge ImageResponse)
- ✅ Phase 25: Tag pages (Browse by Tag /tags, Per-tag leaderboard /tags/[tag])
- ✅ Phase 26: Country leaderboard (/leaderboard/country/[slug]), Trending page, API v1 tags/universities
