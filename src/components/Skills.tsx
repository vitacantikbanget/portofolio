"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Code2, Palette, Wrench } from "lucide-react";
import type { Skill } from "@/lib/skills";

// Kategori + judul + deskripsi singkat (fixed, tampil sebagai kartu)
const categoryInfo = [
  {
    key: "frontend",
    title: "Frontend Development",
    subtitle: "Bikin tampilan website yang rapi & responsif.",
    Icon: Code2,
  },
  {
    key: "design",
    title: "Design & UI/UX",
    subtitle: "Desain antarmuka yang enak dilihat & dipakai.",
    Icon: Palette,
  },
  {
    key: "tools",
    title: "Tools & Backend",
    subtitle: "Tools pendukung dan dasar kerja backend.",
    Icon: Wrench,
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

interface SkillsProps {
  initialSkills?: Skill[];
}

export default function Skills({ initialSkills }: SkillsProps) {
  const [skills] = useState<Skill[]>(initialSkills ?? []);

  return (
    <section id="skills" className="section-pad relative overflow-hidden">
      <div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "var(--mauve)",
          opacity: 0.06,
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
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-[1px]" style={{ background: "var(--accent)" }} />
          <span
            className="text-[11px] tracking-[0.3em] uppercase font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            My Skills
          </span>
        </motion.div>

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-12 max-w-2xl"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-[3.2rem] leading-[1.1] font-medium"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--text)",
            }}
          >
            Tools yang saya
            <br />
            <span className="italic" style={{ color: "var(--accent)" }}>
              pakai sehari-hari.
            </span>
          </h2>
        </motion.div>

        {/* KARTU KATEGORI */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-4"
        >
          {categoryInfo.map((cat, i) => {
            const catSkills = skills.filter((s) => s.category === cat.key);
            const CatIcon = cat.Icon;

            return (
              <motion.article
                key={cat.key}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 overflow-hidden transition-colors duration-300 hover:border-[var(--accent)]"
              >
                {/* Nomor besar sebagai watermark */}
                <span
                  aria-hidden
                  className="absolute -top-2 right-4 text-[4.25rem] leading-none font-semibold select-none pointer-events-none"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    color: "var(--text)",
                    opacity: 0.07,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Meta: ikon + garis */}
                <div className="relative flex items-center gap-2.5">
                  <CatIcon
                    size={15}
                    className="shrink-0 text-[var(--text-muted)] transition-colors duration-300 group-hover:text-[var(--accent)]"
                  />
                  <span
                    className="h-px flex-1"
                    style={{ background: "var(--border)" }}
                  />
                </div>

                {/* Judul + deskripsi */}
                <h3
                  className="relative text-[1.4rem] leading-tight font-semibold mt-3.5"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    color: "var(--text)",
                  }}
                >
                  {cat.title}
                </h3>

                <p
                  className="relative text-[11.5px] mt-1.5 leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {cat.subtitle}
                </p>

                {/* Skill sebagai chip */}
                {catSkills.length > 0 ? (
                  <ul className="relative flex flex-wrap gap-1.5 mt-4">
                    {catSkills.map((skill) => (
                      <li key={skill.id}>
                        <span
                          className="inline-flex items-center whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--bg-soft)] px-2.5 py-1 text-[11px] leading-none font-medium transition-colors duration-300 hover:border-[var(--accent)]"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {skill.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    className="relative text-[11.5px] mt-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Belum ada skill di kategori ini.
                  </p>
                )}
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}