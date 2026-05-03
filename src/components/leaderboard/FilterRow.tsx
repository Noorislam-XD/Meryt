"use client";

interface FilterRowProps {
  timeframe: string;
  onTimeframeChange: (t: string) => void;
  search: string;
  onSearchChange: (s: string) => void;
}

const TIMEFRAMES = [
  { id: "all", label: "All Time" },
  { id: "month", label: "This Month" },
  { id: "week", label: "This Week" },
];

export function FilterRow({ timeframe, onTimeframeChange, search, onSearchChange }: FilterRowProps) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 20 }}>
      {TIMEFRAMES.map((t) => (
        <button
          key={t.id}
          onClick={() => onTimeframeChange(t.id)}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.05em",
            padding: "6px 14px",
            borderRadius: 100,
            border: `1.5px solid ${timeframe === t.id ? "var(--text)" : "var(--border)"}`,
            background: timeframe === t.id ? "var(--text)" : "transparent",
            color: timeframe === t.id ? "white" : "var(--muted)",
            cursor: "pointer",
            transition: "all 0.18s cubic-bezier(.34,1.3,.64,1)",
          }}
        >
          {t.label}
        </button>
      ))}
      <input
        type="text"
        placeholder="Search by name, university..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          flex: 1,
          minWidth: 160,
          maxWidth: 280,
          padding: "7px 14px",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 13,
          border: "1.5px solid var(--border)",
          borderRadius: 100,
          background: "var(--surface)",
          color: "var(--text)",
          outline: "none",
        }}
      />
    </div>
  );
}
