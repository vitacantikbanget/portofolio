"use client";

import { FaInstagram, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const socials = [
  { icon: FaInstagram, href: "https://instagram.com/", label: "Instagram" },
  { icon: FaGithub, href: "https://github.com/", label: "GitHub" },
  { icon: MdEmail, href: "mailto:desvitaputri27@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer
      className="border-t py-12"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Kiri: Logo + tagline */}
          <div className="text-center md:text-left">
            <p
              className="text-2xl font-semibold mb-1"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Desvita
              <span style={{ color: "var(--accent)" }}>.</span>
            </p>
            <p
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              Designed & developed with curiosity.
            </p>
          </div>

          {/* Kanan: Socials */}
          <div className="flex items-center gap-2">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:-translate-y-0.5"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom line */}
        <div
          className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <p>© 2026 Desvita Putri. All rights reserved.</p>
          <p>Made in Pasuruan, Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}