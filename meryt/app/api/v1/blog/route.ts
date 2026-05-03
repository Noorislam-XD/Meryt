import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const POSTS = [
  {
    slug: "ni-score-explained",
    title: "The NI Score: How We Quantify Merit Without Gamification",
    excerpt: "A deep dive into the weighted 5-pillar system, why we chose these metrics, and how we prevent gaming.",
    author: "Noor Islam",
    authorRole: "Founder",
    date: "2025-05-01",
    readTime: "8 min",
    tag: "Engineering",
    tagColor: "#1A56FF",
  },
  {
    slug: "not-social-credit",
    title: "Why MERYT Is Not Social Credit Scoring (And Never Will Be)",
    excerpt: "The philosophical and technical boundaries we have built into MERYT to ensure we're measuring merit — not compliance.",
    author: "Priya Sharma",
    authorRole: "Head of Verification",
    date: "2025-04-18",
    readTime: "6 min",
    tag: "Philosophy",
    tagColor: "#9333EA",
  },
  {
    slug: "verification-accuracy",
    title: "How We Achieve 99.1% Verification Accuracy",
    excerpt: "Our three-stage pipeline: automated cross-referencing, institutional database lookup, and human expert review.",
    author: "Marcus Chen",
    authorRole: "Engineering Lead",
    date: "2025-04-04",
    readTime: "5 min",
    tag: "Verification",
    tagColor: "#00BE6A",
  },
  {
    slug: "global-talent-map",
    title: "The Global Talent Map: Where Is the World's Top 0.1% From?",
    excerpt: "An analysis of the geographical distribution of MERYT's highest-ranked profiles across 142 countries.",
    author: "MERYT Research Team",
    authorRole: "Research",
    date: "2025-03-22",
    readTime: "7 min",
    tag: "Research",
    tagColor: "#F5A200",
  },
  {
    slug: "api-v1-launch",
    title: "MERYT API v1 Is Live — Access the World's Talent Graph",
    excerpt: "Developer-friendly REST API. Free tier includes 1,000 requests/day. Rate-limited but fully open.",
    author: "Amara Osei",
    authorRole: "Developer Relations",
    date: "2025-03-10",
    readTime: "4 min",
    tag: "Developer",
    tagColor: "#00BE6A",
  },
  {
    slug: "rank-card-embeds",
    title: "Embed Your MERYT Rank Card Anywhere",
    excerpt: "Add your MERYT rank card to your GitHub README, portfolio site, or LinkedIn. One URL, always up to date.",
    author: "MERYT Team",
    authorRole: "Product",
    date: "2025-02-28",
    readTime: "3 min",
    tag: "Product",
    tagColor: "#FF4500",
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const tag = searchParams.get("tag");
  const limit = Math.min(20, Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10)));

  if (slug) {
    const post = POSTS.find(p => p.slug === slug);
    if (!post) {
      return NextResponse.json(
        { error: `Post '${slug}' not found`, code: "NOT_FOUND" },
        { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }
    return NextResponse.json(
      { data: { ...post, url: `/blog/${post.slug}`, ogImageUrl: `/blog/${post.slug}/opengraph-image` }, meta: { apiVersion: "1" } },
      { headers: { "Cache-Control": "public, s-maxage=3600", "Access-Control-Allow-Origin": "*", "X-API-Version": "1" } }
    );
  }

  let posts = [...POSTS];
  if (tag) posts = posts.filter(p => p.tag.toLowerCase() === tag.toLowerCase());
  posts = posts.slice(0, limit);

  return NextResponse.json(
    {
      data: posts.map(p => ({ ...p, url: `/blog/${p.slug}`, ogImageUrl: `/blog/${p.slug}/opengraph-image` })),
      meta: { total: posts.length, apiVersion: "1", rssUrl: "/api/rss" },
    },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200", "Access-Control-Allow-Origin": "*", "X-API-Version": "1" } }
  );
}
