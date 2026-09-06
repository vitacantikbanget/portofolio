"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Moon, Sun, ArrowUpRight, Check, Copy } from "lucide-react";
import { Gamepad2 } from 'lucide-react';

/* ---------- Fonts ---------- */
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

/* ---------- Helper Reveal-on-Scroll ---------- */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- Magnetic Interaction ---------- */
function magnetMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
}

function magnetLeave(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = "translate(0px, 0px)";
}

/* ---------- Data Outside Component ---------- */
const skillCategories = [
  {
    title: "FRONTEND DEVELOPMENT",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "DESIGN & UI/UX",
    items: ["Figma", "Responsive Design"],
  },
  {
    title: "TOOLS & BACKEND BASIC",
    items: ["GitHub", "Supabase", "VS Code", "Vercel"],
  },
];

const projects = [
  {
    title: "Manajemen Perpustakaan",
    desc: "Sistem inventaris dan peminjaman buku perpus dengan fitur CRUD lengkap.",
    tech: "Next.js · Supabase · Tailwind",
    image: "/manajemen perpustakaan.png",
    link: "https://manajemen-perpustakaan-sandy.vercel.app",
  },
  {
    title: "Website belajar perkalian",
    desc: "Proyek website belajar perkalian SD, latihan soal dan pembelajaran",
    tech: "Tailwind CSS",
    image: "/mtk3sd.png",
    link: "https://vitacantikbanget.github.io/belajar-perkalian-SD/mtk",
  },
  {
    title: "Nextjs V2",
    desc: "Mengasah dan mengupgrade kemampuan membuat website menggunakan Next.js lebih dalam",
    tech: "Next.js · Supabase",
    image: "/nextjsv2.png",
    link: "https://nextjs-v2-fbui.vercel.app/",
  },
  {
    title: "SafeReport",
    desc: "Desain Website tentang pelaporan pelanggaran aturan-aturan sekolah kepada guru BK/WALAS",
    tech: "Figma",
    image: "/safereport.png",
    link: "https://www.figma.com/design/nunI3SykyQcv9ZMpVIrlUS/Tugas-Pak-Sholeh-SafeReport?node-id=0-1&t=0mAUuw6QcGUDfN6Q-1",
  },
];

const navLinks = [
  { id: "home", label: "Beranda" },
  { id: "about", label: "Tentang" },
  { id: "skills", label: "Keahlian" },
  { id: "projects", label: "Proyek" },
  { id: "contact", label: "Kontak" },
];

const hobbies = [
  {
    category: "LITERASI & KREATIF",
    title: "Membaca & Menulis Cerita",
    desc: "Menyukai dunia literasi dan fiksi. Senang mengekspresikan ide, alur cerita, dan imajinasi kreatif lewat tulisan.",
    tag: "Wattpad",
  },
  {
    category: "HIBURAN & GAME",
    title: "Gaming & Musik",
    desc: "Mengisi waktu luang dengan bermain game santai seperti Roblox serta mendengarkan lagu dan bernyanyi.",
    tag: "Roblox · Spotify",
  },
];

