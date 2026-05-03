"use client";

import { useEffect, useState } from "react";
import { Contestant } from "@/src/types";

interface ProfileModalProps {
  contestant: Contestant | null;
  onClose: () => void;
}

export function ProfileModal({ contestant, onClose }: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (contestant) setActiveTab("overview");
  }, [contestant]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!contestant) return null;

  const TABS = ["overview", "scores", "achievements", "socials"];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,9,6,0.55)",
        backdropFilter: "blur(14px) saturate(1.4)",
        WebkitBackdropFilter: "blur(14px) saturate(1.4)",
        zIndex: 400,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 0,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--surface)",
          borderRadius: "28px 28px 0 0",
          width: "100%",
          maxWidth: 620,
          maxHeight: "92vh",
          overflowY: "auto",
          border: "1.5px solid var(--border)",
          borderBottom: "none",
          transform: "translateY(0)",
          paddingBottom: 40,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ width: 40, height: 4, borderRadius: 100, background: "var(--border)", margin: "14px auto 0" }} />

        <div style={{ padding: "18px 24px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "var(--text)",
                color: "white",
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                padding: "4px 10px",
                borderRadius: 6,
                marginBottom: 10,
                letterSpacing: "0.06em",
              }}
            >
              #{contestant.rank} · {contestant.rankPercentile}
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 3, color: "var(--text)" }}>
              {contestant.name}
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--muted)" }}>
              {contestant.handle} · {contestant.flag} {contestant.country} · {contestant.university}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1.5px solid var(--border)",
              background: "var(--bg)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "16px 24px 0" }}>
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 18 }}>
            {contestant.bio}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 20 }}>
            {[
              { val: contestant.niScore.toLocaleString(), key: "NI Score" },
              { val: `#${contestant.rank}`, key: "Global Rank" },
              { val: contestant.followers.toLocaleString(), key: "Followers" },
            ].map((s) => (
              <div
                key={s.key}
                style={{
                  background: "var(--bg)",
                  borderRadius: 14,
                  padding: "14px 12px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.8px", color: "var(--text)" }}>
                  {s.val}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 2 }}>
                  {s.key}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 4, background: "white", border: "1.5px solid var(--border)", borderRadius: 14, padding: 4, marginBottom: 24 }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  padding: "9px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: activeTab === tab ? "var(--text)" : "transparent",
                  color: activeTab === tab ? "white" : "var(--muted)",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.22s cubic-bezier(.34,1.3,.64,1)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, marginBottom: 10, color: "var(--text)" }}>Skills</div>
              {contestant.skills.map((skill) => (
                <div key={skill.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", width: 90, textTransform: "uppercase", letterSpacing: "0.05em", flexShrink: 0 }}>
                    {skill.label}
                  </div>
                  <div style={{ flex: 1, height: 7, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 4, background: skill.color, width: `${skill.value}%` }} />
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, width: 28, textAlign: "right", color: "var(--text)" }}>{skill.value}</div>
                </div>
              ))}

              <div
                style={{
                  marginTop: 20,
                  background: "linear-gradient(135deg,#F0F4FF 0%,#F5F0FF 100%)",
                  border: "1.5px solid #D0DAFF",
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 8,
                      background: "linear-gradient(135deg,#1A56FF,#9333EA)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      color: "white",
                    }}
                  >
                    ✦
                  </div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#5B6AF0", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    AI INSIGHT
                  </span>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "#2D3A8C" }}>
                  {contestant.name} is in the <strong>top {contestant.rankPercentile}</strong> globally. Their strongest pillar is{" "}
                  <strong>{contestant.pillars.sort((a, b) => b.score - a.score)[0]?.name}</strong> at {contestant.pillars.sort((a, b) => b.score - a.score)[0]?.score}/100.
                  Joined {contestant.joinedDate} · trajectory is consistently upward.
                </p>
              </div>
            </div>
          )}

          {activeTab === "scores" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {contestant.pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  style={{
                    background: "white",
                    border: "1.5px solid var(--border)",
                    borderRadius: 16,
                    padding: "18px 20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, background: "var(--bg)" }}>
                        {pillar.icon}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{pillar.name}</div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginTop: 1 }}>{pillar.description}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: -1, color: pillar.color }}>
                        {pillar.score}
                      </div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", marginTop: 2 }}>
                        weight {pillar.weight}
                      </div>
                    </div>
                  </div>
                  <div style={{ height: 8, background: "var(--bg)", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 100, background: pillar.color, width: `${pillar.score}%` }} />
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                    {pillar.items.map((item) => (
                      <span
                        key={item}
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 10,
                          padding: "3px 9px",
                          borderRadius: 6,
                          background: "var(--bg)",
                          border: "1px solid var(--border)",
                          color: "var(--muted)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "achievements" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {contestant.achievements.map((ach) => (
                <div
                  key={ach.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "11px 14px",
                    background: "var(--bg)",
                    borderRadius: 11,
                    border: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: 20 }}>{ach.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, flex: 1, lineHeight: 1.3, color: "var(--text)" }}>{ach.title}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)", flexShrink: 0 }}>{ach.date}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "socials" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {contestant.socials.map((s) => (
                <div
                  key={s.platform}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 14px",
                    borderRadius: 10,
                    border: "1.5px solid var(--border)",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    background: "var(--bg)",
                    color: "var(--text)",
                  }}
                >
                  <strong>{s.platform}</strong>
                  <span style={{ color: "var(--muted)" }}>{s.handle}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
