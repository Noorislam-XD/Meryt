# MERYT — Global Verified Talent Rankings

## Project Overview

MERYT is a production-ready Next.js 15 application — a global verified talent ranking platform powered by the NI Score (proof-of-work identity graph). NOT social credit scoring — purely proof-of-work merit.

**Live app:** Runs on port 5000 via `cd meryt && npm run dev`
**GitHub:** https://github.com/Noorislam-XD/learderboard (branch: `main`)

## Architecture

```
meryt/
├── app/
│   ├── globals.css            # MERYT design tokens + animations
│   ├── layout.tsx             # Root layout (server component, metadata)
│   ├── page.tsx               # Homepage / leaderboard
│   ├── error.tsx              # Global error boundary ("use client")
│   ├── not-found.tsx          # Global 404
│   ├── loading.tsx            # Global loading skeleton
│   ├── sitemap.ts             # 50+ URL sitemap
│   ├── opengraph-image.tsx    # Root OG image (Edge runtime)
│   ├── leaderboard/page.tsx   # Full leaderboard page
│   ├── leaderboard/loading.tsx
│   ├── profile/[id]/page.tsx  # Public profile page
│   ├── profile/[id]/opengraph-image.tsx  # Per-profile OG image
│   ├── embed/[id]/page.tsx    # Embeddable rank card (no layout)
│   ├── org/[slug]/page.tsx    # Institution profile (11 orgs)
│   ├── search/page.tsx
│   ├── verify/page.tsx
│   ├── pricing/page.tsx
│   ├── dashboard/page.tsx
│   ├── settings/page.tsx
│   ├── notifications/page.tsx
│   ├── changelog/page.tsx
│   ├── about/page.tsx
│   ├── api-docs/page.tsx
│   ├── admin/page.tsx
│   ├── blog/page.tsx          # Blog listing
│   ├── blog/[slug]/page.tsx   # 6 full articles
│   ├── careers/page.tsx
│   ├── partners/page.tsx      # 12 university + 8 corporate partners
│   ├── status/page.tsx        # System status / uptime
│   ├── roadmap/page.tsx
│   ├── faq/page.tsx
│   ├── contact/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
│   └── api/
│       ├── leaderboard/route.ts   # Enhanced with filters
│       ├── search/route.ts
│       ├── webhook/route.ts
│       ├── orgs/route.ts
│       ├── stats/route.ts
│       ├── scores/route.ts
│       ├── verify/route.ts
│       ├── profile/[id]/route.ts
│       ├── org/[slug]/route.ts
│       └── v1/                    # Versioned public API
│           ├── leaderboard/route.ts
│           ├── profile/[id]/route.ts
│           ├── search/route.ts
│           └── stats/route.ts
└── src/
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx         # 4-column nav (Platform/Company/Community/Support)
    │   │   ├── ThemeProvider.tsx
    │   │   └── Ticker.tsx
    │   ├── leaderboard/
    │   │   ├── CategoryChips.tsx
    │   │   ├── FilterRow.tsx
    │   │   ├── LeaderboardRow.tsx
    │   │   └── PodiumCard.tsx
    │   ├── profile/
    │   │   └── ProfileModal.tsx
    │   └── ui/
    │       └── SkeletonRow.tsx
    ├── lib/
    │   ├── data.ts              # 30 contestants + ticker items
    │   └── utils.ts
    └── types/
        └── index.ts
```

## Data

- **30 contestants** (ranks 1–30, IDs "1"–"30") in `src/lib/data.ts`
- Contestants span: India, Spain, Japan, Nigeria, USA, Brazil, France, Sweden, South Korea, Kenya, Australia, UK, Egypt, Canada, Taiwan (NTU), Germany (ETH), South Africa, India (IISc), Russia, Mexico, Japan (Kyoto), UAE, Japan (TUA), Sudan, Taiwan (NTU)
- **11 org profiles** in `app/org/[slug]/page.tsx`: iit-bombay, mit, tokyo-u, stanford, oxford, eth-zurich, kaist, tsinghua, caltech, cambridge, tokyo-university
- **6 blog articles**: ni-score-explained, not-social-credit, verification-accuracy, global-talent-map, api-v1-launch, rank-card-embeds

## Design System

**Colors (CSS vars):**
- Light: `--bg: #F4F2ED`, `--surface: #FFFFFF`, `--text: #18160F`
- Dark: `--bg: #0F0E0B`, `--surface: #1A1916`, `--text: #F0EDE6`
- Accent: `--accent: #FF4500` (MERYT orange), `--accent2: #1A56FF`, `--accent3: #00BE6A`
- Medals: `--gold: #F5A200`, `--silver: #A2AFBE`, `--bronze: #C4793A`

**Fonts:** Syne (display), DM Mono (monospace), Bricolage Grotesque (body) — all via Google Fonts `<link>`

**Animations:** fadeUp, cardPop, rowIn, tickroll, livepulse

## Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`) — NO tailwind.config.js
- **Themes:** next-themes (dark/light via `.dark` class)
- **Path alias:** `@/*` maps to `meryt/` root (`@/src/...` = `meryt/src/...`)

## Critical Rules

- `"use client"` pages CANNOT export `metadata`
- All API routes under `/api/v1/` use `export const runtime = "edge"`
- Dev server: `cd meryt && npm run dev` on `0.0.0.0:5000`
- GitHub push: use Node script `/tmp/push_github.mjs` from bash (NOT code_execution — process.env is undefined there)

## Development

```bash
cd meryt && npm run dev   # starts on 0.0.0.0:5000
node /tmp/push_github.mjs  # push files to GitHub
```

## User Preferences

- Push all code to GitHub: `Noorislam-XD/learderboard` (branch: `main`)
- GitHub token: `GITHUB_PERSONAL_ACCESS_TOKEN` secret (accessible in bash as `$GITHUB_PERSONAL_ACCESS_TOKEN`)
- Dev server always on `0.0.0.0:5000`
