"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils"; // buat gabungin class

// Daftar menu navigasi
const links = [
  { href: "#home", label: "Beranda" },
  { href: "#about", label: "Tentang" },
  { href: "#skills", label: "Keahlian" },
  { href: "#projects", label: "Proyek" },
  { href: "#contact", label: "Kontak" },
];

export default function Navbar() {
  // Status: udah scroll atau belum
  const [scrolled, setScrolled] = useState(false);
  // Status: menu mobile kebuka atau ketutup
  const [open, setOpen] = useState(false);
  // Menu mana yang lagi aktif
  const [active, setActive] = useState("#home");

  // Deteksi scroll — ubah tampilan navbar
  useEffect(() => {
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      setScrolled(y > 20); // true kalau udah scroll >20px
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Deteksi section yang lagi kelihatan — biar menu aktif ngikutin
  useEffect(() => {
    // Ambil semua section dari daftar link
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    // IntersectionObserver: cek section mana yang lagi di layar
    const observer = new IntersectionObserver(
      (entries) => {
        // Ambil yang paling banyak kelihatan
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-40% 0px -50% 0px", // area deteksi di tengah layar
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Fungsi klik menu
  const handleClick = (href: string) => {
    setActive(href); // set menu aktif
    setOpen(false);  // tutup menu mobile
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // Kalau udah scroll: blur + border + shadow
        scrolled
          ? "backdrop-blur-xl border-b shadow-sm"
          : "border-b border-transparent"
      )}
      style={{
        background: scrolled ? "var(--nav-bg)" : "transparent",
        borderColor: scrolled ? "var(--border)" : "transparent",
      }}
    >
      <nav className="container-custom flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#home"
          onClick={() => handleClick("#home")}
          className="text-xl md:text-2xl font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Desvita
          <span style={{ color: "var(--accent)" }}>.</span>
        </a>

        {/* Menu Desktop — sembunyi di mobile */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleClick(link.href)}
                className={cn(
                  "text-sm transition-colors relative py-2",
                  // Aktif: tebal. Gak aktif: pudar, kalau hover jadi jelas
                  active === link.href
                    ? "font-medium"
                    : "opacity-70 hover:opacity-100"
                )}
                style={{
                  color:
                    active === link.href ? "var(--accent)" : "var(--text)",
                }}
              >
                {link.label}
                {/* Garis bawah — cuma muncul kalau aktif */}
                {active === link.href && (
                  <span
                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{ background: "var(--accent)" }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Kanan: toggle tema + tombol hamburger */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Tombol hamburger — cuma muncul di mobile */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Buka menu"
            className="md:hidden w-10 h-10 rounded-full border flex items-center justify-center"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            {/* Ganti icon: X kalau kebuka, Menu kalau ketutup */}
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile — muncul kalau tombol hamburger diklik */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t",
          // max-h-0 = ketutup, max-h-96 = kebuka
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <ul className="container-custom py-4 flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleClick(link.href)}
                className="block py-3 text-sm"
                style={{
                  color:
                    active === link.href ? "var(--accent)" : "var(--text)",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}