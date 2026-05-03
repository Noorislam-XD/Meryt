import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners — MERYT",
  description: "Universities, research labs, and companies that recognise MERYT-verified talent rankings in their hiring and admissions processes.",
};

const UNIVERSITY_PARTNERS = [
  { name: "MIT", location: "Cambridge, USA", logo: "🏛", tier: "Founding", students: "11,500", since: "2024" },
  { name: "IIT Bombay", location: "Mumbai, India", logo: "🎓", tier: "Founding", students: "10,000", since: "2024" },
  { name: "ETH Zürich", location: "Zürich, Switzerland", logo: "⚗️", tier: "Founding", students: "22,200", since: "2024" },
  { name: "University of Tokyo", location: "Tokyo, Japan", logo: "🌸", tier: "Premier", students: "28,000", since: "2024" },
  { name: "Stanford University", location: "Stanford, USA", logo: "🌲", tier: "Premier", students: "17,200", since: "2024" },
  { name: "University of Oxford", location: "Oxford, UK", logo: "📚", tier: "Premier", students: "24,300", since: "2024" },
  { name: "KAIST", location: "Daejeon, South Korea", logo: "🔬", tier: "Premier", students: "10,100", since: "2025" },
  { name: "Tsinghua University", location: "Beijing, China", logo: "🏮", tier: "Premier", students: "36,000", since: "2025" },
  { name: "Caltech", location: "Pasadena, USA", logo: "🚀", tier: "Associate", students: "2,200", since: "2025" },
  { name: "University of Cambridge", location: "Cambridge, UK", logo: "🎭", tier: "Associate", students: "23,200", since: "2025" },
  { name: "NTU Singapore", location: "Singapore", logo: "🌏", tier: "Associate", students: "33,500", since: "2025" },
  { name: "TU Munich", location: "Munich, Germany", logo: "🇩🇪", tier: "Associate", students: "50,000", since: "2025" },
];

const CORPORATE_PARTNERS = [
  { name: "Google DeepMind", sector: "AI Research", logo: "🤖", perk: "Fast-track hiring for Top 200 MERYT" },
  { name: "Stripe", sector: "FinTech", logo: "💳", perk: "Recruiter access to verified profiles" },
  { name: "Notion", sector: "Productivity", logo: "📝", perk: "Campus ambassador talent pipeline" },
  { name: "OpenAI", sector: "AI", logo: "⚡", perk: "Residency programme for Top 100" },
  { name: "Figma", sector: "Design Tools", logo: "🎨", perk: "Design talent leaderboard sponsorship" },
  { name: "Anthropic", sector: "AI Safety", logo: "🛡", perk: "Research fellowship pipeline" },
  { name: "Hugging Face", sector: "ML Platform", logo: "🤗", perk: "Open-source contributor recognition" },
  { name: "Vercel", sector: "Infrastructure", logo: "▲", perk: "Developer talent showcase partner" },
];

const TIERS = [
  { name: "Founding", color: "#F5A200", desc: "Helped define MERYT's verification standards from day one. Full API integration, co-branded reports, and dedicated partnership manager." },
  { name: "Premier", color: "#1A56FF", desc: "Deep integration with admissions and career services. Annual joint report on talent trends, leaderboard visibility boost." },
  { name: "Associate", color: "#00BE6A", desc: "MERYT badge on institutional profiles, bulk verification credits, and access to regional talent dashboards." },
];

const STAT = ({ value, label }: { value: string; label: string }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-1px", color: "var(--text)" }}>{value}</div>
    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{label}</div>
  </div>
);

export default function PartnersPage() {
  return (
    <main style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 24px 96px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 72 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--accent)33" }}>
          Institutional Trust Network
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", margin: "0 0 20px", lineHeight: 1.05 }}>
          Partners & Institutions
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, color: "var(--muted)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
          World-leading universities, research labs, and forward-thinking companies that recognise MERYT-verified rankings.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 80, padding: "40px 32px", borderRadius: 20, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
        <STAT value="12" label="University Partners" />
        <STAT value="8" label="Corporate Partners" />
        <STAT value="142" label="Countries Represented" />
        <STAT value="28,400+" label="Verified Profiles" />
      </div>

      {/* Partnership tiers */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Partnership Tiers</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 32 }}>Each tier reflects depth of integration and mutual commitment.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {TIERS.map(t => (
            <div key={t.name} style={{ padding: "28px 28px", borderRadius: 16, border: `1.5px solid ${t.color}33`, background: `${t.color}08` }}>
              <div style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: t.color, marginBottom: 14, padding: "4px 12px", borderRadius: 100, background: `${t.color}18` }}>{t.name}</div>
              <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* University Partners */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>University Partners</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 32 }}>Institutions that have formally integrated MERYT into student career services and talent recognition programmes.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {UNIVERSITY_PARTNERS.map(u => (
            <div key={u.name} style={{ padding: "24px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ fontSize: 32, lineHeight: 1 }}>{u.logo}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{u.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginBottom: 10 }}>{u.location}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 8px", borderRadius: 100, background: u.tier === "Founding" ? "#F5A20018" : u.tier === "Premier" ? "#1A56FF18" : "#00BE6A18", color: u.tier === "Founding" ? "#F5A200" : u.tier === "Premier" ? "#1A56FF" : "#00BE6A" }}>{u.tier}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 8px", borderRadius: 100, background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}>Since {u.since}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "3px 8px", borderRadius: 100, background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}>{u.students} students</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Partners */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Corporate Partners</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 32 }}>Companies that actively recruit from the MERYT talent pool or sponsor leaderboard categories.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {CORPORATE_PARTNERS.map(c => (
            <div key={c.name} style={{ padding: "24px 28px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)", display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ fontSize: 36, lineHeight: 1 }}>{c.logo}</div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{c.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--accent)", marginBottom: 8 }}>{c.sector}</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, color: "var(--muted)" }}>{c.perk}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Become a partner CTA */}
      <section style={{ textAlign: "center", padding: "56px 40px", borderRadius: 24, border: "1.5px solid var(--accent)33", background: "var(--accent)08" }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: "var(--text)", marginBottom: 12, letterSpacing: "-0.5px" }}>Become a Partner</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, color: "var(--muted)", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Whether you&apos;re a university, research lab, or company, we&apos;d love to discuss how MERYT can power your talent recognition. Partnership proposals are reviewed within 5 business days.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/contact" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", background: "var(--accent)", padding: "14px 32px", borderRadius: 100, textDecoration: "none", letterSpacing: "-0.2px" }}>Apply for Partnership</a>
          <a href="/api-docs" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15, color: "var(--text)", background: "var(--surface)", padding: "14px 32px", borderRadius: 100, textDecoration: "none", border: "1.5px solid var(--border)", letterSpacing: "-0.2px" }}>View API Docs</a>
        </div>
      </section>
    </main>
  );
}
