import type { Metadata } from "next";
import Link from "next/link";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const metadata: Metadata = {
  title: "Discover — MERYT",
  description: "Discover verified talent by field, region, and rising score. Find the world's most promising students, researchers, and builders before they hit the top.",
};

const CATEGORIES = [
  { id: "tech", label: "Tech & Engineering", icon: "⚡", color: "#1A56FF" },
  { id: "research", label: "Research & Science", icon: "🔬", color: "#00BE6A" },
  { id: "creative", label: "Creative", icon: "✨", color: "#F5A200" },
  { id: "social", label: "Social Impact", icon: "🤝", color: "#FF4500" },
  { id: "gaming", label: "Gaming & Esports", icon: "🎮", color: "#9333EA" },
];

const FEATURED_TAGS = [
  "ML", "Open Source", "PhD", "Climate Science", "Quantum Computing", "Robotics",
  "BioML", "Audio AI", "Zero Knowledge", "Energy Tech", "Science Comm", "CreativeCoding",
  "FinTech", "Competitive Prog", "DevTools", "Networks",
];

const topRisers = [...LEADERBOARD_DATA]
  .filter(c => c.scoreChange > 100)
  .sort((a, b) => b.scoreChange - a.scoreChange)
  .slice(0, 6);

const newlyFeatured = LEADERBOARD_DATA.slice(20, 30);

const byRegion: Record<string, typeof LEADERBOARD_DATA> = {};
for (const c of LEADERBOARD_DATA) {
  const region = ["India", "Japan", "South Korea", "Taiwan", "China", "Singapore"].includes(c.country) ? "Asia"
    : ["Germany", "Switzerland", "UK", "France", "Sweden", "Russia"].includes(c.country) ? "Europe"
    : ["USA", "Canada", "Mexico", "Brazil"].includes(c.country) ? "Americas"
    : ["Nigeria", "Kenya", "South Africa", "Sudan", "Egypt"].includes(c.country) ? "Africa"
    : ["Australia"].includes(c.country) ? "Oceania" : "Other";
  if (!byRegion[region]) byRegion[region] = [];
  byRegion[region].push(c);
}

export default function DiscoverPage() {
  return (
    <main style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 24px 96px" }}>
      {/* Header */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--accent)33" }}>
          Talent Discovery
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", margin: "0 0 16px", lineHeight: 1.05 }}>
          Discover Talent
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, color: "var(--muted)", maxWidth: 600, lineHeight: 1.7 }}>
          Browse verified profiles by field, region, and momentum. Find the world&apos;s most promising talent before they hit the top.
        </p>
      </div>

      {/* Browse by category */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>Browse by Field</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {CATEGORIES.map(cat => {
            const count = LEADERBOARD_DATA.filter(c => c.categories.includes(cat.id as never)).length;
            return (
              <Link key={cat.id} href={`/leaderboard?category=${cat.id}`} style={{ textDecoration: "none", padding: "24px 16px", borderRadius: 16, border: `1.5px solid ${cat.color}25`, background: `${cat.color}06`, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 32 }}>{cat.icon}</span>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>{cat.label}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: cat.color }}>{count} profiles</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Browse by tag */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>Browse by Tag</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {FEATURED_TAGS.map(tag => {
            const count = LEADERBOARD_DATA.filter(c => c.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))).length;
            return (
              <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 100, border: "1.5px solid var(--border)", background: "var(--surface)", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text)" }}>
                {tag}
                {count > 0 && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>×{count}</span>}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Top risers */}
      <section style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)", margin: 0 }}>🔥 Rising Fast</h2>
          <Link href="/rankings?type=risers" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--accent)", textDecoration: "none" }}>See all →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {topRisers.map(c => (
            <Link key={c.id} href={`/profile/${c.id}`} style={{ textDecoration: "none", padding: "20px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 36, lineHeight: 1 }}>{c.avatar}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{c.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginBottom: 8 }}>{c.flag} {c.country} · #{c.rank}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.5px" }}>{c.niScore.toLocaleString()}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#00BE6A" }}>+{c.scoreChange}</span>
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                  {c.tags.slice(0, 2).map(t => (
                    <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "2px 8px", borderRadius: 100, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New to the board */}
      <section style={{ marginBottom: 64 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)", margin: 0 }}>🌟 Newly Featured</h2>
          <Link href="/leaderboard" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--accent)", textDecoration: "none" }}>Full leaderboard →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {newlyFeatured.map(c => (
            <Link key={c.id} href={`/profile/${c.id}`} style={{ textDecoration: "none", textAlign: "center", padding: "20px 12px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 32 }}>{c.avatar}</span>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>{c.name}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>#{c.rank} · {c.flag}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.5px" }}>{c.niScore.toLocaleString()}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse by region */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>Browse by Region</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {Object.entries(byRegion).map(([region, profiles]) => {
            const top = profiles.sort((a, b) => a.rank - b.rank).slice(0, 3);
            return (
              <div key={region} style={{ padding: "22px 24px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 800, color: "var(--text)", marginBottom: 14 }}>{region} <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", fontWeight: 400 }}>· {profiles.length} profiles</span></div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {top.map(p => (
                    <Link key={p.id} href={`/profile/${p.id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: "var(--bg)" }}>
                      <span style={{ fontSize: 22 }}>{p.avatar}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>{p.flag} {p.country} · {p.university}</div>
                      </div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 700, color: "var(--accent)" }}>{p.niScore.toLocaleString()}</div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "48px 40px", borderRadius: 24, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text)", marginBottom: 12 }}>Looking for specific talent?</h3>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", maxWidth: 440, margin: "0 auto 28px", lineHeight: 1.7 }}>
          Use the advanced search to filter by country, university, tags, score range, and more.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/search" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", background: "var(--accent)", padding: "12px 28px", borderRadius: 100, textDecoration: "none" }}>Advanced Search</Link>
          <Link href="/compare" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text)", background: "var(--bg)", padding: "12px 28px", borderRadius: 100, textDecoration: "none", border: "1.5px solid var(--border)" }}>Compare Profiles</Link>
        </div>
      </div>
    </main>
  );
}
