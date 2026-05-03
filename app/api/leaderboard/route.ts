import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const category = searchParams.get("category") ?? "all";
  const search = searchParams.get("q") ?? "";

  let data = [...LEADERBOARD_DATA];

  if (category !== "all") {
    data = data.filter(c => c.categories.includes(category as never));
  }

  if (search) {
    const q = search.toLowerCase();
    data = data.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.handle.toLowerCase().includes(q) ||
      c.university.toLowerCase().includes(q)
    );
  }

  const total = data.length;
  const results = data.slice(offset, offset + limit);

  return NextResponse.json({
    data: results,
    meta: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    },
  });
}
