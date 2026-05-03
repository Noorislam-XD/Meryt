import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Newsletter — MERYT",
  description: "Subscribe to the MERYT newsletter for weekly talent insights, ranking updates, and the latest from the NI Score community.",
};

const RECENT_ISSUES = [
  { number: 12, title: "The Rise of Audio AI: How Rajan Pillai Climbed 189 Points", date: "Apr 28, 2025", preview: "This week's top mover, a deep dive into the Creator pillar's new weighting, and 5 profiles to watch." },
  { number: 11, title: "Quantum Computing's Next Wave: ETH Zürich Dominates", date: "Apr 21, 2025", preview: "Lena Fischer's landmark Nature Quantum paper, KAIST's new research cluster, and this month's verification stats." },
  { number: 10, title: "Open Source Still Wins: Carlos Herrera Hits 50k Stars", date: "Apr 14, 2025", preview: "The OSS Contributor category update, GitHub Star programme impact on NI Scores, and LatAm talent on the rise." },
  { number: 9, title: "Africa Tech Surge: Aisha Nkosi Earns ACM Best Paper", date: "Apr 7, 2025", preview: "Sub-Saharan Africa now has 340 verified MERYT profiles. We break down the talent map south of the Sahara." },
];

const FEATURES = [
  { icon: "📊", title: "Weekly Ranking Moves", desc: "Top risers, biggest movers, and profiles just entering the Top 100." },
  { icon: "🔬", title: "Research Highlights", desc: "New papers, citations milestones, and breakthroughs from verified researchers." },
  { icon: "⚡", title: "Platform Updates", desc: "New features, API changes, partner announcements, and verification news." },
  { icon: "🌍", title: "Regional Spotlights", desc: "Deep dives into talent emerging from specific countries, universities, and fields." },
  { icon: "🎤", title: "Founder's Note", desc: "Occasional long-form thoughts on merit, talent recognition, and building MERYT." },
  { icon: "🔗", title: "API & Developer News", desc: "Changelog highlights, new endpoints, and integration ideas for developers." },
];

export default function NewsletterPage() {
  return (
    <main style={{ maxWidth: 740, margin: "0 auto", padding: "64px 24px 96px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--accent)33" }}>
          Weekly · Free
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", margin: "0 0 20px", lineHeight: 1.05 }}>
          The MERYT Newsletter
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, color: "var(--muted)", lineHeight: 1.7, marginBottom: 40 }}>
          Every Monday: the week&apos;s biggest ranking moves, verified achievements, and insights on global talent. Joined by 14,200 readers.
        </p>

        {/* Subscribe form */}
        <div style={{ padding: "36px 40px", borderRadius: 24, border: "1.5px solid var(--border)", background: "var(--surface)", marginBottom: 16 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 24 }}>
            Subscribe — it&apos;s free
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{ flex: 1, padding: "14px 18px", borderRadius: 100, border: "1.5px solid var(--border)", background: "var(--bg)", fontFamily: "'DM Mono', monospace", fontSize: 13, color: "var(--text)", outline: "none" }}
            />
            <button style={{ padding: "14px 28px", borderRadius: 100, background: "var(--accent)", color: "#fff", fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", flexShrink: 0 }}>
              Subscribe
            </button>
          </div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", margin: 0, opacity: 0.6 }}>
            No spam. Unsubscribe any time. We never share your email.
          </p>
        </div>

        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>📬 14,200 subscribers</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>📅 Every Monday</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>💯 Free forever</div>
        </div>
      </div>

      {/* What you get */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>What&apos;s Inside</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 28 }}>Every issue is concise, data-driven, and worth your 5 minutes.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ padding: "20px 22px", borderRadius: 14, border: "1.5px solid var(--border)", background: "var(--surface)", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 24, lineHeight: 1.2 }}>{f.icon}</span>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent issues */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Recent Issues</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 28 }}>A sample of what lands in your inbox every Monday.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {RECENT_ISSUES.map(issue => (
            <div key={issue.number} style={{ padding: "20px 24px", borderRadius: 14, border: "1.5px solid var(--border)", background: "var(--surface)", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--border)", lineHeight: 1, minWidth: 40, textAlign: "center", paddingTop: 4 }}>#{issue.number}</div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 4, lineHeight: 1.4 }}>{issue.title}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginBottom: 8 }}>{issue.date}</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--muted)", lineHeight: 1.55 }}>{issue.preview}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RSS alternative */}
      <div style={{ padding: "24px 28px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)", display: "flex", gap: 16, alignItems: "center" }}>
        <span style={{ fontSize: 32 }}>🔊</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>Prefer RSS?</div>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--muted)" }}>Subscribe to the MERYT blog via RSS — new articles delivered straight to your feed reader.</div>
        </div>
        <a href="/api/rss" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--accent)", padding: "8px 16px", borderRadius: 100, border: "1px solid var(--accent)44", textDecoration: "none", flexShrink: 0 }}>RSS Feed</a>
      </div>
    </main>
  );
}
