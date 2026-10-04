"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { getSkills, type Skill } from "@/lib/skills";

// Kategori + judul + deskripsi singkat (fixed, tampil sebagai kartu)
const categoryInfo = [
  {
    key: "frontend",
    title: "Frontend Development",
    subtitle: "Bikin tampilan website yang rapi & responsif.",
  },
  {
    key: "design",
    title: "Design & UI/UX",
    subtitle: "Desain antarmuka yang enak dilihat & dipakai.",
  },
  {
    key: "tools",
    title: "Tools & Backend",
    subtitle: "Tools pendukung dan dasar kerja backend.",
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
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSkills();
      setSkills(data);
    };
    fetchData();
  }, []);

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
            My Skills
          </span>
        </motion.div>

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-14 max-w-2xl"
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
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {categoryInfo.map((cat, i) => {
            const catSkills = skills.filter((s) => s.category === cat.key);

            return (
              <motion.article
                key={cat.key}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative rounded-2xl border p-6 flex flex-col transition-colors duration-300 hover:!border-[var(--accent)]"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                {/* Nomor */}
                <span
                  className="text-[11px] tracking-[0.2em] font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Judul + deskripsi */}
                <h3
                  className="text-2xl leading-tight font-semibold mt-3"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    color: "var(--text)",
                  }}
                >
                  {cat.title}
                </h3>

                <p
                  className="text-xs mt-2 leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {cat.subtitle}
                </p>

                {/* Daftar skill */}
                {catSkills.length > 0 ? (
                  <ul
                    className="mt-6 pt-5 space-y-2.5 border-t"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {catSkills.map((skill) => (
                      <li
                        key={skill.id}
                        className="flex items-center gap-2.5 text-sm"
                        style={{ color: "var(--text)" }}
                      >
                        <span
                          className="h-1 w-1 rounded-full shrink-0"
                          style={{ background: "var(--accent)" }}
                        />
                        <span className="truncate">{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    className="mt-6 pt-5 border-t text-sm"
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