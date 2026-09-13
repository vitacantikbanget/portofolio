"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaGithub } from "react-icons/fa";

const EMAIL = "desvitaputri27@gmail.com";

const socials = [
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/vitaaptri_wd?stkn=NTY3OTB3dWx1NHBj",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/vitacantikbanget",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback kalau gagal
    }
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      {/* Blob dekoratif */}
      <div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "var(--mauve)",
          opacity: 0.08,
          filter: "blur(90px)",
        }}
      />

      <div className="container-custom relative">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <span
            className="w-8 h-[1px]"
            style={{ background: "var(--accent)" }}
          />
          <span
            className="text-[11px] tracking-[0.3em] uppercase font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            Contact
          </span>
        </motion.div>

        {/* ================= CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border p-8 sm:p-12 lg:p-16 relative overflow-hidden"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          {/* Dekorasi lingkaran */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "var(--accent)",
              opacity: 0.08,
              filter: "blur(60px)",
            }}
          />

          <div className="relative max-w-2xl">
            <h2
              className="text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.05] font-medium mb-5"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--text)",
              }}
            >
              Let's build
              <br />
              <span className="italic" style={{ color: "var(--accent)" }}>
                something together.
              </span>
            </h2>

            <p
              className="text-sm sm:text-base leading-relaxed mb-8 max-w-lg"
              style={{ color: "var(--text-muted)" }}
            >
              Kalau kamu punya ide, project, atau cuma mau ngobrol soal web
              development & design — feel free to reach out.
            </p>

            {/* ===== EMAIL + COPY ===== */}
            <div
              className="flex flex-col sm:flex-row gap-3 sm:items-center p-3 rounded-2xl border mb-8"
              style={{
                background: "var(--bg-soft)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                  }}
                >
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Email
                  </p>
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: "var(--text)" }}
                  >
                    {EMAIL}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] shrink-0"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                }}
              >
                {copied ? (
                  <>
                    <Check size={15} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    Copy Email
                  </>
                )}
              </button>
            </div>

            {/* ===== SOCIALS ===== */}
            <div>
              <p
                className="text-[10px] tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                Atau cari saya di
              </p>

              <div className="flex flex-wrap gap-2.5">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all hover:-translate-y-0.5"
                      style={{
                        background: "var(--bg-soft)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      <Icon
                        size={15}
                        className="transition-transform duration-300 group-hover:scale-110"
                        style={{ color: "var(--accent)" }}
                      />
                      <span className="text-sm font-medium">{s.label}</span>
                      <ArrowUpRight
                        size={13}
                        className="opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}