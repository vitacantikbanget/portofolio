"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden px-6">
      {/* ====== DECORATIVE BLOBS ====== */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "40vw",
          height: "40vw",
          maxWidth: "520px",
          maxHeight: "520px",
          top: "-10%",
          left: "-10%",
          background: "var(--accent)",
          opacity: 0.18,
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "36vw",
          height: "36vw",
          maxWidth: "460px",
          maxHeight: "460px",
          bottom: "-10%",
          right: "-10%",
          background: "var(--lavender)",
          opacity: 0.18,
          filter: "blur(100px)",
        }}
      />

      {/* ====== FLOATING SHAPES ====== */}
      {/* Bintang kiri atas */}
      <motion.div
        className="absolute pointer-events-none hidden sm:block"
        style={{ top: "15%", left: "12%" }}
        animate={{ y: [0, -12, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent)" opacity="0.5">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
        </svg>
      </motion.div>

      {/* Hati kiri bawah */}
      <motion.div
        className="absolute pointer-events-none hidden sm:block"
        style={{ top: "70%", left: "18%" }}
        animate={{ y: [0, -15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--mauve)" opacity="0.5">
          <path d="M12 21s-7-4.5-9-9c-1.5-3.5 1-7 4.5-7 1.8 0 3.4 1 4.5 2.6C13.1 6 14.7 5 16.5 5 20 5 22.5 8.5 21 12c-2 4.5-9 9-9 9z" />
        </svg>
      </motion.div>

      {/* Bintang kanan atas */}
      <motion.div
        className="absolute pointer-events-none hidden sm:block"
        style={{ top: "25%", right: "15%" }}
        animate={{ y: [0, -10, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)" opacity="0.5">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
        </svg>
      </motion.div>

      {/* Titik-titik */}
      {[
        { top: "60%", right: "22%", size: 6, dur: 4 },
        { top: "80%", right: "40%", size: 4, dur: 5 },
        { top: "40%", left: "8%", size: 5, dur: 6 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "var(--accent)",
            opacity: 0.5,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}

      {/* ====== CONTENT ====== */}
      <div className="relative max-w-lg w-full text-center">
        {/* ====== EMOJI HOUSES — playful ====== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto mb-8 flex items-center justify-center gap-3"
        >
          <motion.span
            className="text-5xl sm:text-6xl"
            animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🏠
          </motion.span>
          <motion.span
            className="text-5xl sm:text-6xl"
            animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            🧭
          </motion.span>
          <motion.span
            className="text-5xl sm:text-6xl"
            animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            ✨
          </motion.span>
        </motion.div>

        {/* 404 kecil */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          Oops · 404
        </motion.p>

        {/* Judul — friendly */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-3xl sm:text-4xl lg:text-5xl leading-[1.15] font-medium mb-5"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--text)",
          }}
        >
          Sepertinya kamu
          <br />
          <span className="italic" style={{ color: "var(--accent)" }}>
            nyasar ke sini.
          </span>
        </motion.h1>

        {/* Deskripsi — friendly */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm leading-relaxed mb-10 max-w-sm mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          Halamannya nggak ketemu — mungkin salah ketik atau memang belum dibuat.
          Yuk balik lagi ke tempat yang bener.
        </motion.p>

        {/* ====== BUTTONS ====== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.05]"
            style={{
              background: "var(--accent)",
              color: "#fff",
            }}
          >
            <Home size={15} />
            Balik ke Beranda
          </Link>

          <Link
            href="/projects"
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-transform hover:scale-[1.05]"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          >
            Lihat Projects
            <ArrowLeft
              size={15}
              className="rotate-180 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}