import { SkeletonRow } from "@/src/components/ui/SkeletonRow";

export default function Loading() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <div className="skeleton" style={{ height: 44, width: "45%", borderRadius: 10, marginBottom: 18 }} />
      <div className="skeleton" style={{ height: 52, borderRadius: 100, marginBottom: 22 }} />
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 36, width: 80, borderRadius: 100 }} />
        ))}
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
