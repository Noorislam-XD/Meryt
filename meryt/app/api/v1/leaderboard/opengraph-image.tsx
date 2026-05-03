import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MERYT API v1";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function APIDocsOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0F0E0B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -60, right: -60, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #1A56FF12, transparent)", display: "flex" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 48 }}>
          <span style={{ fontSize: 28, fontWeight: 900, color: "white", letterSpacing: "-1px", display: "flex" }}>MERY</span>
          <span style={{ fontSize: 28, fontWeight: 900, color: "#FF4500", display: "flex" }}>T</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginLeft: 14, display: "flex", fontFamily: "monospace", letterSpacing: "0.1em" }}>API v1</span>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "monospace", fontSize: 14, color: "#00BE6A", marginBottom: 18, display: "flex", letterSpacing: "0.06em" }}>GET /api/v1/leaderboard</div>
          <div style={{ fontSize: 58, fontWeight: 900, letterSpacing: "-3px", color: "white", lineHeight: 1.0, display: "flex", flexDirection: "column", marginBottom: 24 }}>
            The World&apos;s Talent Graph
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 15, color: "rgba(255,255,255,0.35)", display: "flex" }}>
            REST · Edge Runtime · CORS-enabled · Free tier 1,000 req/day
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["/leaderboard", "/profile/:id", "/search", "/rankings", "/compare", "/countries"].map(ep => (
            <div key={ep} style={{ display: "flex", padding: "8px 14px", borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.45)", display: "flex" }}>{ep}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
