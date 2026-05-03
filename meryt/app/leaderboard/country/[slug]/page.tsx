"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LEADERBOARD_DATA } from "@/src/lib/data";

const FLAG_MAP: Record<string, string> = {
  india: "🇮🇳", usa: "🇺🇸", uk: "🇬🇧", germany: "🇩🇪", japan: "🇯🇵",
  "south korea": "🇰🇷", china: "🇨🇳", australia: "🇦🇺", nigeria: "🇳🇬",
  kenya: "🇰🇪", canada: "🇨🇦", brazil: "🇧🇷", switzerland: "🇨🇭",
  russia: "🇷🇺", sweden: "🇸🇪", singapore: "🇸🇬",
};

export default function CountryLeaderboardPage() {
  const { slug } = useParams<{ slug: string }>();
  const countryName = decodeURIComponent(slug).replace(/-/g, " ");

  const profiles = LEADERBOARD_DATA
    .filter(c => c.country.toLowerCase() === countryName.toLowerCase())
    .sort((a, b) => a.rank - b.rank);

  const flag = FLAG_MAP[countryName.toLowerCase()] ?? "🌍";

  if (profiles.length === 0) {
    return (
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{flag}</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: "var(--text)", marginBottom: 12 }}>
          {countryName.charAt(0).toUpperCase() + countryName.slice(1)}
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, color: "var(--muted)", marginBottom: 28 }}>
          No verified profiles found from this country yet.
        </p>
        <Link href="/leaderboard" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", background: "var(--accent)", padding: "12px 28px", borderRadius: 100, textDecoration: "none" }}>
          View Global Leaderboard
        </Link>
      </main>
    );
  }

  const avgScore = Math.round(profiles.reduce((s, p) => s + p.niScore, 0) / profiles.length);

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px 96px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32, fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>
        <Link href="/leaderboard" style={{ color: "var(--accent)", textDecoration: "none" }}>Leaderboard</Link>
        <span>/</span>
        <span>Country</span>
        <span>/</span>
        <span style={{ color: "var(--text)" }}>{countryName.charAt(0).toUpperCase() + countryName.slice(1)}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>{flag}</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 44, fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", margin: "0 0 12px", lineHeight: 1.05 }}>
          {countryName.charAt(0).toUpperCase() + countryName.slice(1)}
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, color: "var(--muted)", lineHeight: 1.7 }}>
          {profiles.length} verified {profiles.length === 1 ? "profile" : "profiles"} · Top global rank: #{profiles[0].rank} · Avg NI Score: {avgScore.toLocaleString()}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
        {[
          { label: "Profiles", value: profiles.length },
          { label: "Top Rank", value: `#${profiles[0].rank}` },
          { label: "Avg Score", value: avgScore.toLocaleString() },
          { label: "Top Score", value: profiles[0].niScore.toLocaleString() },
        ].map(s => (
          <div key={s.label} style={{ padding: "16px", borderRadius: 12, border: "1.5px solid var(--border)", background: "var(--surface)", textAlign: "center" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.5px" }}>{s.value}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Profiles */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {profiles.map((p, i) => (
          <Link key={p.id} href={`/profile/${p.id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 16, padding: "16px 22px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", width: 20, textAlign: "right" }}>{i + 1}</span>
            <span style={{ fontSize: 36, lineHeight: 1 }}>{p.avatar}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{p.handle} · {p.university} · Global Rank #{p.rank}</div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
              {p.tags.slice(0, 2).map(t => (
                <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 8px", borderRadius: 100, background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>{t}</span>
              ))}
            </div>
            <div style={{ textAlign: "right", flexShrink: 0, minWidth: 80 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.5px" }}>{p.niScore.toLocaleString()}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: p.scoreChange >= 0 ? "#00BE6A" : "#FF4500" }}>{p.scoreChange >= 0 ? "+" : ""}{p.scoreChange}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop: 48, textAlign: "center" }}>
        <Link href="/leaderboard" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text)", background: "var(--surface)", padding: "12px 28px", borderRadius: 100, textDecoration: "none", border: "1.5px solid var(--border)", marginRight: 12 }}>
          ← Global Leaderboard
        </Link>
        <Link href="/compare" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", background: "var(--accent)", padding: "12px 28px", borderRadius: 100, textDecoration: "none" }}>
          Compare Profiles
        </Link>
      </div>
    </main>
  );
}
