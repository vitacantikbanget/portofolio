"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import TypingText from "./hero/TypingText";

interface HeroProps {
  avatarUrl?: string | null;
}

export default function Hero({ avatarUrl }: HeroProps) {
  // State buat posisi mouse (buat parallax foto)
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  // State buat cek apakah layar desktop
  const [isDesktop, setIsDesktop] = useState(false);

  // Cek ukuran layar — jalan saat pertama kali + saat resize
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Deteksi gerakan mouse — cuma aktif di desktop
  useEffect(() => {
    if (!isDesktop) return; // skip kalau bukan desktop
    const onMove = (e: MouseEvent) => {
      // Ubah posisi mouse jadi range -1 sampai 1
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
          <div
            className="flex justify-center lg:justify-end order-1 lg:order-2 hero-in-photo" // mobile: atas, desktop: kanan
          >
            <div
              data-anim
              className="relative w-[160px] sm:w-[220px] lg:w-[320px]"
            >
              {/* Glow di belakang foto */}
              <div
                className="hero-glow absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "var(--accent)",
                  opacity: 0.2,
                  filter: "blur(50px)",
                  transform: "scale(0.9)",
                }}
              />

              {/* ====== FOTO ====== */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                {avatarUrl && (
                  <Image
                    src={avatarUrl}
                    alt="Desvita Putri"
                    fill
                    className="object-cover"
                    priority // load duluan (biar cepet)
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 220px, 320px"
                  />
                )}
              </div>

              {/* ================= GARIS STATIS ================= */}
              {/* 4 garis tipis di sekeliling foto — diam */}
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

              {/* ================= RUNNING LIGHT ================= */}
              {/* 12 potongan garis (4 sisi × 3 potongan)
                  bergantian muncul — kayak lampu berjalan */}

              {/* === SISI ATAS (3 potongan) === */}
              <div
                className="absolute pointer-events-none hl-1"
                style={{
                  top: "-6px",
                  left: "10%",
                  width: "20%",
                  height: "2px",
                  background: "var(--accent)",
                  borderRadius: "2px",
                  filter: "drop-shadow(0 0 4px var(--accent))", // glow
                  willChange: "opacity",
                }}
              />
              <div
                className="absolute pointer-events-none hl-2"
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
              />
              <div
                className="absolute pointer-events-none hl-3"
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
              />

              {/* === SISI KANAN (3 potongan) === */}
              <div
                className="absolute pointer-events-none hl-4"
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
              />
              <div
                className="absolute pointer-events-none hl-5"
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
              />
              <div
                className="absolute pointer-events-none hl-6"
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
              />

              {/* === SISI BAWAH (3 potongan — pakai warna mauve) === */}
              <div
                className="absolute pointer-events-none hl-7"
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
              />
              <div
                className="absolute pointer-events-none hl-8"
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
              />
              <div
                className="absolute pointer-events-none hl-9"
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
              />

              {/* === SISI KIRI (3 potongan — pakai warna mauve) === */}
              <div
                className="absolute pointer-events-none hl-10"
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
              />
              <div
                className="absolute pointer-events-none hl-11"
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
              />
              <div
                className="absolute pointer-events-none hl-12"
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
              />

              {/* ================= GARIS SUDUT DALAM ================= */}
              {/* 4 sudut foto — kayak viewfinder kamera */}
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
              {/* 4 belah ketupat yang berkedip bergantian */}
              <div
                className="absolute pointer-events-none hero-diamond hero-diamond-1"
                style={{
                  top: "-6px",
                  left: "-6px",
                  width: "8px",
                  height: "8px",
                  background: "var(--accent)",
                  transform: "rotate(45deg)", // jadi belah ketupat
                  boxShadow: "0 0 10px var(--accent)",
                  willChange: "opacity",
                }}
              />
              <div
                className="absolute pointer-events-none hero-diamond hero-diamond-2"
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
              />
              <div
                className="absolute pointer-events-none hero-diamond hero-diamond-3"
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
              />
              <div
                className="absolute pointer-events-none hero-diamond hero-diamond-4"
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
              />

              {/* ================= TITIK KECIL DI 4 SUDUT ================= */}
              {/* Titik kecil diam di dalam sudut foto */}
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
            </div>

          {/* ================= PEMISAH (mobile only) ================= */}
          {/* Garis + titik — cuma muncul di mobile */}
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
            {/* Label "Available for work" */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] tracking-[0.18em] uppercase hero-in-badge"
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
            </div>

            {/* Nama — besar */}
            <h1
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] font-medium hero-in-title"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Desvita
              <br />
              <span style={{ color: "var(--accent)" }}>Putri</span>{" "}
              <span className="italic" style={{ color: "var(--text-muted)" }}>
                Wulandari
              </span>
            </h1>

            {/* Typing text "I'm a ..." */}
            <div
              className="mt-5 text-base sm:text-lg lg:text-xl font-light min-h-[1.8em] hero-in-typing"
              style={{ color: "var(--text-muted)" }}
            >
              I'm a <TypingText />
            </div>

            {/* Deskripsi */}
            <p
              className="mt-5 max-w-lg mx-auto lg:mx-0 text-sm sm:text-[15px] leading-relaxed hero-in-desc"
              style={{ color: "var(--text-muted)" }}
            >
              Saya adalah pelajar yang tertarik pada web development, UI/UX
              design, dan teknologi. Saya senang membuat website yang tidak
              hanya berfungsi dengan baik, tetapi juga memiliki tampilan yang
              menarik dan nyaman digunakan.
            </p>

            {/* Tombol */}
            <div
              className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start hero-in-cta"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
