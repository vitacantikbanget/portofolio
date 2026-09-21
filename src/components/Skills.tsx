"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Code2, Palette, Wrench } from "lucide-react";
import { getSkills, type Skill } from "@/lib/skills";

// Kategori dengan icon + subtitle (fixed)
const categoryInfo = [
  {
    key: "frontend",
    title: "Frontend Development",
    subtitle: "Bikin tampilan website",
    icon: Code2,
  },
  {
    key: "design",
    title: "Design & UI/UX",
    subtitle: "Desain tampilan & pengalaman",
    icon: Palette,
  },
  {
    key: "tools",
    title: "Tools & Backend",
    subtitle: "Tools pendukung & dasar backend",
    icon: Wrench,
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
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

        {/* CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {categoryInfo.map((cat, i) => {
            const CatIcon = cat.icon;
            // Filter skills by category
            const catSkills = skills.filter((s) => s.category === cat.key);

            return (
              <motion.div
                key={cat.key}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group relative p-6 rounded-2xl border overflow-hidden flex flex-col"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at top right, var(--accent-soft), transparent 70%)",
                  }}
                />

                <div className="relative flex flex-col h-full">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110"
                    style={{
                      background: "var(--accent-soft)",
                      color: "var(--accent)",
                    }}
                  >
                    <CatIcon size={20} />
                  </div>

                  <h4
                    className="text-lg font-medium mb-1"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      color: "var(--text)",
                    }}
                  >
                    {cat.title}
                  </h4>

                  <p
                    className="text-xs mb-5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {cat.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-auto">
                    {catSkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center gap-1.5 text-[13px]"
                      >
                        <span
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ background: "var(--accent)" }}
                        />
                        <span style={{ color: "var(--text)" }}>
                          {skill.name}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                <span
                  className="absolute top-5 right-5 text-[10px] tracking-widest"
                  style={{ color: "var(--text-muted)", opacity: 0.6 }}
                >
                  0{i + 1}
                </span>

                <span
                  className="absolute bottom-0 left-6 right-6 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: "var(--accent)" }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}