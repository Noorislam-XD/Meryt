export default function ProfileLoading() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header skeleton */}
      <div style={{ height: 52, borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", padding: "0 24px", gap: 16 }}>
        <div className="skeleton" style={{ height: 22, width: 80, borderRadius: 6 }} />
        <div style={{ flex: 1 }} />
        <div className="skeleton" style={{ height: 32, width: 88, borderRadius: 100 }} />
        <div className="skeleton" style={{ height: 32, width: 88, borderRadius: 100 }} />
      </div>

      {/* Hero banner skeleton */}
      <div className="skeleton" style={{ height: 180, width: "100%", borderRadius: 0 }} />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 80px" }}>
        {/* Profile card skeleton */}
        <div style={{ marginTop: -60, display: "flex", gap: 24, alignItems: "flex-end", marginBottom: 40 }}>
          <div className="skeleton" style={{ width: 120, height: 120, borderRadius: "50%", flexShrink: 0 }} />
          <div style={{ flex: 1, paddingBottom: 8 }}>
            <div className="skeleton" style={{ height: 32, width: 240, borderRadius: 8, marginBottom: 10 }} />
            <div className="skeleton" style={{ height: 16, width: 160, borderRadius: 6, marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 14, width: 300, borderRadius: 6 }} />
          </div>
        </div>

        {/* Stats row skeleton */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 80, borderRadius: 14 }} />
          ))}
        </div>

        {/* Pillars skeleton */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 32 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 110, borderRadius: 14 }} />
          ))}
        </div>

        {/* Content blocks skeleton */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
          <div className="skeleton" style={{ height: 240, borderRadius: 16 }} />
          <div className="skeleton" style={{ height: 240, borderRadius: 16 }} />
        </div>
      </div>
    </div>
  );
}
