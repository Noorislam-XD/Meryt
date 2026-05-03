import type { Metadata } from "next";
import Link from "next/link";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const metadata: Metadata = {
  title: "Rankings — MERYT",
  description: "Specialised MERYT leaderboards: top by country, field, institution, and pillar. Discover the world's highest-ranked talent by dimension.",
};

function topByCountry(n = 5) {
  const countryMap: Record<string, typeof LEADERBOARD_DATA> = {};
  for (const c of LEADERBOARD_DATA) {
    if (!countryMap[c.country]) countryMap[c.country] = [];
    countryMap[c.country].push(c);
  }
  return Object.entries(countryMap)
    .map(([country, profiles]) => ({
      country,
      flag: profiles[0].flag,
      top: profiles.sort((a, b) => a.rank - b.rank).slice(0, n),
      avgScore: Math.round(profiles.reduce((s, p) => s + p.niScore, 0) / profiles.length),
    }))
    .sort((a, b) => b.top[0].niScore - a.top[0].niScore)
    .slice(0, 8);
}

function topByPillar(pillarId: string, n = 5) {
  return [...LEADERBOARD_DATA]
    .map(c => ({ ...c, pillarScore: c.pillars.find(p => p.id === pillarId)?.score ?? 0 }))
    .sort((a, b) => b.pillarScore - a.pillarScore)
    .slice(0, n);
}

function topByCategory(cat: string, n = 6) {
  return LEADERBOARD_DATA
    .filter(c => c.categories.includes(cat as never))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, n);
}

const PILLARS = [
  { id: "academic", name: "Academic", icon: "🎓", color: "#1A56FF" },
  { id: "research", name: "Research", icon: "🔬", color: "#00BE6A" },
  { id: "code", name: "Code", icon: "💻", color: "#9333EA" },
  { id: "creator", name: "Creator", icon: "✨", color: "#F5A200" },
  { id: "social", name: "Social Impact", icon: "🤝", color: "#FF4500" },
];

const CATEGORIES = [
  { id: "tech", label: "Tech & Engineering", icon: "⚡", color: "#1A56FF" },
  { id: "research", label: "Research & Science", icon: "🔬", color: "#00BE6A" },
  { id: "creative", label: "Creative", icon: "✨", color: "#F5A200" },
  { id: "social", label: "Social Impact", icon: "🤝", color: "#FF4500" },
  { id: "gaming", label: "Gaming & Esports", icon: "🎮", color: "#9333EA" },
];

const countryRankings = topByCountry();

export default function RankingsPage() {
  return (
    <main style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 24px 96px" }}>
      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--accent)33" }}>
          Specialised Rankings
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", margin: "0 0 16px", lineHeight: 1.05 }}>
          Rankings by Dimension
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, color: "var(--muted)", maxWidth: 640, lineHeight: 1.7 }}>
          Explore the global leaderboard through different lenses — top talent by country, field, pillar, and category.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          <Link href="/leaderboard" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", background: "var(--accent)", padding: "12px 24px", borderRadius: 100, textDecoration: "none" }}>Full Leaderboard →</Link>
          <Link href="/compare" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text)", background: "var(--surface)", padding: "12px 24px", borderRadius: 100, textDecoration: "none", border: "1.5px solid var(--border)" }}>Compare Profiles</Link>
        </div>
      </div>

      {/* By Country */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Top by Country</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 32 }}>Countries ranked by their highest NI Score holder.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {countryRankings.map((cr, i) => (
            <div key={cr.country} style={{ padding: "20px 24px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--muted)", opacity: 0.4, minWidth: 28 }}>#{i + 1}</div>
                <span style={{ fontSize: 24 }}>{cr.flag}</span>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)" }}>{cr.country}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>Avg: {cr.avgScore.toLocaleString()} NI · {cr.top.length} ranked</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {cr.top.map((p, pi) => (
                  <Link key={p.id} href={`/profile/${p.id}`} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", padding: "8px 12px", borderRadius: 10, background: "var(--bg)" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", minWidth: 16 }}>#{pi + 1}</span>
                    <span style={{ fontSize: 20 }}>{p.avatar}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>{p.university}</div>
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: "var(--accent)" }}>{p.niScore.toLocaleString()}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* By Pillar */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Top by Pillar</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 32 }}>Who scores highest in each of the five NI Score pillars?</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
          {PILLARS.map(pillar => {
            const top = topByPillar(pillar.id, 3);
            return (
              <div key={pillar.id} style={{ padding: "20px 16px", borderRadius: 16, border: `1.5px solid ${pillar.color}33`, background: `${pillar.color}06` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                  <span style={{ fontSize: 20 }}>{pillar.icon}</span>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: pillar.color, fontWeight: 700 }}>{pillar.name.toUpperCase()}</div>
                </div>
                {top.map((p, i) => (
                  <Link key={p.id} href={`/profile/${p.id}`} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", padding: "7px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", minWidth: 16 }}>#{i + 1}</span>
                    <span style={{ fontSize: 16 }}>{p.avatar}</span>
                    <div style={{ flex: 1, overflow: "hidden" }}>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 12, color: "var(--text)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: pillar.color }}>
                        {p.pillars.find(pl => pl.id === pillar.id)?.score ?? "—"} pts
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      {/* By Category */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Top by Category</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 32 }}>The six highest-ranked profiles in each talent category.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {CATEGORIES.map(cat => {
            const profiles = topByCategory(cat.id);
            if (!profiles.length) return null;
            return (
              <div key={cat.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 22 }}>{cat.icon}</span>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text)", margin: 0 }}>{cat.label}</h3>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 10px", borderRadius: 100, background: `${cat.color}18`, color: cat.color }}>{profiles.length} profiles</span>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {profiles.map((p, i) => (
                    <Link key={p.id} href={`/profile/${p.id}`} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", padding: "12px 16px", borderRadius: 12, border: "1.5px solid var(--border)", background: "var(--surface)", flex: "0 0 auto" }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>#{i + 1}</span>
                      <span style={{ fontSize: 22 }}>{p.avatar}</span>
                      <div>
                        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{p.name}</div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: cat.color }}>{p.niScore.toLocaleString()} NI</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rising stars */}
      <section>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Rising Stars — Biggest Weekly Movers</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 32 }}>Profiles with the largest positive NI Score change in the past 7 days.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
          {[...LEADERBOARD_DATA]
            .filter(c => c.scoreChange > 0)
            .sort((a, b) => b.scoreChange - a.scoreChange)
            .slice(0, 10)
            .map((p, i) => (
              <Link key={p.id} href={`/profile/${p.id}`} style={{ textDecoration: "none", padding: "18px 16px", borderRadius: 14, border: "1.5px solid var(--border)", background: "var(--surface)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <span style={{ fontSize: 32, marginBottom: 8 }}>{p.avatar}</span>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{p.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>Rank #{p.rank}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#00BE6A" }}>+{p.scoreChange}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>pts this week</div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
