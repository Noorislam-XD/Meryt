"use client";

import { TICKER_ITEMS } from "@/src/lib/data";

export function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      style={{
        background: "var(--text)",
        color: "white",
        overflow: "hidden",
        height: 34,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          animation: "tickroll 40s linear infinite",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
        className="hover:[animation-play-state:paused]"
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.05em",
              padding: "0 44px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                background: "var(--accent)",
                borderRadius: "50%",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {item.text}
            <span style={{ color: "var(--accent3)", marginLeft: 4 }}>{item.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
