// Server component — semua animasi loop dijalankan CSS keyframes
// (globals.css: .gb-blob-*, .gb-grid-*), bukan JS. Beban digeser ke
// compositor/GPU, dan bisa dipause saat tab inactive / offscreen.

export default function GlobalBackground() {
  return (
    <div
      data-anim
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* ====== BASE GRADIENT ====== */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 10%, var(--accent-soft) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 85% 90%, var(--lavender) 0%, transparent 55%)",
          opacity: 0.4,
        }}
      />

      {/* ====== BLOB 1 — kiri atas ====== */}
      <div
        className="absolute rounded-full gb-blob-1"
        style={{
          width: "35vw",
          height: "35vw",
          maxWidth: "500px",
          maxHeight: "500px",
          top: "-10%",
          left: "-10%",
          background: "var(--accent)",
          opacity: 0.14,
          filter: "blur(70px)",
          willChange: "transform",
        }}
      />

      {/* ====== BLOB 2 — kanan bawah ====== */}
      <div
        className="absolute rounded-full gb-blob-2"
        style={{
          width: "32vw",
          height: "32vw",
          maxWidth: "460px",
          maxHeight: "460px",
          bottom: "-10%",
          right: "-10%",
          background: "var(--mauve)",
          opacity: 0.12,
          filter: "blur(70px)",
          willChange: "transform",
        }}
      />

      {/* ====== GRID KECIL — bergeser diagonal ====== */}
      <div
        className="absolute gb-grid-1"
        style={{
          inset: "-100px",
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at center, black 10%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at center, black 10%, transparent 75%)",
          opacity: 0.18,
          willChange: "transform",
        }}
      />

      {/* ====== GRID BESAR — bergeser kebalikan ====== */}
      <div
        className="absolute gb-grid-2"
        style={{
          inset: "-100px",
          backgroundImage:
            "linear-gradient(var(--mauve) 1px, transparent 1px), linear-gradient(90deg, var(--mauve) 1px, transparent 1px)",
          backgroundSize: "200px 200px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at center, black 5%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at center, black 5%, transparent 80%)",
          opacity: 0.12,
          willChange: "transform",
        }}
      />
    </div>
  );
}
