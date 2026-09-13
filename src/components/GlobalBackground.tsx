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
            "radial-gradient(ellipse 60% 50% at 15% 10%, var(--accent-soft) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 85% 90%, var(--lavender) 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 50% 50%, var(--accent-soft) 0%, transparent 70%)",
          opacity: 0.4,
        }}
      />

      {/* ====== BLOB 1 — kiri atas ====== */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "30vw",
          height: "30vw",
          minWidth: "280px",
          minHeight: "280px",
          maxWidth: "460px",
          maxHeight: "460px",
          top: "-5%",
          left: "-8%",
          background: "var(--accent)",
          opacity: 0.14,
          filter: "blur(90px)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ====== BLOB 2 — kanan bawah ====== */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "28vw",
          height: "28vw",
          minWidth: "260px",
          minHeight: "260px",
          maxWidth: "440px",
          maxHeight: "440px",
          bottom: "-5%",
          right: "-8%",
          background: "var(--mauve)",
          opacity: 0.13,
          filter: "blur(90px)",
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ====== BLOB 3 — tengah ====== */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "22vw",
          height: "22vw",
          minWidth: "200px",
          minHeight: "200px",
          maxWidth: "340px",
          maxHeight: "340px",
          top: "40%",
          left: "40%",
          background: "var(--lavender)",
          opacity: 0.1,
          filter: "blur(90px)",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ====== BLOB 4 — kanan atas ====== */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "24vw",
          height: "24vw",
          minWidth: "220px",
          minHeight: "220px",
          maxWidth: "360px",
          maxHeight: "360px",
          top: "20%",
          right: "-10%",
          background: "var(--accent)",
          opacity: 0.1,
          filter: "blur(90px)",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ====== BLOB 5 — kiri bawah ====== */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "22vw",
          height: "22vw",
          minWidth: "200px",
          minHeight: "200px",
          maxWidth: "340px",
          maxHeight: "340px",
          bottom: "20%",
          left: "-8%",
          background: "var(--mauve)",
          opacity: 0.11,
          filter: "blur(90px)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ====== GRID TIPIS ====== */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at center, black 15%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at center, black 15%, transparent 75%)",
          opacity: 0.22,
        }}
      />

      {/* ====== NOISE / GRAIN ====== */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          opacity: 0.05,
        }}
      />

      {/* ====== PLUS / CROSS SIGN (4×) ====== */}
      {[
        { top: "15%", left: "25%" },
        { top: "70%", left: "60%" },
        { top: "25%", left: "82%" },
        { top: "60%", left: "8%" },
      ].map((p, i) => (
        <motion.div
          key={`plus-${i}`}
          className="absolute"
          style={{ top: p.top, left: p.left, opacity: 0.35 }}
          animate={{ rotate: [0, 90, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "14px",
              height: "14px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: "1px",
                background: "var(--accent)",
                transform: "translateY(-50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "1px",
                background: "var(--accent)",
                transform: "translateX(-50%)",
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* ====== PARTIKEL KECIL (10×) ====== */}
      {[
        { top: "18%", left: "12%", size: 6, dur: 6, delay: 0 },
        { top: "65%", left: "22%", size: 4, dur: 8, delay: 1 },
        { top: "30%", left: "78%", size: 5, dur: 7, delay: 0.5 },
        { top: "75%", left: "70%", size: 4, dur: 9, delay: 1.5 },
        { top: "50%", left: "50%", size: 3, dur: 10, delay: 2 },
        { top: "12%", left: "55%", size: 5, dur: 7, delay: 0.8 },
        { top: "85%", left: "35%", size: 4, dur: 8, delay: 2.2 },
        { top: "40%", left: "18%", size: 3, dur: 9, delay: 1.8 },
        { top: "55%", left: "88%", size: 5, dur: 6, delay: 0.3 },
        { top: "22%", left: "42%", size: 3, dur: 11, delay: 2.5 },
      ].map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "var(--accent)",
            opacity: 0.4,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* ====== GARIS VERTIKAL BERGERAK ====== */}
      <motion.div
        className="absolute"
        style={{
          top: 0,
          bottom: 0,
          right: "20%",
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent, var(--accent), transparent)",
          opacity: 0.2,
        }}
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ====== GARIS HORIZONTAL BERGERAK ====== */}
      <motion.div
        className="absolute"
        style={{
          left: 0,
          right: 0,
          bottom: "22%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, var(--mauve), transparent)",
          opacity: 0.18,
        }}
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ====== KOTAK KECIL BERPINDAH (2×) ====== */}
      <motion.div
        className="absolute"
        style={{
          top: "45%",
          left: "5%",
          width: "12px",
          height: "12px",
          border: "1px solid var(--accent)",
          opacity: 0.35,
        }}
        animate={{
          rotate: [0, 90, 180, 270, 360],
          y: [0, -15, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute"
        style={{
          bottom: "15%",
          right: "30%",
          width: "10px",
          height: "10px",
          border: "1px solid var(--mauve)",
          opacity: 0.35,
        }}
        animate={{
          rotate: [360, 270, 180, 90, 0],
          y: [0, 12, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ====== TITIK GLOW BERDENYUT (3×) ====== */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: "80%",
          left: "45%",
          width: "10px",
          height: "10px",
          background: "var(--accent)",
          opacity: 0.5,
          boxShadow: "0 0 20px var(--accent)",
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          top: "20%",
          left: "25%",
          width: "8px",
          height: "8px",
          background: "var(--mauve)",
          opacity: 0.5,
          boxShadow: "0 0 20px var(--mauve)",
        }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          top: "60%",
          left: "75%",
          width: "6px",
          height: "6px",
          background: "var(--lavender)",
          opacity: 0.5,
          boxShadow: "0 0 20px var(--lavender)",
        }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* ====== GARIS DIAGONAL (2×) ====== */}
      <motion.div
        className="absolute"
        style={{
          top: "30%",
          left: "10%",
          width: "120px",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, var(--accent), transparent)",
          transformOrigin: "left center",
          transform: "rotate(-30deg)",
          opacity: 0.25,
        }}
        animate={{ rotate: [-30, -25, -30], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute"
        style={{
          bottom: "25%",
          right: "15%",
          width: "100px",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, var(--mauve), transparent)",
          transformOrigin: "right center",
          transform: "rotate(35deg)",
          opacity: 0.25,
        }}
        animate={{ rotate: [35, 30, 35], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}