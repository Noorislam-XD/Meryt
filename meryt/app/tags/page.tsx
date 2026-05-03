import type { Metadata } from "next";
import Link from "next/link";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const metadata: Metadata = {
  title: "Browse by Tag — MERYT",
  description: "Explore all tags on MERYT — browse verified talent by specialisation: ML, Open Source, Climate Science, Robotics, and more.",
};

const tagMap: Record<string, { count: number; topScore: number; topName: string }> = {};
for (const c of LEADERBOARD_DATA) {
  for (const t of c.tags) {
    if (!tagMap[t]) tagMap[t] = { count: 0, topScore: 0, topName: "" };
    tagMap[t].count++;
    if (c.niScore > tagMap[t].topScore) { tagMap[t].topScore = c.niScore; tagMap[t].topName = c.name; }
  }
}

const TAGS_SORTED = Object.entries(tagMap)
  .map(([tag, d]) => ({ tag, ...d }))
  .sort((a, b) => b.count - a.count || b.topScore - a.topScore);

const TAG_COLORS = [
  "#1A56FF", "#00BE6A", "#9333EA", "#F5A200", "#FF4500",
  "#1A56FF", "#00BE6A", "#9333EA", "#F5A200", "#FF4500",
];

export default function TagsPage() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px 96px" }}>
      <div style={{ marginBottom: 56 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--accent)33" }}>
          Tag Directory
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", margin: "0 0 16px", lineHeight: 1.05 }}>
          Browse by Tag
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, color: "var(--muted)", lineHeight: 1.7, maxWidth: 560 }}>
          {TAGS_SORTED.length} specialisation tags across all verified profiles. Click any tag to see ranked profiles.
        </p>
      </div>

      {/* Tag cloud */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 64 }}>
        {TAGS_SORTED.map(({ tag, count }, i) => {
          const color = TAG_COLORS[i % TAG_COLORS.length];
          const size = count >= 4 ? 16 : count >= 3 ? 14 : count >= 2 ? 13 : 12;
          return (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6, padding: `${count >= 3 ? 10 : 8}px ${count >= 3 ? 18 : 14}px`, borderRadius: 100, border: `1.5px solid ${color}30`, background: `${color}08`, color: "var(--text)" }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: size, fontWeight: 600, color: "var(--text)" }}>#{tag}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: color }}>{count}</span>
            </Link>
          );
        })}
      </div>

      {/* Tag table */}
      <section>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>All Tags</h2>
        <div style={{ borderRadius: 16, border: "1.5px solid var(--border)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 120px 200px", padding: "10px 20px", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
            {["Tag", "Profiles", "Top Score", "Top Profile"].map(h => (
              <span key={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</span>
            ))}
          </div>
          {TAGS_SORTED.map(({ tag, count, topScore, topName }, i) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} style={{ textDecoration: "none", display: "grid", gridTemplateColumns: "1fr 80px 120px 200px", padding: "13px 20px", borderBottom: i < TAGS_SORTED.length - 1 ? "1px solid var(--border)" : "none", alignItems: "center" }}>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--accent)" }}>#{tag}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--text)" }}>{count}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--text)" }}>{topScore.toLocaleString()}</span>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--muted)" }}>{topName}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
