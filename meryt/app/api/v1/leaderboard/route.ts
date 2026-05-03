import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));
  const category = searchParams.get("category");
  const region = searchParams.get("region");
  const university = searchParams.get("university");
  const q = searchParams.get("q")?.toLowerCase();
  const sort = searchParams.get("sort") ?? "rank";
  const order = (searchParams.get("order") ?? "asc") === "desc" ? "desc" : "asc";

  let results = [...LEADERBOARD_DATA];

  if (category && category !== "all") {
    results = results.filter(c => c.categories.includes(category as never));
  }
  if (region) {
    results = results.filter(c => c.country.toLowerCase() === region.toLowerCase());
  }
  if (university) {
    results = results.filter(c => c.university.toLowerCase().includes(university.toLowerCase()));
  }
  if (q) {
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.handle.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q)) ||
      c.university.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
    );
  }

  results.sort((a, b) => {
    let va: number, vb: number;
    if (sort === "score") { va = a.niScore; vb = b.niScore; }
    else if (sort === "change") { va = a.scoreChange; vb = b.scoreChange; }
    else if (sort === "followers") { va = a.followers; vb = b.followers; }
    else { va = a.rank; vb = b.rank; }
    return order === "asc" ? va - vb : vb - va;
  });

  const total = results.length;
  const offset = (page - 1) * limit;
  const paged = results.slice(offset, offset + limit);

  const formatted = paged.map(c => ({
    id: c.id,
    rank: c.rank,
    name: c.name,
    handle: c.handle,
    country: c.country,
    flag: c.flag,
    university: c.university,
    niScore: c.niScore,
    scoreChange: c.scoreChange,
    categories: c.categories,
    tags: c.tags,
    avatar: c.avatar,
    rankPercentile: c.rankPercentile,
    followers: c.followers,
    profileUrl: `/profile/${c.id}`,
    embedUrl: `/embed/${c.id}`,
  }));

  return NextResponse.json(
    {
      data: formatted,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
        filters: { category, region, university, q, sort, order },
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        "Access-Control-Allow-Origin": "*",
        "X-API-Version": "1",
      },
    }
  );
}
