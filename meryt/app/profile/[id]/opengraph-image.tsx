import { ImageResponse } from "next/og";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const contestant = LEADERBOARD_DATA.find(c => c.id === params.id);

  if (!contestant) {
    return new ImageResponse(
      <div style={{ background: "#0F0E0B", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: "rgba(255,255,255,0.2)", display: "flex" }}>Profile Not Found</div>
      </div>,
      { ...size }
    );
  }

  const changeColor = contestant.scoreChange > 0 ? "#00BE6A" : "#FF4500";
  const changeSign = contestant.scoreChange > 0 ? "+" : "";

  return new ImageResponse(
    (
      <div style={{ background: "#0F0E0B", width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: 80, position: "relative", overflow: "hidden", fontFamily: "sans-serif" }}>
        {/* Ghost rank */}
        <div style={{ position: "absolute", right: -30, top: -30, fontSize: 320, fontWeight: 900, color: "rgba(255,255,255,0.03)", lineHeight: 1, display: "flex" }}>
          #{contestant.rank}
        </div>

        {/* Top badges */}
        <div style={{ display: "flex", gap: 10, marginBottom: 48 }}>
          <div style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", fontSize: 14, fontFamily: "monospace", letterSpacing: "0.08em", display: "flex" }}>
            #{contestant.rank} GLOBAL
          </div>
          <div style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(0,190,106,0.15)", color: "#00D97E", fontSize: 14, fontFamily: "monospace", letterSpacing: "0.08em", display: "flex" }}>
            ✓ VERIFIED
          </div>
          <div style={{ padding: "6px 14px", borderRadius: 8, background: `${changeColor}22`, color: changeColor, fontSize: 14, fontFamily: "monospace", letterSpacing: "0.08em", display: "flex" }}>
            {changeSign}{contestant.scoreChange} THIS WEEK
          </div>
        </div>

        {/* Name */}
        <div style={{ fontSize: 84, fontWeight: 900, color: "white", letterSpacing: "-5px", lineHeight: 0.92, display: "flex", marginBottom: 20 }}>
          {contestant.name}
        </div>

        {/* Handle + org */}
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.38)", fontFamily: "monospace", marginBottom: 48, display: "flex", gap: 16 }}>
          <span style={{ display: "flex" }}>{contestant.handle}</span>
          <span style={{ display: "flex", opacity: 0.4 }}>·</span>
          <span style={{ display: "flex" }}>{contestant.flag} {contestant.university}</span>
        </div>

        {/* Score + pillars row */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 48 }}>
          <div>
            <div style={{ fontSize: 96, fontWeight: 900, color: "#FF4500", letterSpacing: "-6px", lineHeight: 1, display: "flex" }}>
              {contestant.niScore.toLocaleString()}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 16, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginTop: 8, display: "flex" }}>
              NI SCORE
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", maxWidth: 500, marginBottom: 8 }}>
            {contestant.tags.slice(0, 3).map((tag: string) => (
              <div key={tag} style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontSize: 16, fontFamily: "monospace", display: "flex" }}>
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* MERYT brand */}
        <div style={{ position: "absolute", bottom: 60, right: 80, display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 32, fontWeight: 900, color: "white", letterSpacing: "-1px", display: "flex" }}>MERY</span>
          <span style={{ fontSize: 32, fontWeight: 900, color: "#FF4500", display: "flex" }}>T</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
