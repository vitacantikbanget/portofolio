"use client";

import { motion } from "framer-motion";

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
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
      <motion.div
        className="absolute rounded-full"
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
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ====== BLOB 2 — kanan bawah ====== */}
      <motion.div
        className="absolute rounded-full"
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
        animate={{
          x: [0, -50, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ====== GRID KECIL — bergeser diagonal ====== */}
      <motion.div
        className="absolute"
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
        animate={{
          x: [0, 60, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* ====== GRID BESAR — bergeser kebalikan ====== */}
      <motion.div
        className="absolute"
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
        animate={{
          x: [0, -100, 0],
          y: [0, -100, 0],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}