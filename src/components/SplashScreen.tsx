"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<"line" | "text" | "reveal">("line");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 500);
    const t2 = setTimeout(() => setPhase("reveal"), 1800);
    const t3 = setTimeout(() => setShow(false), 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ background: "var(--bg)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* ====== GLOW TENGAH ====== */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "60vw",
              height: "60vw",
              maxWidth: "600px",
              maxHeight: "600px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "var(--accent)",
              opacity: 0.12,
              filter: "blur(80px)",
            }}
          />

          {/* ====== GARIS ATAS ====== */}
          <motion.div
            className="absolute left-0 right-0"
            style={{
              top: "50%",
              height: "1px",
              background: "var(--accent)",
              transformOrigin: "center",
            }}
            initial={{ scaleX: 0, y: 0 }}
            animate={{
              scaleX: 1,
              y: phase === "reveal" ? "-50vh" : 0,
            }}
            transition={{
              scaleX: { duration: 0.6, ease: "easeOut" },
              y: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: phase === "reveal" ? 0 : 0.6,
              },
            }}
          />

          {/* ====== GARIS BAWAH ====== */}
          <motion.div
            className="absolute left-0 right-0"
            style={{
              top: "50%",
              height: "1px",
              background: "var(--accent)",
              transformOrigin: "center",
            }}
            initial={{ scaleX: 0, y: 0 }}
            animate={{
              scaleX: 1,
              y: phase === "reveal" ? "50vh" : 0,
            }}
            transition={{
              scaleX: { duration: 0.6, ease: "easeOut" },
              y: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: phase === "reveal" ? 0 : 0.6,
              },
            }}
          />

          {/* ====== TITIK-TITIK DI SEPANJANG GARIS ====== */}
          {phase !== "reveal" && (
            <>
              {/* Titik di garis atas */}
              {[10, 25, 50, 75, 90].map((left, i) => (
                <motion.div
                  key={`dot-top-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    top: "50%",
                    left: `${left}%`,
                    width: "4px",
                    height: "4px",
                    marginTop: "-2px",
                    background: "var(--accent)",
                    transform: "translateX(-50%)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: phase === "text" ? [0.3, 1, 0.3] : 0,
                    scale: phase === "text" ? [1, 1.4, 1] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Titik di garis bawah */}
              {[15, 40, 60, 85].map((left, i) => (
                <motion.div
                  key={`dot-bottom-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    top: "50%",
                    left: `${left}%`,
                    width: "3px",
                    height: "3px",
                    marginTop: "-1.5px",
                    background: "var(--mauve)",
                    transform: "translateX(-50%)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: phase === "text" ? [0.3, 1, 0.3] : 0,
                    scale: phase === "text" ? [1, 1.4, 1] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2 + 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </>
          )}

          {/* ====== LABEL "LOADING" ATAS ====== */}
          <motion.div
            className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: phase === "text" ? 1 : 0,
              y: phase === "text" ? 0 : -10,
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
            />
            <span
              className="text-[9px] tracking-[0.4em] uppercase font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              Loading
            </span>
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
            />
          </motion.div>

          {/* ====== NOMOR 01 — POJOK KIRI BAWAH ====== */}
          <motion.div
            className="absolute bottom-10 left-10 lg:bottom-12 lg:left-16"
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: phase === "text" ? 0.6 : 0,
              x: phase === "text" ? 0 : -20,
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              className="text-3xl sm:text-4xl font-medium leading-none italic"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--accent)",
              }}
            >
              01
            </div>
            <div
              className="text-[8px] tracking-[0.3em] uppercase mt-2"
              style={{ color: "var(--text-muted)" }}
            >
              Splash
            </div>
          </motion.div>

          {/* ====== NOMOR 02 — POJOK KANAN BAWAH ====== */}
          <motion.div
            className="absolute bottom-10 right-10 lg:bottom-12 lg:right-16 text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: phase === "text" ? 0.6 : 0,
              x: phase === "text" ? 0 : 20,
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              className="text-3xl sm:text-4xl font-medium leading-none italic"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--accent)",
              }}
            >
              02
            </div>
            <div
              className="text-[8px] tracking-[0.3em] uppercase mt-2"
              style={{ color: "var(--text-muted)" }}
            >
              2026
            </div>
          </motion.div>

          {/* ====== TEKS DI TENGAH ====== */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            animate={{
              opacity: phase === "reveal" ? 0 : 1,
              scale: phase === "reveal" ? 1.1 : 1,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Label kecil atas */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: phase === "text" || phase === "reveal" ? 1 : 0,
                y: 0,
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[10px] tracking-[0.5em] uppercase mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              Portfolio
            </motion.p>

            {/* Nama */}
            <motion.h1
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{
                opacity: phase === "text" || phase === "reveal" ? 1 : 0,
                filter:
                  phase === "text" || phase === "reveal"
                    ? "blur(0px)"
                    : "blur(8px)",
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium text-center leading-tight"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--text)",
              }}
            >
              Desvita <span style={{ color: "var(--accent)" }}>Putri</span>
              <br />
              <span className="italic" style={{ color: "var(--text-muted)" }}>
                Wulandari
              </span>
            </motion.h1>

            {/* Garis dekoratif kecil */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: phase === "text" || phase === "reveal" ? 0.6 : 0,
                scaleX: phase === "text" || phase === "reveal" ? 1 : 0,
              }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 flex items-center gap-2"
            >
              <span
                style={{
                  width: "20px",
                  height: "1px",
                  background: "var(--border)",
                }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <span
                style={{
                  width: "20px",
                  height: "1px",
                  background: "var(--border)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* ====== SUDUT VIEWFINDER (4 sudut) ====== */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "24px",
              left: "24px",
              width: "20px",
              height: "20px",
              borderTop: "1.5px solid var(--accent)",
              borderLeft: "1.5px solid var(--accent)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "text" ? 0.6 : 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "24px",
              right: "24px",
              width: "20px",
              height: "20px",
              borderTop: "1.5px solid var(--accent)",
              borderRight: "1.5px solid var(--accent)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "text" ? 0.6 : 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.div
            className="absolute pointer-events-none"
            style={{
              bottom: "24px",
              left: "24px",
              width: "20px",
              height: "20px",
              borderBottom: "1.5px solid var(--accent)",
              borderLeft: "1.5px solid var(--accent)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "text" ? 0.6 : 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.div
            className="absolute pointer-events-none"
            style={{
              bottom: "24px",
              right: "24px",
              width: "20px",
              height: "20px",
              borderBottom: "1.5px solid var(--accent)",
              borderRight: "1.5px solid var(--accent)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "text" ? 0.6 : 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}