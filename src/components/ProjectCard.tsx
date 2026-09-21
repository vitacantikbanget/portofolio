"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

// Props yang diterima: data project + nomor urut
type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  return (
    // Wrapper animasi — muncul dari bawah + blur ke jelas
    // delay index * 0.1 = kartu muncul satu-satu (stagger)
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }} // animasi sekali aja
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      {/* Card — naik 4px saat hover */}
      <div
        className="group rounded-2xl border overflow-hidden transition-all hover:-translate-y-1"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* ===== GAMBAR ===== */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105" // zoom saat hover
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Badge kategori di pojok kiri atas */}
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase backdrop-blur-md border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            {project.category === "web" ? "Web" : "UI/UX"}
          </span>
        </div>

        {/* ===== ISI CARD ===== */}
        <div className="p-5">
          {/* Judul project */}
          <h3
            className="text-xl font-medium leading-snug mb-2"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--text)",
            }}
          >
            {project.title}
          </h3>

          {/* Deskripsi — maksimal 2 baris (line-clamp-2) */}
          <p
            className="text-sm leading-relaxed mb-4 line-clamp-2"
            style={{ color: "var(--text-muted)" }}
          >
            {project.description}
          </p>

          {/* Tag teknologi */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2 py-0.5 rounded-full border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Tombol "View Project" — link ke halaman detail */}
          {/* group/link = grup khusus biar arrow animasi sendiri */}
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
            style={{ color: "var(--accent)" }}
          >
            View Project
            {/* Arrow naik + geser kanan saat hover */}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}