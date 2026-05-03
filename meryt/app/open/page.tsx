import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open — MERYT",
  description: "MERYT's open metrics dashboard — traffic, verifications, API usage, and platform health data shared publicly.",
};

const METRICS = [
  { label: "Monthly Verified Profiles", value: "2,847", change: "+18%", period: "vs last month", color: "#00BE6A" },
  { label: "Active Leaderboard Users", value: "142,400", change: "+24%", period: "MAU", color: "#1A56FF" },
  { label: "API Calls / Day", value: "89,200", change: "+31%", period: "avg last 7d", color: "#9333EA" },
  { label: "Rank Changes Today", value: "1,284", change: "—", period: "live count", color: "#F5A200" },
  { label: "Verification Accuracy", value: "99.1%", change: "+0.2pp", period: "vs last quarter", color: "#00BE6A" },
  { label: "OG Images Generated / Day", value: "4,100", change: "+12%", period: "avg last 7d", color: "#FF4500" },
  { label: "Avg API Response Time", value: "44ms", change: "-6ms", period: "p50 last 7d", color: "#00BE6A" },
  { label: "Countries Represented", value: "142", change: "+4", period: "vs last month", color: "#1A56FF" },
];

const GROWTH = [
  { month: "Nov 2024", profiles: 18_400, verified: 17_200, api_calls_k: 42 },
  { month: "Dec 2024", profiles: 20_100, verified: 18_800, api_calls_k: 51 },
  { month: "Jan 2025", profiles: 22_000, verified: 20_500, api_calls_k: 63 },
  { month: "Feb 2025", profiles: 24_200, verified: 22_700, api_calls_k: 71 },
  { month: "Mar 2025", profiles: 26_400, verified: 24_800, api_calls_k: 82 },
  { month: "Apr 2025", profiles: 28_400, verified: 26_700, api_calls_k: 89 },
];

const TECH_STACK = [
  { layer: "Frontend", tech: "Next.js 15 (App Router)", note: "Deployed on Vercel Edge" },
  { layer: "Styling", tech: "Tailwind CSS v4", note: "Zero-runtime CSS" },
  { layer: "Database", tech: "PostgreSQL + Drizzle ORM", note: "Serverless via Neon" },
  { layer: "Auth", tech: "Clerk", note: "Institutional SSO + OAuth" },
  { layer: "Storage", tech: "Cloudflare R2", note: "Credential document storage" },
  { layer: "API", tech: "Next.js Route Handlers (Edge)", note: "API v1 public, REST" },
  { layer: "OG Images", tech: "Next.js ImageResponse (Edge)", note: "Per-profile dynamic OG" },
  { layer: "Search", tech: "Typesense", note: "Self-hosted on Fly.io" },
  { layer: "Email", tech: "Resend", note: "Transactional & newsletter" },
  { layer: "Analytics", tech: "Plausible Analytics", note: "Privacy-first, self-hosted" },
  { layer: "Monitoring", tech: "Sentry + Uptime Robot", note: "Error tracking & uptime" },
  { layer: "Payments", tech: "Stripe", note: "Pro subscriptions" },
];

const FUNDING = [
  { round: "Pre-seed", amount: "$480k", date: "Q3 2024", investors: "3 angel investors" },
  { round: "Seed", amount: "$2.4M", date: "Q1 2025", investors: "Led by Education Ventures" },
];

