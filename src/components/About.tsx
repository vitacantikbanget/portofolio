"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Bug } from "lucide-react";

// Data 3 hal yang lagi dipelajari
const learning = [
  {
    icon: Code2,
    title: "Frontend Development",
    desc: "HTML, CSS, JavaScript, React, Next.js, dan Tailwind CSS.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Belajar bikin tampilan yang enak dilihat dan gampang dipakai.",
  },
  {
    icon: Bug,
    title: "Software Testing",
    desc: "Belajar ngecek bug, nulis test case, dan automation dasar.",
  },
];

// Variants buat parent — atur jarak kemunculan anak
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12, // jeda antar anak 0.12 detik
      delayChildren: 0.1,    // jeda sebelum anak pertama
    },
  },
};

// Variants buat anak — animasi muncul (blur + geser naik)
const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div className="container-custom relative">
        {/* ================= HEADER ================= */}
        {/* Label kecil "About Me" dengan garis di kiri */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} // animasi cuma sekali
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
            About Me
          </span>
        </motion.div>

        {/* ================= MAIN GRID ================= */}
        {/* Layout 12 kolom: kiri 5, kanan 7 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          {/* KIRI — Heading besar */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <h2
              className="text-4xl sm:text-5xl lg:text-[3.2rem] leading-[1.1] font-medium"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--text)",
              }}
            >
              Still learning,
              <br />
              <span className="italic" style={{ color: "var(--accent)" }}>
                always building.
              </span>
            </h2>

            {/* Garis dekoratif + 2 titik */}
            <div className="mt-8 flex items-center gap-2">
              <span
                className="w-12 h-[2px]"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)", opacity: 0.5 }}
              />
            </div>
          </motion.div>

          {/* KANAN — Paragraf + info singkat */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 space-y-5 lg:pt-2"
          >
            {/* Paragraf 1 — teks utama */}
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--text)" }}
            >
              Saya pelajar jurusan Rekayasa Perangkat Lunak. Sehari-hari saya
              belajar bikin website — mulai dari desain tampilannya dulu, baru
              ngoding.
            </p>

            {/* Paragraf 2 — muted */}
            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Saya suka bagian ketika sebuah ide berubah jadi halaman yang bisa
              dipakai orang. Walaupun masih belajar, saya senang nyoba hal-hal
              baru dan lama-lama makin paham.
            </p>

            {/* Paragraf 3 — ada highlight "software testing" */}
            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Selain ngoding, saya juga tertarik sama{" "}
              <span className="font-medium" style={{ color: "var(--text)" }}>
                software testing
              </span>{" "}
              — soalnya saya penasaran gimana caranya mastiin website beneran
              jalan dengan baik, bukan cuma keliatan bagus.
            </p>

            {/* Info grid 2x2 — dipisah garis atas */}
            <div
              className="grid grid-cols-2 gap-x-6 gap-y-4 pt-6 mt-6 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Fokus
                </p>
                <p className="text-sm" style={{ color: "var(--text)" }}>
                  Web Development
                </p>
              </div>
              <div>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Sekarang
                </p>
                <p className="text-sm" style={{ color: "var(--text)" }}>
                  Pelajar RPL
                </p>
              </div>
              <div>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Tinggal di
                </p>
                <p className="text-sm" style={{ color: "var(--text)" }}>
                  Pasuruan
                </p>
              </div>
              <div>
                <p
                  className="text-[10px] tracking-[0.2em] uppercase mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Bahasa
                </p>
                <p className="text-sm" style={{ color: "var(--text)" }}>
                  Indonesia & English
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= SEDANG DIPELAJARI ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 lg:mt-28"
        >
          {/* Header section */}
          <motion.div variants={itemVariants} className="mb-10">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Sedang Dipelajari
            </p>
            <h3
              className="text-3xl sm:text-4xl font-medium"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--text)",
              }}
            >
              Hal-hal yang lagi saya tekuni
            </h3>
          </motion.div>

          {/* Grid 3 kartu */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {learning.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -6 }} // naik 6px saat hover
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="group relative p-6 rounded-2xl border overflow-hidden"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  {/* Glow saat hover — muncul dari pojok kanan atas */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at top right, var(--accent-soft), transparent 70%)",
                    }}
                  />

                  <div className="relative">
                    {/* Icon — muter + membesar saat hover */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110"
                      style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    {/* Judul */}
                    <h4
                      className="text-lg font-medium mb-2"
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        color: "var(--text)",
                      }}
                    >
                      {item.title}
                    </h4>

                    {/* Deskripsi */}
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Garis bawah — muncul dari kiri saat hover */}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ background: "var(--accent)" }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}