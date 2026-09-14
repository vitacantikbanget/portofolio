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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ================= FOTO ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex justify-center lg:justify-end lg:order-2 order-1"
          >
            <div className="relative w-[240px] sm:w-[300px] lg:w-[360px]">
              {/* Glow di belakang */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "var(--accent)",
                  opacity: 0.3,
                  filter: "blur(70px)",
                  transform: "scale(0.9)",
                }}
              />

              {/* ====== DOT GRID — kiri atas ====== */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "-30px",
                  left: "-30px",
                  width: "90px",
                  height: "90px",
                  backgroundImage:
                    "radial-gradient(var(--accent) 1.5px, transparent 1.5px)",
                  backgroundSize: "14px 14px",
                  opacity: 0.6,
                }}
              />

              {/* ====== GARIS DIAGONAL — kanan bawah ====== */}
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: "-25px",
                  right: "-25px",
                  width: "90px",
                  height: "90px",
                  backgroundImage:
                    "repeating-linear-gradient(45deg, var(--accent) 0, var(--accent) 1.5px, transparent 1.5px, transparent 9px)",
                  opacity: 0.5,
                }}
              />

              {/* ====== GARIS DIAGONAL — kiri bawah ====== */}
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: "-25px",
                  left: "-25px",
                  width: "60px",
                  height: "60px",
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, var(--mauve) 0, var(--mauve) 1.5px, transparent 1.5px, transparent 9px)",
                  opacity: 0.4,
                }}
              />

              {/* ====== FOTO ====== */}
              <motion.div
                style={{
                  x: isDesktop ? mouse.x * 10 : 0,
                  y: isDesktop ? mouse.y * 10 : 0,
                }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }}
                className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/profile.jpeg"
                  alt="Desvita Putri Wulandari"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 360px"
                />
              </motion.div>

              {/* ====== SUDUT VIEWFINDER — 4 sudut ====== */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "-8px",
                  left: "-8px",
                  width: "32px",
                  height: "32px",
                  borderTop: "2px solid var(--accent)",
                  borderLeft: "2px solid var(--accent)",
                  borderTopLeftRadius: "10px",
                }}
              />
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "-8px",
                  right: "-8px",
                  width: "32px",
                  height: "32px",
                  borderTop: "2px solid var(--accent)",
                  borderRight: "2px solid var(--accent)",
                  borderTopRightRadius: "10px",
                }}
              />
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: "-8px",
                  left: "-8px",
                  width: "32px",
                  height: "32px",
                  borderBottom: "2px solid var(--accent)",
                  borderLeft: "2px solid var(--accent)",
                  borderBottomLeftRadius: "10px",
                }}
              />
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: "-8px",
                  right: "-8px",
                  width: "32px",
                  height: "32px",
                  borderBottom: "2px solid var(--accent)",
                  borderRight: "2px solid var(--accent)",
                  borderBottomRightRadius: "10px",
                }}
              />

              {/* ====== TITIK GLOW — kiri atas (statis) ====== */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: "-34px",
                  left: "-34px",
                  width: "8px",
                  height: "8px",
                  background: "var(--accent)",
                  boxShadow: "0 0 15px var(--accent)",
                }}
              />

              {/* ====== TITIK GLOW — kanan bawah (statis) ====== */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  bottom: "-34px",
                  right: "-34px",
                  width: "8px",
                  height: "8px",
                  background: "var(--mauve)",
                  boxShadow: "0 0 15px var(--mauve)",
                }}
              />

              {/* ====== LABEL FLOATING ====== */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -bottom-6 -left-6 px-3 py-1.5 rounded-full border backdrop-blur-md text-[10px] tracking-wider uppercase whitespace-nowrap"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                Pasuruan, ID
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -top-6 -right-6 px-3 py-1.5 rounded-full border backdrop-blur-md text-[10px] tracking-wider uppercase whitespace-nowrap"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                Frontend Dev
              </motion.div>
            </div>
          </motion.div>

          {/* ================= TEXT ================= */}
          <div className="text-center lg:text-left lg:order-1 order-2">
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