export default function OpenPage() {
  const maxProfiles = Math.max(...GROWTH.map(g => g.profiles));

  return (
    <main style={{ maxWidth: 1040, margin: "0 auto", padding: "64px 24px 96px" }}>
      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--accent3)", textTransform: "uppercase", marginBottom: 20, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--accent3)33" }}>
          Radical Transparency
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", margin: "0 0 20px", lineHeight: 1.05 }}>
          Open Metrics
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, color: "var(--muted)", maxWidth: 620, lineHeight: 1.7 }}>
          We believe transparency builds trust. Here&apos;s everything about how MERYT is performing, built, and funded — updated monthly.
        </p>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", marginTop: 16 }}>
          Last updated: May 2025 · <a href="/api/v1/stats" style={{ color: "var(--accent)", textDecoration: "none" }}>View raw data via API →</a>
        </div>
      </div>

      {/* Key metrics grid */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)", marginBottom: 24 }}>Platform Metrics</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {METRICS.map(m => (
            <div key={m.label} style={{ padding: "22px 20px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, color: "var(--text)", letterSpacing: "-1px", marginBottom: 4 }}>{m.value}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: m.color, marginBottom: 8 }}>{m.change} <span style={{ color: "var(--muted)" }}>{m.period}</span></div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 12, color: "var(--muted)", lineHeight: 1.4 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Growth chart */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Profile Growth</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 28 }}>Total profiles and verified profiles over the past 6 months.</p>
        <div style={{ padding: "28px 24px", borderRadius: 20, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
            {GROWTH.map(g => (
              <div key={g.month} style={{ textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", height: 120, gap: 3, marginBottom: 10, position: "relative" }}>
                  <div style={{ width: 24, background: "#1A56FF", borderRadius: "4px 4px 0 0", height: `${(g.profiles / maxProfiles) * 110}px`, transition: "height 0.4s" }} />
                  <div style={{ width: 24, background: "#00BE6A", borderRadius: "4px 4px 0 0", height: `${(g.verified / maxProfiles) * 110}px`, position: "absolute", bottom: 0, opacity: 0.7 }} />
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--text)", marginBottom: 2 }}>{(g.profiles / 1000).toFixed(1)}k</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "var(--muted)" }}>{g.month.split(" ")[0]}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 20, justifyContent: "center" }}>
            {[{ color: "#1A56FF", label: "Total Profiles" }, { color: "#00BE6A", label: "Verified Profiles" }].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: l.color }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Tech Stack</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 28 }}>Every layer of what powers MERYT.</p>
        <div style={{ borderRadius: 16, border: "1.5px solid var(--border)", overflow: "hidden" }}>
          {TECH_STACK.map((t, i) => (
            <div key={t.layer} style={{ padding: "14px 24px", borderBottom: i < TECH_STACK.length - 1 ? "1px solid var(--border)" : "none", display: "grid", gridTemplateColumns: "140px 1fr 1fr", gap: 16, alignItems: "center" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{t.layer}</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{t.tech}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>{t.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Funding */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Funding</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 28 }}>We believe transparency includes how we&apos;re funded.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {FUNDING.map(f => (
            <div key={f.round} style={{ padding: "28px 32px", borderRadius: 18, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{f.round} · {f.date}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: "var(--text)", letterSpacing: "-1px", marginBottom: 4 }}>{f.amount}</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, color: "var(--muted)" }}>{f.investors}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "16px 20px", borderRadius: 12, background: "var(--surface)", border: "1.5px solid var(--border)" }}>
          <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>
            We are revenue-generating through Pro subscriptions and institutional partnerships. Our goal is profitability by Q4 2025. We are not optimising for hyper-growth at the expense of verification quality.
          </p>
        </div>
      </section>

      {/* Values commitment */}
      <section>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text)", marginBottom: 24 }}>Our Commitments</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { icon: "🔒", title: "Never sell data", desc: "User profile data is never sold to third parties or used for advertising targeting." },
            { icon: "🧮", title: "Methodology is public", desc: "The NI Score formula, pillar weights, and verification criteria are all documented in our API Docs." },
            { icon: "🚫", title: "Not social credit scoring", desc: "MERYT does not score political views, social relationships, or lifestyle choices. Only verifiable proof-of-work." },
            { icon: "📖", title: "Open API", desc: "Core leaderboard data is accessible via our free API tier. No paywalls on fundamental rankings." },
            { icon: "🌍", title: "Global fairness", desc: "Scoring weights are adjusted for access inequality. A researcher from Sudan is judged on the same pillar criteria as one from MIT." },
            { icon: "💬", title: "Appeal process", desc: "Every profile can dispute their score or verification status. We review all appeals within 5 business days." },
          ].map(c => (
            <div key={c.title} style={{ padding: "22px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 10 }}>{c.icon}</span>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
