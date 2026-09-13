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
      <div className="container-custom w-full py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ================= TEXT ================= */}
          <div className="text-center lg:text-left">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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

            {/* Nama */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
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

            {/* Typing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 text-base sm:text-lg lg:text-xl font-light min-h-[1.8em]"
              style={{ color: "var(--text-muted)" }}
            >
              I'm a <TypingText />
            </motion.div>

            {/* Deskripsi */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 max-w-lg mx-auto lg:mx-0 text-sm sm:text-[15px] leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Saya adalah pelajar yang tertarik pada web development, UI/UX
              design, dan teknologi. Saya senang membuat website yang tidak
              hanya berfungsi dengan baik, tetapi juga memiliki tampilan yang
              menarik dan nyaman digunakan.
            </motion.p>

            {/* Buttons */}
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

          {/* ================= FOTO ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-[240px] sm:w-[300px] lg:w-[360px]">
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "var(--accent)",
                  opacity: 0.25,
                  filter: "blur(70px)",
                  transform: "scale(0.85)",
                }}
              />

              {/* Frame dekoratif */}
              <motion.div
                className="absolute rounded-[2rem] border pointer-events-none"
                style={{
                  top: "-12px",
                  left: "-12px",
                  right: "-12px",
                  bottom: "-12px",
                  borderColor: "var(--border)",
                }}
                animate={{ rotate: [0, 1.5, 0, -1.5, 0] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Foto */}
              <motion.div
                style={{
                  x: mouse.x * 10,
                  y: mouse.y * 10,
                }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }}
                className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl"
              >
                <Image
                  src="/profile.jpeg"
                  alt="Desvita Putri Wulandari"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 360px"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.22), transparent 45%)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}