import type { Metadata } from "next";
import Link from "next/link";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const metadata: Metadata = {
  title: "Hall of Fame — MERYT",
  description: "The all-time highest achievers on the MERYT platform — profiles that have consistently held Top 10 rankings and earned exceptional verified credentials.",
};

const TOP_10 = LEADERBOARD_DATA.slice(0, 10);
const HALL_TITLES: Record<number, { title: string; badge: string; color: string }> = {
  1: { title: "Grand Champion", badge: "🏆", color: "#F5A200" },
  2: { title: "Silver Titan", badge: "🥈", color: "#A2AFBE" },
  3: { title: "Bronze Legend", badge: "🥉", color: "#C4793A" },
  4: { title: "Elite Scholar", badge: "⭐", color: "#1A56FF" },
  5: { title: "Vanguard", badge: "⚡", color: "#9333EA" },
  6: { title: "Luminary", badge: "💡", color: "#00BE6A" },
  7: { title: "Architect", badge: "🔧", color: "#FF4500" },
  8: { title: "Visionary", badge: "🔭", color: "#1A56FF" },
  9: { title: "Trailblazer", badge: "🌠", color: "#F5A200" },
  10: { title: "Pioneer", badge: "🚀", color: "#9333EA" },
};

const MILESTONE_BADGES = [
  { icon: "🌍", label: "Global Top 10", desc: "Sustained Top 10 ranking for 30+ days" },
  { icon: "✅", label: "Fully Verified", desc: "All 5 pillars verified by MERYT" },
  { icon: "📄", label: "Published Author", desc: "Peer-reviewed paper verified" },
  { icon: "🏅", label: "Award Holder", desc: "Verified major award or fellowship" },
  { icon: "💻", label: "OSS Contributor", desc: "1,000+ GitHub contributions verified" },
  { icon: "🎓", label: "Academic Elite", desc: "Top-tier university credential verified" },
];

export default function HallOfFamePage() {
  const champion = TOP_10[0];
  const runners = TOP_10.slice(1, 3);
  const elite = TOP_10.slice(3);

  return (
    <main style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 24px 96px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 72 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🏆</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "#F5A200", textTransform: "uppercase", marginBottom: 20, padding: "5px 14px", borderRadius: 100, border: "1px solid #F5A20033" }}>
          All-Time Top Performers
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", margin: "0 0 20px", lineHeight: 1.05 }}>
          Hall of Fame
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, color: "var(--muted)", maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
          The verified elite. Profiles that have consistently demonstrated exceptional proof-of-work across all five NI Score pillars.
        </p>
      </div>

      {/* Champion spotlight */}
      <div style={{ marginBottom: 56, padding: "48px", borderRadius: 28, background: "linear-gradient(135deg, #F5A20012 0%, #FF450008 50%, #F5A20012 100%)", border: "2px solid #F5A20030", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, fontSize: 200, opacity: 0.04, lineHeight: 1, userSelect: "none" }}>🏆</div>
        <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: 72, lineHeight: 1 }}>{champion.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#F5A200", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12, padding: "4px 12px", borderRadius: 100, background: "#F5A20018" }}>
              🏆 Grand Champion · Rank #1
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-1px", color: "var(--text)", marginBottom: 4 }}>{champion.name}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>{champion.handle} · {champion.flag} {champion.country} · {champion.university}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", lineHeight: 1.6, maxWidth: 520, marginBottom: 16 }}>{champion.bio}</div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, color: "#F5A200", letterSpacing: "-1px" }}>
                {champion.niScore.toLocaleString()}
              </div>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>NI Score</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#00BE6A" }}>+{champion.scoreChange} this week</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignSelf: "flex-start" }}>
            {champion.achievements.map(a => (
              <div key={a.id} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "10px 14px", borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: 16 }}>{a.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 12, color: "var(--text)", fontWeight: 500 }}>{a.title}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>{a.date}</div>
                </div>
              </div>
            ))}
            <Link href={`/profile/${champion.id}`} style={{ textAlign: "center", fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", background: "#F5A200", padding: "12px 24px", borderRadius: 100, textDecoration: "none" }}>
              View Full Profile →
            </Link>
          </div>
        </div>
      </div>

      {/* Silver & Bronze */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 56 }}>
        {runners.map((c, i) => {
          const ht = HALL_TITLES[c.rank];
          return (
            <div key={c.id} style={{ padding: "32px", borderRadius: 20, border: `2px solid ${ht.color}30`, background: `${ht.color}06` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 36 }}>{ht.badge}</span>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: ht.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>{ht.title} · Rank #{c.rank}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>{c.name}</div>
                </div>
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>{c.flag} {c.country} · {c.university}</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 16 }}>{c.bio}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 20 }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: ht.color, letterSpacing: "-1px" }}>{c.niScore.toLocaleString()}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>NI Score</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                {c.achievements.map(a => (
                  <span key={a.id} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "4px 10px", borderRadius: 100, background: `${ht.color}15`, color: ht.color }}>{a.icon} {a.title.split("—")[0].trim()}</span>
                ))}
              </div>
              <Link href={`/profile/${c.id}`} style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 13, color: "var(--text)", textDecoration: "none", padding: "10px 20px", borderRadius: 100, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
                View Profile →
              </Link>
            </div>
          );
        })}
      </div>

      {/* Elite 7 (ranks 4–10) */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text)", marginBottom: 24 }}>The Elite Seven</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12 }}>
          {elite.map(c => {
            const ht = HALL_TITLES[c.rank];
            return (
              <Link key={c.id} href={`/profile/${c.id}`} style={{ textDecoration: "none", textAlign: "center", padding: "20px 12px", borderRadius: 16, border: `1.5px solid ${ht.color}25`, background: "var(--surface)" }}>
                <span style={{ fontSize: 28, display: "block", marginBottom: 8 }}>{ht.badge}</span>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{c.avatar}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: "var(--text)", marginBottom: 3, lineHeight: 1.3 }}>{c.name.split(" ")[0]}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)", marginBottom: 6 }}>#{c.rank}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, color: ht.color }}>{c.niScore.toLocaleString()}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "var(--muted)" }}>NI</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Milestone badges legend */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Hall of Fame Badges</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 28 }}>Every Hall of Fame profile has earned at least 4 of these verified milestone badges.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {MILESTONE_BADGES.map(b => (
            <div key={b.label} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "18px 20px", borderRadius: 14, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <span style={{ fontSize: 26, lineHeight: 1 }}>{b.icon}</span>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{b.label}</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "48px 40px", borderRadius: 24, border: "1.5px solid #F5A20033", background: "#F5A20008" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 12, letterSpacing: "-0.5px" }}>
          Your Profile Could Be Here
        </div>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, color: "var(--muted)", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.7 }}>
          Start building your NI Score today. Verify your credentials, showcase your proof-of-work, and climb the global leaderboard.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/verify" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", background: "#F5A200", padding: "14px 32px", borderRadius: 100, textDecoration: "none" }}>Start Verifying</Link>
          <Link href="/leaderboard" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: "var(--text)", background: "var(--surface)", padding: "14px 32px", borderRadius: 100, textDecoration: "none", border: "1.5px solid var(--border)" }}>View Full Leaderboard</Link>
        </div>
      </div>
    </main>
  );
}
