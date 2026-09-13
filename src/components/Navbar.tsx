"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", label: "Beranda" },
  { href: "#about", label: "Tentang" },
  { href: "#skills", label: "Keahlian" },
  { href: "#projects", label: "Proyek" },
  { href: "#contact", label: "Kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      setScrolled(y > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setActive(href);
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "backdrop-blur-xl border-b shadow-sm" : "border-b border-transparent"
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

        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleClick(link.href)}
                className={cn(
                  "text-sm transition-colors relative py-2",
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

        {/* Hamburger Mobile */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
          className="md:hidden w-10 h-10 rounded-full border flex items-center justify-center"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Menu Mobile */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t",
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