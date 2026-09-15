"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

// ====== ROBOT SVG ======
function Robot() {
  return (
    <svg
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Antena */}
      <line
        x1="150"
        y1="30"
        x2="150"
        y2="65"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <motion.circle
        cx="150"
        cy="25"
        r="9"
        fill="var(--accent)"
        animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Kepala */}
      <rect
        x="85"
        y="65"
        width="130"
        height="95"
        rx="22"
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth="3"
      />

      {/* Telinga kiri */}
      <rect
        x="75"
        y="95"
        width="15"
        height="30"
        rx="4"
        fill="var(--accent-soft)"
        stroke="var(--accent)"
        strokeWidth="2"
      />
      {/* Telinga kanan */}
      <rect
        x="210"
        y="95"
        width="15"
        height="30"
        rx="4"
        fill="var(--accent-soft)"
        stroke="var(--accent)"
        strokeWidth="2"
      />

      {/* Mata berkedip */}
      <motion.g
        animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          times: [0, 0.4, 0.45, 0.5, 1],
        }}
        style={{ transformOrigin: "150px 110px" }}
      >
        <circle cx="120" cy="110" r="16" fill="var(--accent)" />
        <circle cx="120" cy="110" r="7" fill="var(--bg)" />
        <circle cx="180" cy="110" r="16" fill="var(--accent)" />
        <circle cx="180" cy="110" r="7" fill="var(--bg)" />
      </motion.g>

      {/* Mulut */}
      <path
        d="M 125 138 Q 150 152 175 138"
        stroke="var(--text)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Pipi */}
      <circle cx="105" cy="130" r="6" fill="var(--accent-soft)" opacity="0.8" />
      <circle cx="195" cy="130" r="6" fill="var(--accent-soft)" opacity="0.8" />

      {/* Leher */}
      <rect x="138" y="158" width="24" height="18" fill="var(--border)" rx="3" />

      {/* Badan */}
      <rect
        x="75"
        y="175"
        width="150"
        height="110"
        rx="18"
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth="3"
      />

      {/* Panel badan */}
      <rect
        x="110"
        y="200"
        width="80"
        height="60"
        rx="10"
        fill="var(--accent-soft)"
        stroke="var(--accent)"
        strokeWidth="2"
      />

      {/* Tombol-tombol */}
      <motion.circle
        cx="130"
        cy="220"
        r="5"
        fill="var(--accent)"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.circle
        cx="150"
        cy="220"
        r="5"
        fill="var(--mauve)"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle
        cx="170"
        cy="220"
        r="5"
        fill="var(--lavender)"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
      />

      {/* Garis di panel */}
      <line
        x1="120"
        y1="245"
        x2="180"
        y2="245"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Lengan kiri */}
      <motion.g
        animate={{ rotate: [0, -8, 0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "62px 195px" }}
      >
        <rect
          x="45"
          y="185"
          width="28"
          height="80"
          rx="14"
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeWidth="3"
        />
        <circle cx="59" cy="275" r="16" fill="var(--accent)" />
        <circle cx="59" cy="275" r="8" fill="var(--accent-soft)" />
      </motion.g>

      {/* Lengan kanan */}
      <motion.g
        animate={{ rotate: [0, 8, 0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "238px 195px" }}
      >
        <rect
          x="227"
          y="185"
          width="28"
          height="80"
          rx="14"
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeWidth="3"
        />
        <circle cx="241" cy="275" r="16" fill="var(--accent)" />
        <circle cx="241" cy="275" r="8" fill="var(--accent-soft)" />
      </motion.g>

      {/* Kaki kiri */}
      <rect
        x="100"
        y="278"
        width="35"
        height="18"
        rx="7"
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth="3"
      />
      <rect x="105" y="290" width="25" height="10" rx="5" fill="var(--accent)" />

      {/* Kaki kanan */}
      <rect
        x="165"
        y="278"
        width="35"
        height="18"
        rx="7"
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth="3"
      />
      <rect x="170" y="290" width="25" height="10" rx="5" fill="var(--accent)" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <main className="h-screen w-screen relative flex items-center justify-center overflow-hidden px-4">
      {/* ====== BACKGROUND DECOR ====== */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "40vw",
          height: "40vw",
          maxWidth: "520px",
          maxHeight: "520px",
          top: "-15%",
          left: "-12%",
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
          maxWidth: "480px",
          maxHeight: "480px",
          bottom: "-15%",
          right: "-12%",
          background: "var(--lavender)",
          opacity: 0.18,
          filter: "blur(100px)",
        }}
      />

      {/* Floating shapes */}
      <motion.div
        className="absolute pointer-events-none hidden lg:block"
        style={{ top: "12%", left: "8%" }}
        animate={{ y: [0, -12, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="var(--accent)"
          opacity="0.5"
        >
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute pointer-events-none hidden lg:block"
        style={{ bottom: "15%", left: "12%" }}
        animate={{ y: [0, -15, 0], scale: [1, 1.15, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="var(--mauve)"
          opacity="0.5"
        >
          <path d="M12 21s-7-4.5-9-9c-1.5-3.5 1-7 4.5-7 1.8 0 3.4 1 4.5 2.6C13.1 6 14.7 5 16.5 5 20 5 22.5 8.5 21 12c-2 4.5-9 9-9 9z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute pointer-events-none hidden lg:block"
        style={{ top: "18%", right: "10%" }}
        animate={{ y: [0, -10, 0], rotate: [0, -20, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="var(--accent)"
          opacity="0.5"
        >
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
        </svg>
      </motion.div>

      {/* ====== CONTENT ====== */}
      <div className="container-custom relative w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-center">
          {/* ============ KIRI — TEXT ============ */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* ====== ERROR 404 — DIGEDEIN ====== */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border text-lg sm:text-xl lg:text-2xl tracking-[0.15em] uppercase mb-4 lg:mb-6 font-medium"
              style={{
                borderColor: "var(--accent)",
                background: "var(--surface)",
                color: "var(--accent)",
              }}
            >
              <motion.span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "var(--accent)" }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Error 404
            </motion.div>

            {/* ====== JUDUL ====== */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-medium leading-[0.95] mb-3 lg:mb-5"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--text)",
              }}
            >
              Oops!
              <br />
              <span className="italic" style={{ color: "var(--accent)" }}>
                Halamannya
              </span>
              <br />
              hilang.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-xs sm:text-sm leading-relaxed mb-4 lg:mb-6 max-w-xs mx-auto lg:mx-0"
              style={{ color: "var(--text-muted)" }}
            >
              Tenang, gak apa-apa. Halaman yang kamu cari mungkin salah ketik.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-transform hover:scale-[1.05]"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                }}
              >
                <Home size={13} />
                Beranda
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-medium transition-transform hover:scale-[1.05]"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                  color: "var(--text)",
                }}
              >
                <Search size={13} />
                Projects
              </Link>
            </motion.div>
          </div>

          {/* ============ KANAN — VISUAL ============ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative flex items-center justify-center order-1 lg:order-2"
          >
            <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] lg:w-[340px] lg:h-[340px] mx-auto">
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "var(--accent)",
                  opacity: 0.25,
                  filter: "blur(60px)",
                  transform: "scale(0.85)",
                }}
              />

              {/* Lingkaran dashed muter */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "0",
                  border: "1px dashed var(--accent)",
                  opacity: 0.5,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "6px",
                    height: "6px",
                    top: "-3px",
                    left: "50%",
                    background: "var(--accent)",
                    boxShadow: "0 0 10px var(--accent)",
                    transform: "translateX(-50%)",
                  }}
                />
              </motion.div>

              {/* Lingkaran solid muter kebalikan */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "12%",
                  border: "1px solid var(--mauve)",
                  opacity: 0.35,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "5px",
                    height: "5px",
                    bottom: "-2.5px",
                    left: "50%",
                    background: "var(--mauve)",
                    boxShadow: "0 0 10px var(--mauve)",
                    transform: "translateX(-50%)",
                  }}
                />
              </motion.div>

              {/* Robot goyang */}
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-[75%] h-[75%]">
                  <Robot />
                </div>
              </motion.div>

              {/* Gear kiri atas */}
              <motion.div
                className="absolute pointer-events-none"
                style={{ top: "5%", left: "0%" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg width="20" height="20" viewBox="0 0 30 30">
                  <circle
                    cx="15"
                    cy="15"
                    r="9"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeDasharray="5 3"
                  />
                  <circle cx="15" cy="15" r="3" fill="var(--accent)" />
                </svg>
              </motion.div>

              {/* Gear kanan bawah */}
              <motion.div
                className="absolute pointer-events-none"
                style={{ bottom: "5%", right: "0%" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <svg width="16" height="16" viewBox="0 0 30 30">
                  <circle
                    cx="15"
                    cy="15"
                    r="9"
                    fill="none"
                    stroke="var(--mauve)"
                    strokeWidth="2"
                    strokeDasharray="5 3"
                  />
                  <circle cx="15" cy="15" r="3" fill="var(--mauve)" />
                </svg>
              </motion.div>

              {/* Sparkle kiri bawah */}
              <motion.div
                className="absolute pointer-events-none"
                style={{ bottom: "18%", left: "-4%" }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z"
                    fill="var(--accent)"
                  />
                </svg>
              </motion.div>

              {/* Sparkle kanan atas */}
              <motion.div
                className="absolute pointer-events-none"
                style={{ top: "18%", right: "-4%" }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <path
                    d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z"
                    fill="var(--mauve)"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}