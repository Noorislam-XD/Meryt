import { MetadataRoute } from "next";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://meryt.app";

  const staticPages = [
    { url: base, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${base}/search`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${base}/verify`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/pricing`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/dashboard`, changeFrequency: "daily" as const, priority: 0.5 },
  ];

  const profilePages = LEADERBOARD_DATA.map(c => ({
    url: `${base}/profile/${c.id}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...profilePages];
}
