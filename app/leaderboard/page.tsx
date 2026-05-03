"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/src/components/layout/Header";
import { CategoryChips } from "@/src/components/leaderboard/CategoryChips";
import { FilterRow } from "@/src/components/leaderboard/FilterRow";
import { LeaderboardRow } from "@/src/components/leaderboard/LeaderboardRow";
import { ProfileModal } from "@/src/components/profile/ProfileModal";
import { Footer } from "@/src/components/layout/Footer";
import { LEADERBOARD_DATA } from "@/src/lib/data";
import { Contestant, Category } from "@/src/types";

const REGIONS = ["Global", "Americas", "Europe", "Asia", "Africa", "Oceania"];

export default function LeaderboardPage() {
  const [selectedContestant, setSelectedContestant] = useState<Contestant | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [timeframe, setTimeframe] = useState("all");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("Global");
  const [sortBy, setSortBy] = useState<"score" | "change" | "rank">("score");
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = useMemo(() => {
    let data = LEADERBOARD_DATA.filter((c) => {
      const matchCat = activeCategory === "all" || c.categories.includes(activeCategory);
      const matchSearch = search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.university.toLowerCase().includes(search.toLowerCase()) ||
        c.handle.toLowerCase().includes(search.toLowerCase()) ||
        c.country.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sortBy === "change") data = [...data].sort((a, b) => Math.abs(b.scoreChange) - Math.abs(a.scoreChange));
    if (sortBy === "rank") data = [...data].sort((a, b) => a.rank - b.rank);
    return data;
  }, [activeCategory, search, sortBy]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />

      <main style={{ maxWidth: 1060, margin: "0 auto", padding: "40px 20px 80px" }}>
        {/* Page header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1.5px solid var(--border)", padding: "6px 14px", borderRadius: 100, marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent3)", display: "inline-block", animation: "livepulse 2s infinite" }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.07em", color: "var(--muted)" }}>LIVE RANKINGS</span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,58px)", fontWeight: 800, letterSpacing: "-2px", color: "var(--text)", marginBottom: 10, lineHeight: 1.05 }}>
            Global Leaderboard
          </h1>
          <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 500, lineHeight: 1.6 }}>
            {filtered.length} verified profiles across 142 countries, ranked by NI Score.
          </p>
        </div>

        {/* Region tabs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
          {REGIONS.map(r => (
            <button key={r} onClick={() => setRegion(r)} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.06em", padding: "6px 13px", borderRadius: 100, border: `1.5px solid ${region === r ? "var(--text)" : "var(--border)"}`, background: region === r ? "var(--text)" : "transparent", color: region === r ? "white" : "var(--muted)", cursor: "pointer", transition: "all 0.18s" }}>{r}</button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>Sort:</span>
            {[{ id: "score", label: "Score" }, { id: "change", label: "Movers" }, { id: "rank", label: "Rank" }].map(s => (
              <button key={s.id} onClick={() => setSortBy(s.id as "score" | "change" | "rank")} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "5px 11px", borderRadius: 100, border: `1.5px solid ${sortBy === s.id ? "var(--text)" : "var(--border)"}`, background: sortBy === s.id ? "var(--text)" : "transparent", color: sortBy === s.id ? "white" : "var(--muted)", cursor: "pointer" }}>{s.label}</button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <CategoryChips active={activeCategory} onChange={(cat) => { setActiveCategory(cat); setPage(1); }} />
        <FilterRow timeframe={timeframe} onTimeframeChange={setTimeframe} search={search} onSearchChange={(s) => { setSearch(s); setPage(1); }} />

        {/* Table headers */}
        <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 110px 130px 130px 90px", padding: "7px 16px", gap: 12, marginBottom: 6 }}>
          {["#", "Talent", "NI Score", "Skills", "Tags", "Δ Week"].map((h) => (
            <div key={h} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--muted)" }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {paginated.map((c, i) => (
          <LeaderboardRow key={c.id} contestant={c} onClick={() => setSelectedContestant(c)} index={i} />
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
            No results for &ldquo;{search}&rdquo;
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button onClick={() => setPage(p => p + 1)} style={{ padding: "12px 32px", background: "var(--surface)", color: "var(--muted)", border: "1.5px solid var(--border)", borderRadius: 12, fontFamily: "'DM Mono', monospace", fontSize: 12, cursor: "pointer", transition: "all 0.18s" }}>
              Load more ({filtered.length - paginated.length} remaining)
            </button>
          </div>
        )}

        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 52 }}>
          {[
            { icon: "🌐", value: "28,400", label: "Total Profiles" },
            { icon: "🏆", value: "142", label: "Countries" },
            { icon: "✓", value: "99.1%", label: "Verification Rate" },
            { icon: "🔥", value: "1,284", label: "Updates Today" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 16, padding: "16px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 7 }}>{stat.icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)" }}>{stat.value}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <Footer />
      </main>

      <ProfileModal contestant={selectedContestant} onClose={() => setSelectedContestant(null)} />
    </div>
  );
}
