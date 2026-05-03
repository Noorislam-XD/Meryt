import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — MERYT",
  description: "MERYT Terms of Service — rules for using the platform, NI Score, and API.",
};

const SECTIONS = [
  { title: "1. Acceptance", body: "By creating a MERYT account or using the platform, you agree to these Terms. If you don't agree, don't use the platform. We may update these Terms; continued use constitutes acceptance of changes." },
  { title: "2. Eligibility", body: "You must be 13 years or older to use MERYT. If you are under 18, you represent that a parent or guardian has reviewed and agrees to these Terms on your behalf." },
  { title: "3. Accurate Information", body: "You agree to submit only truthful, verifiable credentials. Submitting fabricated, plagiarized, or misrepresented evidence will result in immediate account suspension and removal from the leaderboard. MERYT reserves the right to re-verify any submission at any time." },
  { title: "4. The NI Score", body: "Your NI Score is calculated based on verified evidence. MERYT makes no guarantee of a specific score or rank. Scores change as new evidence is submitted, old evidence ages, and the platform's verification standards evolve. A high NI Score is not a guarantee of employability, admissions, or any other outcome." },
  { title: "5. Prohibited Uses", body: "You may not: create fake accounts, submit forged credentials, reverse-engineer the scoring algorithm, scrape the platform without API access, use the platform to harass other users, impersonate other individuals or institutions, or attempt to manipulate rankings through coordinated artificial activity." },
  { title: "6. API Usage", body: "API access (Pro and Elite plans) is subject to rate limits stated in the API docs. You may not resell, redistribute, or cache API responses for longer than 24 hours without written permission. Abusing the API will result in key revocation without refund." },
  { title: "7. Intellectual Property", body: "Your profile content and submitted credentials remain yours. By submitting them, you grant MERYT a limited license to display, index, and distribute your public profile data (name, handle, NI Score, rank) via the leaderboard, API, and embed cards." },
  { title: "8. Termination", body: "You may delete your account at any time via Settings → Danger Zone. MERYT may suspend or terminate accounts for Terms violations. On termination, your profile is removed from the leaderboard; your score history may be retained in anonymized form for research purposes." },
  { title: "9. Disclaimers", body: "MERYT is provided 'as is' without warranty. We do not guarantee uptime, score accuracy, or leaderboard availability. The NI Score is a platform metric — it is not an official academic credential, not a legal document, and not recognized by any government body." },
  { title: "10. Governing Law", body: "These Terms are governed by the laws of the State of Delaware, USA. Disputes shall be resolved through binding arbitration, except for intellectual property claims. Both parties waive the right to a jury trial and class action." },
];

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(244,242,237,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }} className="dark:[background:rgba(15,14,11,0.88)]">
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", textDecoration: "none" }}>MERY<span style={{ color: "var(--accent)" }}>T</span></Link>
        <div style={{ display: "flex", gap: 16 }}>
          <Link href="/privacy" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>Privacy</Link>
          <Link href="/" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", textDecoration: "none" }}>← Back</Link>
        </div>
      </header>
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--muted)", marginBottom: 14, textTransform: "uppercase" }}>Legal</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", marginBottom: 10, lineHeight: 1.05 }}>Terms of Service</h1>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", marginBottom: 48 }}>Last updated: May 1, 2025</div>
        {SECTIONS.map((s, i) => (
          <div key={s.title} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < SECTIONS.length - 1 ? "1px solid var(--border)" : "none" }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 800, color: "var(--text)", marginBottom: 10 }}>{s.title}</h2>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{s.body}</p>
          </div>
        ))}
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/privacy" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "8px 16px", border: "1.5px solid var(--border)", borderRadius: 9, color: "var(--muted)", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/contact" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "8px 16px", border: "1.5px solid var(--border)", borderRadius: 9, color: "var(--muted)", textDecoration: "none" }}>Contact Us</Link>
        </div>
      </main>
    </div>
  );
}
