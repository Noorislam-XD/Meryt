import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "all";
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 50);
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const sort = searchParams.get("sort") ?? "score";

  let results = LEADERBOARD_DATA.filter(c => {
    const matchQ = q === "" ||
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.handle.toLowerCase().includes(q.toLowerCase()) ||
      c.university.toLowerCase().includes(q.toLowerCase()) ||
      c.country.toLowerCase().includes(q.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(q.toLowerCase()));
    const matchCat = category === "all" || c.categories.includes(category as never);
    return matchQ && matchCat;
  });

  if (sort === "change") results = [...results].sort((a, b) => Math.abs(b.scoreChange) - Math.abs(a.scoreChange));
  else if (sort === "rank") results = [...results].sort((a, b) => a.rank - b.rank);

  const paginated = results.slice(offset, offset + limit);

  return NextResponse.json({
    data: paginated.map(c => ({
      id: c.id, handle: c.handle, name: c.name, avatar: c.avatar,
      university: c.university, country: c.country, flag: c.flag,
      niScore: c.niScore, rank: c.rank, scoreChange: c.scoreChange,
      tags: c.tags, categories: c.categories,
    })),
    meta: { total: results.length, limit, offset, query: q, category, sort },
  });
}
