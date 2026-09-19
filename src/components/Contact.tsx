"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { sendMessage } from "@/lib/contact";

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
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus("idle");

    const result = await sendMessage(form);

    setSending(false);

    if (result.success) {
      setStatus("success");
      setForm({ nama: "", email: "", pesan: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
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
        {/* HEADER */}
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

        {/* CARD */}
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
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "var(--accent)",
              opacity: 0.08,
              filter: "blur(60px)",
            }}
          />

          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-20">
            {/* ============ KIRI — INFO ============ */}
            <div className="flex flex-col justify-center">
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
                className="text-sm sm:text-base leading-relaxed mb-8 max-w-md"
                style={{ color: "var(--text-muted)" }}
              >
                Kalau kamu punya ide, project, atau cuma mau ngobrol soal web
                development & design — feel free to reach out.
              </p>

              {/* Socials */}
              <div>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  Hubungi saya di
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

            {/* ============ KANAN — FORM ============ */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="text-[10px] tracking-[0.2em] uppercase block mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Nama
                </label>
                <input
                  type="text"
                  required
                  value={form.nama}
                  onChange={(e) =>
                    setForm({ ...form, nama: e.target.value })
                  }
                  placeholder="Nama kamu"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--accent)]"
                  style={{
                    background: "var(--bg-soft)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                />
              </div>

              <div>
                <label
                  className="text-[10px] tracking-[0.2em] uppercase block mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--accent)]"
                  style={{
                    background: "var(--bg-soft)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                />
              </div>

              <div>
                <label
                  className="text-[10px] tracking-[0.2em] uppercase block mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Pesan
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.pesan}
                  onChange={(e) =>
                    setForm({ ...form, pesan: e.target.value })
                  }
                  placeholder="Tulis pesan kamu..."
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none focus:border-[var(--accent)]"
                  style={{
                    background: "var(--bg-soft)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                }}
              >
                {sending ? (
                  "Mengirim..."
                ) : (
                  <>
                    <Send size={15} />
                    Kirim Pesan
                  </>
                )}
              </button>

              {status === "success" && (
                <p
                  className="text-sm text-center"
                  style={{ color: "var(--accent)" }}
                >
                  ✅ Pesan berhasil dikirim!
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-center text-red-500">
                  ❌ Gagal kirim pesan. Coba lagi.
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}