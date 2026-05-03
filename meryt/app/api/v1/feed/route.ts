import { NextRequest, NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";

type FeedEventType = "rank_change" | "new_profile" | "verification" | "score_update";

interface FeedEvent {
  id: string;
  type: FeedEventType;
  timestamp: string;
  profileId: string;
  profileName: string;
  handle: string;
  avatar: string;
  country: string;
  flag: string;
  message: string;
  delta?: number;
  oldRank?: number;
  newRank?: number;
  newScore?: number;
}

function generateFeed(profiles: typeof LEADERBOARD_DATA, limit: number): FeedEvent[] {
  const events: FeedEvent[] = [];
  const now = Date.now();

  for (const p of profiles.slice(0, Math.min(limit * 2, 30))) {
    if (p.scoreChange > 0) {
      events.push({
        id: `evt_rank_${p.id}_${now}`,
        type: "score_update",
        timestamp: new Date(now - Math.floor(Math.random() * 3_600_000)).toISOString(),
        profileId: p.id,
        profileName: p.name,
        handle: p.handle,
        avatar: p.avatar,
        country: p.country,
        flag: p.flag,
        message: `${p.name} gained ${p.scoreChange} NI Score points this week`,
        delta: p.scoreChange,
        newScore: p.niScore,
      });
    }
    if (p.rank <= 10) {
      events.push({
        id: `evt_ver_${p.id}_${now}`,
        type: "verification",
        timestamp: new Date(now - Math.floor(Math.random() * 86_400_000)).toISOString(),
        profileId: p.id,
        profileName: p.name,
        handle: p.handle,
        avatar: p.avatar,
        country: p.country,
        flag: p.flag,
        message: `${p.name}'s ${p.achievements[0]?.title ?? "credential"} was verified`,
        newScore: p.niScore,
      });
    }
  }

  return events
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));
  const type = searchParams.get("type");

  let events = generateFeed(LEADERBOARD_DATA, limit * 2);
  if (type) events = events.filter(e => e.type === type);
  events = events.slice(0, limit);

  return NextResponse.json(
    {
      data: { events, hasMore: false },
      meta: { apiVersion: "1", timestamp: new Date().toISOString(), limit, count: events.length },
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
