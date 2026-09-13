"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-2xl border overflow-hidden transition-all hover:-translate-y-1"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Category badge */}
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

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3
              className="text-xl font-medium leading-snug"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--text)",
              }}
            >
              {project.title}
            </h3>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rotate-45"
              style={{
                background: "var(--accent-soft)",
                color: "var(--accent)",
              }}
            >
              <ArrowUpRight size={14} />
            </div>
          </div>

          <p
            className="text-sm leading-relaxed mb-4 line-clamp-2"
            style={{ color: "var(--text-muted)" }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
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
        </div>
      </a>
    </motion.div>
  );
}