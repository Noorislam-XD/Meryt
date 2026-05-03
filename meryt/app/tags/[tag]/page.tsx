import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEADERBOARD_DATA } from "@/src/lib/data";

const ALL_TAGS = Array.from(new Set(LEADERBOARD_DATA.flatMap(c => c.tags))).sort();

export async function generateStaticParams() {
  return ALL_TAGS.map(tag => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const count = LEADERBOARD_DATA.filter(c => c.tags.includes(decoded)).length;
  return {
    title: `#${decoded} — MERYT`,
    description: `${count} verified MERYT profiles tagged with #${decoded}. Browse ranked talent in this area.`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  const profiles = LEADERBOARD_DATA
    .filter(c => c.tags.includes(decoded))
    .sort((a, b) => a.rank - b.rank);

  if (profiles.length === 0) notFound();

  const avgScore = Math.round(profiles.reduce((s, p) => s + p.niScore, 0) / profiles.length);
  const relatedTags = Array.from(
    new Set(profiles.flatMap(p => p.tags).filter(t => t !== decoded))
  ).slice(0, 10);

  return (
    <main style={{ maxWidth: 920, margin: "0 auto", padding: "64px 24px 96px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32, fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>
        <Link href="/discover" style={{ color: "var(--accent)", textDecoration: "none" }}>Discover</Link>
        <span>/</span>
        <span>Tags</span>
        <span>/</span>
        <span style={{ color: "var(--text)" }}>#{decoded}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--accent)", marginBottom: 12 }}>TAG</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", margin: "0 0 16px", lineHeight: 1.05 }}>
          #{decoded}
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, color: "var(--muted)", lineHeight: 1.7 }}>
          {profiles.length} verified {profiles.length === 1 ? "profile" : "profiles"} · Top rank: #{profiles[0].rank} · Avg NI Score: {avgScore.toLocaleString()}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
        {[
          { label: "Profiles", value: profiles.length },
          { label: "Top Global Rank", value: `#${profiles[0].rank}` },
          { label: "Avg NI Score", value: avgScore.toLocaleString() },
          { label: "Top NI Score", value: profiles[0].niScore.toLocaleString() },
        ].map(s => (
          <div key={s.label} style={{ padding: "16px", borderRadius: 12, border: "1.5px solid var(--border)", background: "var(--surface)", textAlign: "center" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.5px" }}>{s.value}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Profiles list */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 20 }}>
          Verified Profiles
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {profiles.map((c, i) => (
            <Link key={c.id} href={`/profile/${c.id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 16, padding: "16px 22px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", width: 24, textAlign: "center" }}>{i + 1}</span>
              <span style={{ fontSize: 36, lineHeight: 1 }}>{c.avatar}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{c.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>
                  {c.handle} · {c.flag} {c.country} · {c.university} · Global #{c.rank}
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end", maxWidth: 180 }}>
                {c.tags.slice(0, 3).map(t => (
                  <Link key={t} href={`/tags/${encodeURIComponent(t)}`} onClick={e => e.stopPropagation()} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 8px", borderRadius: 100, background: t === decoded ? "var(--accent)" : "var(--bg)", border: "1px solid var(--border)", color: t === decoded ? "#fff" : "var(--muted)", textDecoration: "none" }}>
                    {t}
                  </Link>
                ))}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, minWidth: 80 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.5px" }}>{c.niScore.toLocaleString()}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: c.scoreChange >= 0 ? "#00BE6A" : "#FF4500" }}>{c.scoreChange >= 0 ? "+" : ""}{c.scoreChange}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Related tags */}
      {relatedTags.length > 0 && (
        <section>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 16 }}>Related Tags</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {relatedTags.map(t => (
              <Link key={t} href={`/tags/${encodeURIComponent(t)}`} style={{ textDecoration: "none", fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "7px 16px", borderRadius: 100, border: "1.5px solid var(--border)", background: "var(--surface)", color: "var(--text)" }}>
                #{t}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
