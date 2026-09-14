"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlobalBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 15% 10%, var(--accent-soft) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 85% 90%, var(--lavender) 0%, transparent 55%)",
          opacity: 0.4,
        }}
      />

      {/* BLOB 1 — tetap ada, animasi pelan */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "30vw",
          height: "30vw",
          maxWidth: "460px",
          maxHeight: "460px",
          top: "-5%",
          left: "-8%",
          background: "var(--accent)",
          opacity: 0.14,
          filter: isMobile ? "blur(50px)" : "blur(80px)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* BLOB 2 — tetap ada */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "28vw",
          height: "28vw",
          maxWidth: "440px",
          maxHeight: "440px",
          bottom: "-5%",
          right: "-8%",
          background: "var(--mauve)",
          opacity: 0.13,
          filter: isMobile ? "blur(50px)" : "blur(80px)",
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid tipis — desktop only */}
      {!isMobile && (
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
      )}

      {/* Plus signs — desktop only, 3 buah */}
      {!isMobile &&
        [
          { top: "15%", left: "25%" },
          { top: "70%", left: "60%" },
          { top: "25%", left: "82%" },
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

      {/* Partikel — 4 buah (sebelumnya 10) */}
      {[
        { top: "18%", left: "12%", size: 6, dur: 6, delay: 0 },
        { top: "65%", left: "22%", size: 4, dur: 8, delay: 1 },
        { top: "30%", left: "78%", size: 5, dur: 7, delay: 0.5 },
        { top: "75%", left: "70%", size: 4, dur: 9, delay: 1.5 },
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

      {/* Glow dot — 2 buah (sebelumnya 3) */}
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
    </div>
  );
}