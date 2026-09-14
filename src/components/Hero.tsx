"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import TypingText from "./hero/TypingText";

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="container-custom w-full pt-32 pb-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ================= FOTO ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-[160px] sm:w-[220px] lg:w-[320px]">
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "var(--accent)",
                  opacity: 0.2,
                  filter: "blur(50px)",
                  transform: "scale(0.9)",
                }}
              />

              {/* ====== FOTO ====== */}
              <motion.div
                style={{
                  x: isDesktop ? mouse.x * 8 : 0,
                  y: isDesktop ? mouse.y * 8 : 0,
                }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }}
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/profile.jpeg"
                  alt="Desvita Putri Wulandari"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 220px, 320px"
                />
              </motion.div>

              {/* ================= GARIS PENGHUBUNG (static) ================= */}
              {/* Sisi atas */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "-6px",
                  left: "10%",
                  right: "10%",
                  height: "1px",
                  background: "var(--border)",
                  opacity: 0.4,
                }}
              />
              {/* Sisi bawah */}
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: "-6px",
                  left: "10%",
                  right: "10%",
                  height: "1px",
                  background: "var(--border)",
                  opacity: 0.4,
                }}
              />
              {/* Sisi kiri */}
              <div
                className="absolute pointer-events-none"
                style={{
                  left: "-6px",
                  top: "10%",
                  bottom: "10%",
                  width: "1px",
                  background: "var(--border)",
                  opacity: 0.4,
                }}
              />
              {/* Sisi kanan */}
              <div
                className="absolute pointer-events-none"
                style={{
                  right: "-6px",
                  top: "10%",
                  bottom: "10%",
                  width: "1px",
                  background: "var(--border)",
                  opacity: 0.4,
                }}
              />

              {/* ================= RUNNING LIGHT (smooth) ================= */}
              {/* Konsep: 4 sisi × 3 potongan = 12 potongan
                  bergantian muncul dengan easing smooth */}

              {/* === SISI ATAS === */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  top: "-6px",
                  left: "10%",
                  width: "20%",
                  height: "2px",
                  background: "var(--accent)",
                  borderRadius: "2px",
                  filter: "drop-shadow(0 0 4px var(--accent))",
                  willChange: "opacity",
                }}
                animate={{ opacity: [0, 1, 1, 0, 0, 0, 0, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
                }}
              />
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  top: "-6px",
                  left: "40%",
                  width: "20%",
                  height: "2px",
                  background: "var(--accent)",
                  borderRadius: "2px",
                  filter: "drop-shadow(0 0 4px var(--accent))",
                  willChange: "opacity",
                }}
                animate={{ opacity: [0, 0, 0, 1, 1, 0, 0, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
                }}
              />
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  top: "-6px",
                  right: "10%",
                  width: "20%",
                  height: "2px",
                  background: "var(--accent)",
                  borderRadius: "2px",
                  filter: "drop-shadow(0 0 4px var(--accent))",
                  willChange: "opacity",
                }}
                animate={{ opacity: [0, 0, 0, 0, 0, 1, 1, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
                }}
              />

              {/* === SISI KANAN === */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  right: "-6px",
                  top: "10%",
                  width: "2px",
                  height: "20%",
                  background: "var(--accent)",
                  borderRadius: "2px",
                  filter: "drop-shadow(0 0 4px var(--accent))",
                  willChange: "opacity",
                }}
                animate={{ opacity: [0, 0, 0, 1, 1, 0, 0, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
                }}
              />
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  right: "-6px",
                  top: "40%",
                  width: "2px",
                  height: "20%",
                  background: "var(--accent)",
                  borderRadius: "2px",
                  filter: "drop-shadow(0 0 4px var(--accent))",
                  willChange: "opacity",
                }}
                animate={{ opacity: [0, 0, 0, 0, 0, 1, 1, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
                }}
              />
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  right: "-6px",
                  bottom: "10%",
                  width: "2px",
                  height: "20%",
                  background: "var(--accent)",
                  borderRadius: "2px",
                  filter: "drop-shadow(0 0 4px var(--accent))",
                  willChange: "opacity",
                }}
                animate={{ opacity: [0, 0, 0, 0, 0, 0, 0, 1] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
                }}
              />

              {/* === SISI BAWAH === */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  bottom: "-6px",
                  right: "10%",
                  width: "20%",
                  height: "2px",
                  background: "var(--mauve)",
                  borderRadius: "2px",
                  filter: "drop-shadow(0 0 4px var(--mauve))",
                  willChange: "opacity",
                }}
                animate={{ opacity: [0, 0, 0, 0, 0, 1, 1, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
                }}
              />
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  bottom: "-6px",
                  left: "40%",
                  width: "20%",
                  height: "2px",
                  background: "var(--mauve)",
                  borderRadius: "2px",
                  filter: "drop-shadow(0 0 4px var(--mauve))",
                  willChange: "opacity",
                }}
                animate={{ opacity: [0, 0, 0, 0, 0, 0, 0, 1] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
                }}
              />
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  bottom: "-6px",
                  left: "10%",
                  width: "20%",
                  height: "2px",
                  background: "var(--mauve)",
                  borderRadius: "2px",
                  filter: "drop-shadow(0 0 4px var(--mauve))",
                  willChange: "opacity",
                }}
                animate={{ opacity: [0, 0, 0, 0, 0, 0, 1, 1] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
                }}
              />

              {/* === SISI KIRI === */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  left: "-6px",
                  bottom: "10%",
                  width: "2px",
                  height: "20%",
                  background: "var(--mauve)",
                  borderRadius: "2px",
                  filter: "drop-shadow(0 0 4px var(--mauve))",
                  willChange: "opacity",
                }}
                animate={{ opacity: [0, 0, 1, 1, 0, 0, 0, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
                }}
              />
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  left: "-6px",
                  top: "40%",
                  width: "2px",
                  height: "20%",
                  background: "var(--mauve)",
                  borderRadius: "2px",
                  filter: "drop-shadow(0 0 4px var(--mauve))",
                  willChange: "opacity",
                }}
                animate={{ opacity: [1, 1, 0, 0, 0, 0, 0, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
                }}
              />
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  left: "-6px",
                  top: "10%",
                  width: "2px",
                  height: "20%",
                  background: "var(--mauve)",
                  borderRadius: "2px",
                  filter: "drop-shadow(0 0 4px var(--mauve))",
                  willChange: "opacity",
                }}
                animate={{ opacity: [0, 0, 0, 0, 1, 1, 0, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                  times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875],
                }}
              />

              {/* ================= GARIS DIAGONAL DALAM SUDUT ================= */}
              {/* Kiri atas */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "2px",
                  left: "2px",
                  width: "12px",
                  height: "12px",
                  borderTop: "1px solid var(--accent)",
                  borderLeft: "1px solid var(--accent)",
                  opacity: 0.6,
                }}
              />
              {/* Kanan atas */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "2px",
                  right: "2px",
                  width: "12px",
                  height: "12px",
                  borderTop: "1px solid var(--accent)",
                  borderRight: "1px solid var(--accent)",
                  opacity: 0.6,
                }}
              />
              {/* Kiri bawah */}
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: "2px",
                  left: "2px",
                  width: "12px",
                  height: "12px",
                  borderBottom: "1px solid var(--mauve)",
                  borderLeft: "1px solid var(--mauve)",
                  opacity: 0.6,
                }}
              />
              {/* Kanan bawah */}
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: "2px",
                  right: "2px",
                  width: "12px",
                  height: "12px",
                  borderBottom: "1px solid var(--mauve)",
                  borderRight: "1px solid var(--mauve)",
                  opacity: 0.6,
                }}
              />

              {/* ================= DIAMOND DI 4 SUDUT ================= */}
              {/* Kiri atas */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  top: "-6px",
                  left: "-6px",
                  width: "8px",
                  height: "8px",
                  background: "var(--accent)",
                  transform: "rotate(45deg)",
                  boxShadow: "0 0 10px var(--accent)",
                  willChange: "opacity",
                }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Kanan atas */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  top: "-6px",
                  right: "-6px",
                  width: "8px",
                  height: "8px",
                  background: "var(--accent)",
                  transform: "rotate(45deg)",
                  boxShadow: "0 0 10px var(--accent)",
                  willChange: "opacity",
                }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              />
              {/* Kiri bawah */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  bottom: "-6px",
                  left: "-6px",
                  width: "8px",
                  height: "8px",
                  background: "var(--mauve)",
                  transform: "rotate(45deg)",
                  boxShadow: "0 0 10px var(--mauve)",
                  willChange: "opacity",
                }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
              />
              {/* Kanan bawah */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  bottom: "-6px",
                  right: "-6px",
                  width: "8px",
                  height: "8px",
                  background: "var(--mauve)",
                  transform: "rotate(45deg)",
                  boxShadow: "0 0 10px var(--mauve)",
                  willChange: "opacity",
                }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.8,
                }}
              />

              {/* ================= TITIK KECIL DI SETIAP SUDUT ================= */}
              <div
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: "10px",
                  left: "10px",
                  width: "3px",
                  height: "3px",
                  background: "var(--accent)",
                  opacity: 0.7,
                }}
              />
              <div
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: "10px",
                  right: "10px",
                  width: "3px",
                  height: "3px",
                  background: "var(--accent)",
                  opacity: 0.7,
                }}
              />
              <div
                className="absolute pointer-events-none rounded-full"
                style={{
                  bottom: "10px",
                  left: "10px",
                  width: "3px",
                  height: "3px",
                  background: "var(--mauve)",
                  opacity: 0.7,
                }}
              />
              <div
                className="absolute pointer-events-none rounded-full"
                style={{
                  bottom: "10px",
                  right: "10px",
                  width: "3px",
                  height: "3px",
                  background: "var(--mauve)",
                  opacity: 0.7,
                }}
              />
            </div>
          </motion.div>

          {/* ================= PEMISAH (mobile) ================= */}
          <div className="lg:hidden flex items-center justify-center gap-3">
            <span
              className="w-16 h-[1px]"
              style={{ background: "var(--border)" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="w-16 h-[1px]"
              style={{ background: "var(--border)" }}
            />
          </div>

          {/* ================= TEXT ================= */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] tracking-[0.18em] uppercase"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                color: "var(--text-muted)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              Available for work
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] font-medium"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Desvita
              <br />
              <span style={{ color: "var(--accent)" }}>Putri</span>{" "}
              <span className="italic" style={{ color: "var(--text-muted)" }}>
                Wulandari
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 text-base sm:text-lg lg:text-xl font-light min-h-[1.8em]"
              style={{ color: "var(--text-muted)" }}
            >
              I'm a <TypingText />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-5 max-w-lg mx-auto lg:mx-0 text-sm sm:text-[15px] leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Saya adalah pelajar yang tertarik pada web development, UI/UX
              design, dan teknologi. Saya senang membuat website yang tidak
              hanya berfungsi dengan baik, tetapi juga memiliki tampilan yang
              menarik dan nyaman digunakan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                }}
              >
                Lihat Karya
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-transform hover:scale-[1.03]"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                  color: "var(--text)",
                }}
              >
                <Mail size={16} />
                Kontak Saya
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}