const journeyCards = [
  {
    status: "STATUS SAAT INI",
    title: "Pelajar Rekayasa Perangkat Lunak",
    sub: "SMK Negeri 1 Pasuruan",
    desc: "Saat ini fokus mendalami fondasi pemrograman web modern, struktur data, serta desain antarmuka. Aktif mengasah keterampilan lewat tugas sekolah dan eksplorasi mandiri.",
    badges: ["HTML/CSS", "JavaScript", "Next.js", "Figma"],
    tag: "Pendidikan",
  },
  {
    status: "CITA-CITA & IMPIAN",
    title: "Frontend Engineer & UI/UX Specialist",
    sub: "Target Masa Depan",
    desc: "Bercita-cita menjadi pengembang web profesional yang mampu merancang serta mengimplementasikan aplikasi web interaktif, responsif, dan memberikan pengalaman pengguna yang menyenangkan.",
    badges: ["React Ecosystem", "Design System", "Web Performance"],
    tag: "Karir Target",
  },
];

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"enter" | "exit" | "done">("enter");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("home");
  const [copied, setCopied] = useState(false);

  const glowRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  const emailAddress = "desvitaputri27@gmail.com";
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* --- Persistensi Theme & Session Storage Intro --- */
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("portfolio-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  };

  /* --- Intro Sequence (Hanya Tampil Sekali) --- */
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("has-seen-intro");
    if (hasSeenIntro) {
      setPhase("done");
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("done");
      return;
    }

    const t1 = setTimeout(() => setPhase("exit"), 1600);
    const t2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("has-seen-intro", "true");
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* --- Scroll Listener --- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);

      let current = "home";
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = link.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- Parallax Glow & Photo --- */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.setProperty("--mx", `${e.clientX}px`);
        glowRef.current.style.setProperty("--my", `${e.clientY}px`);
      }
      if (photoRef.current) {
        const rect = photoRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / 30;
        const dy = (e.clientY - cy) / 30;
        photoRef.current.style.transform = `perspective(1000px) rotateY(${dx}deg) rotateX(${-dy}deg) translate(${dx}px, ${dy}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      data-theme={mounted ? theme : "light"}
      className={`${serif.variable} ${sans.variable} relative min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-500`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        [data-theme="light"] {
          --bg: #fbf6f2;
          --bg-alt: #f4ece2;
          --card: #f6efe8;
          --text: #2b2320;
          --text-soft: #7a6b63;
          --accent: #c08497;
          --accent-2: #b9afd9;
          --border: #e5d9cc;
          --overlay: rgba(43, 35, 32, 0.06);
        }
        [data-theme="dark"] {
          --bg: #19140f;
          --bg-alt: #221b16;
          --card: #241c17;
          --text: #f4ece4;
          --text-soft: #b6a89d;
          --accent: #dba9b6;
          --accent-2: #a89bcf;
          --border: #382d26;
          --overlay: rgba(0, 0, 0, 0.25);
        }

        @keyframes revealText {
          from { opacity: 0; transform: translateY(16px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1.5deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.22; transform: scale(1.08); }
        }

        .opening-line-1 { animation: revealText 0.6s ease-out 0.1s both; }
        .opening-line-2 { animation: revealText 0.7s ease-out 0.4s both; }
        .opening-line-3 { animation: revealText 0.7s ease-out 0.8s both; }

        .floating-element { animation: float 6s ease-in-out infinite; }

        .glow-layer {
          background: radial-gradient(
            550px circle at var(--mx, 50%) var(--my, 20%),
            var(--accent),
            transparent 65%
          );
          opacity: 0.16;
          transition: opacity 0.4s ease;
        }
        .blob-a { animation: pulseGlow 10s ease-in-out infinite alternate; }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          height: 2px;
          width: 0%;
          background: var(--accent);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-link:hover::after,
        .nav-link[data-active="true"]::after {
          width: 100%;
        }
      `}</style>

      {/* ---------- Opening Screen Overlay ---------- */}
      {phase !== "done" && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)] transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            phase === "exit" ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <div className="flex flex-col items-center justify-center text-center px-4">
            <p className="opening-line-1 text-xs tracking-[0.4em] text-[var(--text-soft)] uppercase">
              PORTOFOLIO
            </p>
            <h1
              className="opening-line-2 mt-4 text-4xl md:text-6xl italic"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Desvita Imut
            </h1>
            <p className="opening-line-3 mt-4 text-sm tracking-[0.15em] text-[var(--text-soft)]">
              Pengembang Web · Desainer UI/UX
            </p>
          </div>
        </div>
      )}

      {/* ---------- Scroll Progress Bar ---------- */}
      <div
        className="fixed top-0 left-0 z-[70] h-[3px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      {/* ---------- Dynamic Interactive Background ---------- */}
      <div ref={glowRef} className="glow-layer pointer-events-none fixed inset-0 -z-20" />
      <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
        <div className="blob-a absolute -top-24 -left-16 h-96 w-96 rounded-full bg-[var(--accent)] blur-3xl" />
        <div className="blob-a absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-[var(--accent-2)] blur-3xl" />
      </div>

      {/* ---------- Navbar ---------- */}
      <nav
        className={`fixed left-1/2 top-4 z-[60] flex w-[92%] max-w-3xl -translate-x-1/2 items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
          scrolled
            ? "border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md shadow-md"
            : "border border-transparent bg-transparent"
        }`}
      >
        <a href="#home" className="text-sm font-semibold tracking-wide hover:scale-105 transition-transform">
          DESVITA<span className="text-[var(--accent)]">.</span>
        </a>

        <div className="hidden gap-6 text-sm text-[var(--text-soft)] md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              data-active={active === link.id}
              className={`nav-link relative transition-colors hover:text-[var(--text)] ${
                active === link.id ? "text-[var(--text)] font-medium" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Ganti mode gelap/terang"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-transform hover:scale-110 hover:border-[var(--accent)]"
          >
            {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <a
            href="#contact"
            onMouseMove={magnetMove}
            onMouseLeave={magnetLeave}
            className="hidden items-center gap-1 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-medium text-[var(--bg)] transition-transform hover:shadow-lg md:flex"
          >
            Hubungi Saya <ArrowUpRight size={13} />
          </a>
        </div>
      </nav>

      {/* ---------- Home / Hero Section ---------- */}
      <section
        id="home"
        className={`relative z-10 mx-auto max-w-6xl px-6 pt-40 pb-20 md:px-10 md:pt-48 transition-all duration-1000 ease-out ${
          phase === "enter"
            ? "opacity-0 translate-y-10 scale-95"
            : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs tracking-[0.35em] text-[var(--text-soft)]">HALO, SAYA</p>
            <h2
              className="mt-3 text-3xl italic text-[var(--accent)] md:text-4xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Desvita Putri Wulandari
            </h2>
            <h1
              className="mt-2 text-5xl leading-[1.05] md:text-7xl font-light"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Pengembang
              <br />
              <span className="italic font-normal text-[var(--accent-2)]">Kreatif</span>
            </h1>
            <p className="mt-4 text-xs tracking-[0.25em] text-[var(--text-soft)]">
              PENGEMBANGAN WEB · UI/UX DESIGN · TEKNOLOGI
            </p>
            <p className="mt-6 max-w-md leading-relaxed text-[var(--text-soft)]">
              Saya adalah pelajar yang fokus pada pengembangan web modern dan desain UI/UX.
              Senang merancang ide kreatif menjadi solusi digital yang fungsional, responsif, dan estetis.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#projects"
                onMouseMove={magnetMove}
                onMouseLeave={magnetLeave}
                className="group flex items-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-transform hover:shadow-xl"
              >
                Lihat Karya
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a
                href="#contact"
                onMouseMove={magnetMove}
                onMouseLeave={magnetLeave}
                className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium transition-transform hover:border-[var(--accent)]"
              >
                Kontak Saya
              </a>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div
              ref={photoRef}
              className="floating-element relative h-[420px] w-[300px] overflow-hidden rounded-tr-[5rem] rounded-bl-[5rem] border border-[var(--border)] shadow-2xl transition-transform duration-200 ease-out"
            >
              <Image
                src="/profile.jpeg"
                alt="Desvita Putri"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Statistik */}
        <div className="mt-20 flex w-full justify-center">
          <div className="flex items-center gap-10 border-t border-[var(--border)]/60 pt-8 md:gap-16">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-light tracking-tight text-[var(--accent)]" style={{ fontFamily: "var(--font-serif)" }}>
                01<span className="text-2xl text-[var(--text-soft)]">+</span>
              </p>
              <p className="mt-1 text-[11px] tracking-[0.2em] text-[var(--text-soft)] uppercase">
                Tahun Ngoding
              </p>
            </div>

            <div className="h-10 w-[1px] bg-[var(--border)]" />

            <div className="text-center">
              <p className="text-4xl md:text-5xl font-light tracking-tight text-[var(--accent-2)]" style={{ fontFamily: "var(--font-serif)" }}>
                04<span className="text-2xl text-[var(--text-soft)]">+</span>
              </p>
              <p className="mt-1 text-[11px] tracking-[0.2em] text-[var(--text-soft)] uppercase">
                Proyek Selesai
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- About Section ---------- */}
      <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:px-10">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-[var(--accent)]">01 — TENTANG SAYA</p>
        </Reveal>
        
        <div className="mt-8 grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <Reveal delay={100} className="relative flex justify-center">
            <div className="group relative h-[380px] w-[280px] overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-xl transition-all duration-500 hover:border-[var(--accent)]">
              <Image
                src="/fotosaya.png"
                alt="Desvita tentang saya"
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--accent-2)]">
                  SMKN 1 Pasuruan
                </span>
                <p className="text-sm font-medium">Siswa Rekayasa Perangkat Lunak</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={150}>
              <h2
                className="text-4xl leading-tight md:text-5xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Mengenal saya <br />
                <span className="italic text-[var(--accent)]">lebih dekat</span>
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-[var(--text-soft)]">
                Saya adalah seorang siswi SMK yang memiliki minat tinggi pada pengembangan antarmuka (frontend) dan desain UI/UX. Berangkat dari latar belakang pendidikan kejuruan, saya terbiasa melatih logika koding dan kepekaan estetika secara berdampingan.
              </p>
              <p className="mt-4 max-w-lg leading-relaxed text-[var(--text-soft)]">
                Bagi saya, merancang website bukan sekadar menulis kode, tetapi tentang bagaimana membangun pengalaman digital yang inklusif, responsif, dan mudah digunakan oleh siapapun.
              </p>
            </Reveal>

            <Reveal delay={200} className="mt-8 grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-6">
              {[
                ["Nama Lengkap", "Desvita Putri Wulandari"],
                ["Lokasi", "Pasuruan, Jawa Timur"],
                ["Fokus Usaha", "Frontend & UI/UX Design"],
                ["Status", "Pelajar Aktif"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] tracking-[0.2em] text-[var(--text-soft)] uppercase">{label}</p>
                  <p className="mt-1 text-sm font-medium text-[var(--text)]">{value}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Perjalanan & Visi */}
        <div className="mt-20">
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-[var(--accent)]">PERJALANAN & VISI</p>
            <h3
              className="mt-2 text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Fokus saat ini & <span className="italic text-[var(--accent-2)]">arah tujuan</span>
            </h3>
          </Reveal>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {journeyCards.map((item, i) => (
              <Reveal key={item.status} delay={i * 150}>
                <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-[var(--border)] bg-[var(--card)]/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg">
                  <div>
                    <div className="flex items-center justify-between border-b border-[var(--border)]/60 pb-4">
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
                        {item.status}
                      </span>
                      <span className="rounded-full border border-[var(--border)] bg-[var(--bg)]/80 px-3 py-1 text-[10px] font-medium text-[var(--text-soft)]">
                        {item.tag}
                      </span>
                    </div>

                    <h4
                      className="mt-6 text-2xl font-medium"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs font-semibold tracking-wider text-[var(--accent-2)] uppercase">
                      {item.sub}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-[var(--text-soft)]">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[var(--border)]/40">
                    <div className="flex flex-wrap gap-2">
                      {item.badges.map((badge) => (
                        <span
                          key={badge}
                          className="rounded-lg border border-[var(--border)] bg-[var(--bg)]/60 px-3 py-1 text-xs text-[var(--text-soft)]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Hobi */}
        <div className="mt-24 border-t border-[var(--border)] pt-16 text-center">
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-[var(--accent)]">SISI KREATIF</p>
            <h3
              className="mt-3 text-3xl md:text-4xl leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Di luar baris kode & kanvas Figma
            </h3>
            <p className="mt-2 text-sm text-[var(--text-soft)] max-w-lg mx-auto">
              Selain merancang website dan antarmuka digital, beberapa aktivitas ini yang menjaga kreativitas dan keseimbangan saya.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto text-left">
            {hobbies.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-[var(--border)] bg-[var(--card)]/50 p-8 transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-1 shadow-sm">
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--accent-2)] uppercase">
                      {item.category}
                    </span>
                    <h4
                      className="mt-2 text-2xl font-medium text-[var(--text)]"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-[var(--border)]/60">
                    <span className="inline-block text-xs font-medium text-[var(--accent)]">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Skills Section (Tampilan Baru Grid 3 Kolom) ---------- */}
      <section id="skills" className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:px-10">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-[var(--accent)]">02 — KEAHLIAN</p>
          <h2
            className="mt-3 text-3xl leading-tight md:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Teknologi & <span className="italic text-[var(--accent-2)]">Perangkat</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {skillCategories.map((cat, idx) => (
            <Reveal key={cat.title} delay={idx * 100}>
              <div className="group h-full rounded-3xl border border-[var(--border)] bg-[var(--card)]/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--text-soft)] uppercase">
                  {cat.title}
                </p>
                
                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/80 px-3.5 py-2 text-xs font-medium text-[var(--text)] transition-all duration-200 group-hover:border-[var(--accent)]/40 hover:!border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Projects ---------- */}
      <section id="projects" className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:px-10">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-[var(--accent)]">03 — PROYEK PILIHAN</p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-24">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col gap-8 md:items-center md:gap-16 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <div className="relative h-64 w-full flex-1 overflow-hidden rounded-2xl border border-[var(--border)] shadow-md md:h-80">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex-1">
                  <p className="text-xs tracking-[0.2em] text-[var(--text-soft)]">
                    PROYEK {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="mt-3 flex items-center gap-2 text-3xl transition-colors duration-300 group-hover:text-[var(--accent)] md:text-4xl"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {p.title}
                    <ArrowUpRight
                      size={24}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-[var(--text-soft)]">{p.desc}</p>
                  <p className="mt-4 text-xs font-medium tracking-[0.15em] text-[var(--accent)]">
                    {p.tech}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center md:px-10">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-[var(--accent)]">04 — KONTAK</p>
        </Reveal>
        
        <Reveal delay={100}>
          <h2
            className="mt-6 text-4xl leading-[1.1] md:text-6xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Mari buat sesuatu
            <br />
            <span className="italic text-[var(--accent-2)]">yang luar biasa.</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-md mx-auto leading-relaxed text-[var(--text-soft)]">
            Tertarik untuk berkolaborasi,bermain game atau punya pertanyaan? Silakan hubungi saya melalui saluran di bawah ini.
          </p>
        </Reveal>

        <Reveal delay={300} className="mt-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-3xl border border-[var(--border)] bg-[var(--card)]/60 p-8 backdrop-blur-sm shadow-sm md:p-10">
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs tracking-[0.2em] text-[var(--text-soft)] uppercase">Kirim Pesan Langsung</span>
              <div className="flex items-center gap-2">
                <a
  href="https://www.roblox.com/share?code=ca625944a7c25244b37a67af4861b1c3&type=Profile&source=ProfileShare&stamp=1788703739535"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-violet-500 transition-all text-white group"
>
  <Gamepad2 className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />
  <div>
    <p className="text-xs text-zinc-400">Roblox Profile</p>
    <p className="text-sm font-semibold">@xichin_08</p>
  </div>
</a>
                <a
                  href={`mailto:${emailAddress}`}
                  className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--bg)] px-6 py-3 text-sm font-medium text-[var(--text)] transition-all hover:border-[var(--accent)]"
                >
                  {emailAddress}
                </a>
                <button
                  onClick={handleCopyEmail}
                  aria-label="Salin email"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text)] transition-all hover:border-[var(--accent)] hover:scale-105"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="w-full border-t border-[var(--border)]/60 my-2" />

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a
                href="https://www.instagram.com/vitaaptri_wd?stkn=NTY3OTB3dWx1NHBj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <span>Instagram</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://github.com/vitacantikbanget"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <span>GitHub</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="relative z-10 border-t border-[var(--border)] px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-sm font-semibold tracking-wide">
              DESVITA<span className="text-[var(--accent)]">.</span>
            </p>
          </div>
          <p className="text-xs text-[var(--text-soft)]">
            © {new Date().getFullYear()} Desvita Putri. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}