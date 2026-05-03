import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press — MERYT",
  description: "Press resources, media coverage, and brand assets for MERYT — the global verified talent ranking platform.",
};

const COVERAGE = [
  { outlet: "TechCrunch", headline: "\"MERYT wants to replace the resume with proof-of-work\"", date: "Jan 2025", url: "#", logo: "📰" },
  { outlet: "Wired", headline: "\"The NI Score is the credit score for talent\"", date: "Dec 2024", url: "#", logo: "📱" },
  { outlet: "MIT Technology Review", headline: "\"Can algorithms replace university rankings?\"", date: "Nov 2024", url: "#", logo: "🔬" },
  { outlet: "The Economist", headline: "\"A new way to spot global talent early\"", date: "Oct 2024", url: "#", logo: "📊" },
  { outlet: "Financial Times", headline: "\"Recruiters turn to verified talent graphs\"", date: "Sep 2024", url: "#", logo: "💼" },
  { outlet: "Nature News", headline: "\"Researcher rankings come under scrutiny\"", date: "Aug 2024", url: "#", logo: "🌿" },
];

const STATS = [
  { value: "28,400+", label: "Verified Profiles" },
  { value: "142", label: "Countries" },
  { value: "12", label: "University Partners" },
  { value: "99.1%", label: "Verification Accuracy" },
];

const TEAM = [
  { name: "MERYT Communications", email: "press@meryt.app", role: "Press Enquiries" },
  { name: "Partnerships Team", email: "partners@meryt.app", role: "Partnership & Sponsorship" },
  { name: "Research Team", email: "research@meryt.app", role: "Data & Methodology Questions" },
];

export default function PressPage() {
  return (
    <main style={{ maxWidth: 1040, margin: "0 auto", padding: "64px 24px 96px" }}>
      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20, padding: "5px 14px", borderRadius: 100, border: "1px solid var(--accent)33" }}>
          Press & Media
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", margin: "0 0 20px", lineHeight: 1.05 }}>
          Press Room
        </h1>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, color: "var(--muted)", maxWidth: 600, lineHeight: 1.7, margin: "0 0 32px" }}>
          Resources, assets, and contacts for journalists, researchers, and media professionals covering MERYT.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="mailto:press@meryt.app" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", background: "var(--accent)", padding: "12px 24px", borderRadius: 100, textDecoration: "none" }}>Contact Press Team</a>
          <a href="#brand-assets" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text)", background: "var(--surface)", padding: "12px 24px", borderRadius: 100, textDecoration: "none", border: "1.5px solid var(--border)" }}>Download Brand Assets</a>
        </div>
      </div>

      {/* Key stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 72, padding: "32px", borderRadius: 20, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
        {STATS.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-1px", color: "var(--text)" }}>{s.value}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Boilerplate */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text)", marginBottom: 16 }}>About MERYT</h2>
        <div style={{ padding: "24px 28px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)", position: "relative" }}>
          <div style={{ position: "absolute", top: 16, right: 16 }}>
            <button style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, padding: "5px 12px", borderRadius: 100, border: "1px solid var(--border)", background: "var(--bg)", color: "var(--muted)", cursor: "pointer", letterSpacing: "0.06em" }}>COPY</button>
          </div>
          <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--text)", lineHeight: 1.75, margin: 0 }}>
            MERYT is a global verified talent ranking platform powered by the NI Score — a proof-of-work identity graph for students, researchers, engineers, creators, and professionals. Unlike social media metrics or follower counts, the NI Score quantifies verifiable human achievement across five pillars: Academic, Research, Code, Creator, and Social Impact. MERYT currently hosts 28,400 verified profiles across 142 countries, partnering with leading universities including MIT, IIT Bombay, ETH Zürich, and Stanford. The platform explicitly operates on merit-based proof-of-work principles and is not a social credit scoring system.
          </p>
        </div>
      </section>

      {/* Media coverage */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>In the Press</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 28 }}>Selected coverage from global media outlets.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {COVERAGE.map(c => (
            <a key={c.headline} href={c.url} style={{ textDecoration: "none", display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 24px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <span style={{ fontSize: 28, lineHeight: 1.2 }}>{c.logo}</span>
              <div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--accent)", marginBottom: 5, letterSpacing: "0.06em" }}>{c.outlet} · {c.date}</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--text)", lineHeight: 1.5, fontStyle: "italic" }}>{c.headline}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Brand assets */}
      <section id="brand-assets" style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Brand Assets</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 28 }}>Download official MERYT logos, screenshots, and brand guidelines. Please follow our brand guidelines when using these assets.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { name: "Logo Pack (SVG + PNG)", size: "2.4 MB", icon: "🎨" },
            { name: "Brand Guidelines (PDF)", size: "1.1 MB", icon: "📋" },
            { name: "Product Screenshots", size: "8.7 MB", icon: "🖼" },
            { name: "OG Image Template", size: "0.8 MB", icon: "🖼" },
            { name: "Press Release Archive", size: "0.3 MB", icon: "📄" },
            { name: "Executive Headshots", size: "5.2 MB", icon: "👤" },
          ].map(a => (
            <div key={a.name} style={{ padding: "20px", borderRadius: 14, border: "1.5px solid var(--border)", background: "var(--surface)", display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 28 }}>{a.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, fontWeight: 500, color: "var(--text)", marginBottom: 3 }}>{a.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{a.size}</div>
              </div>
              <button style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--accent)", background: "none", border: "1px solid var(--accent)44", borderRadius: 100, padding: "5px 12px", cursor: "pointer" }}>↓</button>
            </div>
          ))}
        </div>
      </section>

      {/* Press contacts */}
      <section style={{ marginBottom: 72 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Press Contacts</h2>
        <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, color: "var(--muted)", marginBottom: 28 }}>We respond to all media enquiries within one business day.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {TEAM.map(t => (
            <div key={t.email} style={{ padding: "24px", borderRadius: 16, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginBottom: 12 }}>{t.role}</div>
              <a href={`mailto:${t.email}`} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--accent)", textDecoration: "none" }}>{t.email}</a>
            </div>
          ))}
        </div>
      </section>

      {/* Brand colour palette */}
      <section>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "var(--text)", marginBottom: 28 }}>Brand Colours</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { name: "MERYT Orange", hex: "#FF4500", role: "Primary Accent" },
            { name: "MERYT Blue", hex: "#1A56FF", role: "Academic Pillar" },
            { name: "MERYT Green", hex: "#00BE6A", role: "Research / Growth" },
            { name: "MERYT Purple", hex: "#9333EA", role: "Code Pillar" },
            { name: "Gold", hex: "#F5A200", role: "Creator / Award" },
            { name: "Off-Black", hex: "#0F0E0B", role: "Dark Background" },
            { name: "Parchment", hex: "#F4F2ED", role: "Light Background" },
          ].map(c => (
            <div key={c.hex} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 16px", borderRadius: 12, border: "1.5px solid var(--border)", background: "var(--surface)" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: c.hex, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{c.name}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>{c.hex} · {c.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
