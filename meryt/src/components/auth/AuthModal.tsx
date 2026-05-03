"use client";

import { useState } from "react";
import { useAuth } from "./AuthContext";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: "signin" | "signup";
}

export function AuthModal({ open, onClose, defaultTab = "signin" }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">(defaultTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (tab === "signin") {
        await signIn(email, password);
      } else {
        if (!name.trim()) { setError("Name is required"); setLoading(false); return; }
        await signUp(name, email, password);
      }
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: 14,
    border: "1.5px solid var(--border)",
    borderRadius: 12,
    background: "var(--bg)",
    color: "var(--text)",
    outline: "none",
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        background: "rgba(10,9,6,0.6)",
        backdropFilter: "blur(18px) saturate(1.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--surface)",
          border: "1.5px solid var(--border)",
          borderRadius: 28,
          width: "100%", maxWidth: 420,
          padding: "36px 32px",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", marginBottom: 6 }}>
            MERY<span style={{ color: "var(--accent)" }}>T</span>
          </div>
          <p style={{ fontSize: 14, color: "var(--muted)" }}>
            {tab === "signin" ? "Welcome back. Sign in to your account." : "Create your verified talent profile."}
          </p>
        </div>

        <div style={{ display: "flex", gap: 4, background: "var(--bg)", borderRadius: 14, padding: 4, marginBottom: 24 }}>
          {(["signin", "signup"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, fontFamily: "'DM Mono', monospace", fontSize: 11,
              letterSpacing: "0.04em", padding: "9px 12px", borderRadius: 10,
              border: "none", background: tab === t ? "var(--text)" : "transparent",
              color: tab === t ? "white" : "var(--muted)", cursor: "pointer",
              transition: "all 0.2s",
            }}>
              {t === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tab === "signup" && (
            <input
              style={inputStyle} type="text" placeholder="Full name"
              value={name} onChange={e => setName(e.target.value)} required
            />
          )}
          <input
            style={inputStyle} type="email" placeholder="Email address"
            value={email} onChange={e => setEmail(e.target.value)} required
          />
          <input
            style={inputStyle} type="password" placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)} required
          />
          {error && <p style={{ fontSize: 13, color: "var(--accent)", textAlign: "center" }}>{error}</p>}
          <button
            type="submit" disabled={loading}
            style={{
              marginTop: 4, padding: "14px", borderRadius: 14, border: "none",
              background: loading ? "var(--muted)" : "var(--accent)",
              color: "white", fontFamily: "'Syne', sans-serif",
              fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 4px 20px rgba(255,69,0,0.35)",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Please wait..." : tab === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div style={{ marginTop: 20, textAlign: "center" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "var(--muted)" }}>OR CONTINUE WITH</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["GitHub", "Google", "LinkedIn"].map(p => (
              <button key={p} onClick={() => signIn(`user@${p.toLowerCase()}.com`, "demo")}
                style={{
                  flex: 1, padding: "10px 8px", borderRadius: 10,
                  border: "1.5px solid var(--border)", background: "var(--bg)",
                  fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--text)",
                  cursor: "pointer",
                }}>
                {p === "GitHub" ? "⌨️" : p === "Google" ? "G" : "in"} {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
