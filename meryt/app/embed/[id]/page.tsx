import type { Metadata } from "next";
import { LEADERBOARD_DATA } from "@/src/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = LEADERBOARD_DATA.find(c => c.id === id);
  return {
    title: c ? `${c.name} — NI Score ${c.niScore.toLocaleString()}` : "Rank Card",
    description: c ? `${c.name} · #${c.rank} Global · ${c.niScore.toLocaleString()} NI Score · Verified on MERYT` : "MERYT Rank Card",
  };
}

export default async function EmbedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = LEADERBOARD_DATA.find(c => c.id === id);

  if (!c) {
    return (
      <html>
        <body style={{ margin: 0, background: "#18160F", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "monospace", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
          Profile not found
        </body>
      </html>
    );
  }

  const changeColor = c.scoreChange > 0 ? "#00BE6A" : c.scoreChange < 0 ? "#FF4500" : "#8A8074";
  const changeSign = c.scoreChange > 0 ? "+" : "";

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'DM Mono', monospace; background: #18160F; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 16px; }
          .card { background: linear-gradient(135deg,#18160F 0%,#2D2A22 100%); border-radius: 20px; padding: 26px 24px; width: 100%; max-width: 380px; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); }
          .ghost { position: absolute; right: 10px; top: 4px; font-family: 'Syne', sans-serif; font-size: 100px; font-weight: 800; color: rgba(255,255,255,0.04); line-height: 1; letter-spacing: -6px; user-select: none; }
          .row { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
          .avi { width: 50px; height: 50px; border-radius: 14px; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; font-size: 24px; border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0; }
          .name { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: white; letter-spacing: -0.5px; }
          .sub { font-size: 11px; color: rgba(255,255,255,0.38); margin-top: 3px; }
          .scores { display: flex; align-items: flex-end; gap: 20px; margin-bottom: 16px; }
          .ni { font-family: 'Syne', sans-serif; font-size: 40px; font-weight: 800; color: #FF4500; letter-spacing: -2px; line-height: 1; }
          .ni-label { font-size: 9px; color: rgba(255,255,255,0.3); letter-spacing: 0.08em; margin-top: 4px; }
          .rank { font-size: 22px; font-weight: 600; color: rgba(255,255,255,0.4); font-family: 'DM Mono', monospace; margin-left: auto; }
          .badges { display: flex; gap: 6px; flex-wrap: wrap; }
          .badge { font-size: 9px; padding: 3px 9px; border-radius: 5px; letter-spacing: 0.05em; }
          a.link { display: block; text-align: center; margin-top: 12px; font-size: 10px; color: rgba(255,255,255,0.2); text-decoration: none; letter-spacing: 0.06em; }
          a.link:hover { color: rgba(255,255,255,0.4); }
        `}</style>
      </head>
      <body>
        <div>
          <div className="card">
            <div className="ghost">#{c.rank}</div>
            <div className="row">
              <div className="avi">{c.avatar}</div>
              <div>
                <div className="name">{c.name}</div>
                <div className="sub">{c.handle} · {c.flag} {c.university}</div>
              </div>
            </div>
            <div className="scores">
              <div>
                <div className="ni">{c.niScore.toLocaleString()}</div>
                <div className="ni-label">NI SCORE</div>
              </div>
              <div className="rank">#{c.rank}</div>
            </div>
            <div className="badges">
              <span className="badge" style={{ background: "rgba(0,190,106,0.15)", color: "#00D97E" }}>✓ VERIFIED</span>
              <span className="badge" style={{ background: `${changeColor}22`, color: changeColor }}>{changeSign}{c.scoreChange} THIS WEEK</span>
              {c.tags.slice(0, 1).map((tag: string) => (
                <span key={tag} className="badge" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}>{tag}</span>
              ))}
            </div>
          </div>
          <a href={`https://meryt.app/profile/${c.id}`} target="_blank" rel="noopener noreferrer" className="link">
            VIEW FULL PROFILE ON MERYT
          </a>
        </div>
      </body>
    </html>
  );
}
