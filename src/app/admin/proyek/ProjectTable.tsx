"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  RotateCcw,
  Pencil,
  Trash2,
  Eye,
  Plus,
  ExternalLink,
  FolderKanban,
  Code2,
  Sparkles,
  Layers,
} from "lucide-react";

export type ProjectItem = {
  id: number;
  title: string;
  slug: string;
  category: "web" | "uiux";
  description: string;
  technologies: string[];
  image: string;
};

type Props = {
  projects: ProjectItem[];
};

export default function ProjectTable({ projects }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Hitungan statistik real
  const totalCount = projects.length;
  const webCount = useMemo(
    () => projects.filter((p) => p.category === "web").length,
    [projects],
  );
  const uiuxCount = useMemo(
    () => projects.filter((p) => p.category === "uiux").length,
    [projects],
  );
  const uniqueTechCount = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      (p.technologies || []).forEach((t) => set.add(t.trim().toLowerCase()));
    });
    return set.size;
  }, [projects]);

  // Filter dinamis
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory =
        categoryFilter === "all" || p.category === categoryFilter;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCategory;

      const matchText =
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.technologies &&
          p.technologies.some((t) => t.toLowerCase().includes(q)));

      return matchCategory && matchText;
    });
  }, [projects, searchQuery, categoryFilter]);

  const isFiltered = searchQuery !== "" || categoryFilter !== "all";

  const handleReset = () => {
    setSearchQuery("");
    setCategoryFilter("all");
  };

  return (
    <div className="space-y-6">
      {/* ====== HEADER & ACTION BUTTONS ====== */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span
            className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border mb-3"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
              background: "var(--surface)",
            }}
          >
            <FolderKanban size={12} />
            Katalog Proyek
          </span>

          <h1
            className="text-3xl sm:text-4xl font-medium leading-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--text)",
            }}
          >
            Admin{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>
              Portfolio
            </span>
          </h1>

          <p
            className="text-xs sm:text-sm mt-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            Kelola proyek yang tampil di website publik.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="/projects"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all hover:scale-[1.02]"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface-2)",
              color: "var(--text)",
            }}
          >
            <ExternalLink size={13} />
            Lihat Website
          </a>

          <Link
            href="/admin/proyek/baru"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-[1.02]"
            style={{ background: "var(--accent)", color: "#ffffff" }}
          >
            <Plus size={14} />
            + Tambah Project Baru
          </Link>
        </div>
      </div>

      {/* ====== 4 KARTU STATISTIK RINGKAS ====== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div
          className="rounded-2xl border p-4"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] tracking-wider uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Total Project
            </span>
            <FolderKanban size={14} style={{ color: "var(--accent)" }} />
          </div>
          <p
            className="text-2xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            {totalCount}
          </p>
          <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
            Proyek tersimpan
          </p>
        </div>

        <div
          className="rounded-2xl border p-4"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] tracking-wider uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Web Dev
            </span>
            <Code2 size={14} style={{ color: "var(--accent)" }} />
          </div>
          <p
            className="text-2xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            {webCount}
          </p>
          <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
            Kategori Website
          </p>
        </div>

        <div
          className="rounded-2xl border p-4"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] tracking-wider uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              UI/UX Design
            </span>
            <Layers size={14} style={{ color: "var(--accent)" }} />
          </div>
          <p
            className="text-2xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            {uiuxCount}
          </p>
          <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
            Kategori Desain Antarmuka
          </p>
        </div>

        <div
          className="rounded-2xl border p-4"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] tracking-wider uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Tech Stack
            </span>
            <Sparkles size={14} style={{ color: "var(--accent)" }} />
          </div>
          <p
            className="text-2xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            {uniqueTechCount}
          </p>
          <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
            Teknologi unik
          </p>
        </div>
      </div>

      {/* ====== FILTER BAR ====== */}
      <div
        className="rounded-2xl border p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul, slug, teknologi..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs outline-none transition-all focus:border-[var(--accent)]"
              style={{
                background: "var(--bg-soft)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border text-xs outline-none cursor-pointer transition-all"
            style={{
              background: "var(--bg-soft)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <option value="all">Semua Kategori</option>
            <option value="web">Web Development</option>
            <option value="uiux">UI/UX Design</option>
          </select>

          {/* Reset Button */}
          {isFiltered && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs transition-all hover:scale-105"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface-2)",
                color: "var(--text-muted)",
              }}
              title="Reset pencarian dan filter"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>

        <div
          className="text-[11px] tracking-wide"
          style={{ color: "var(--text-muted)" }}
        >
          Menampilkan <span className="font-semibold text-[var(--text)]">{filteredProjects.length}</span> dari {totalCount} project
        </div>
      </div>

      {/* ====== TABEL PROYEK ====== */}
      <div
        className="rounded-3xl border overflow-hidden"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm mb-3" style={{ color: "var(--text)" }}>
              {isFiltered
                ? "Tidak ada project yang cocok dengan pencarian Anda."
                : "Belum ada project yang tersimpan."}
            </p>
            {isFiltered ? (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-medium"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface-2)",
                  color: "var(--text)",
                }}
              >
                <RotateCcw size={13} />
                Kembalikan semua project
              </button>
            ) : (
              <Link
                href="/admin/proyek/baru"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium"
                style={{ background: "var(--accent)", color: "#ffffff" }}
              >
                <Plus size={14} />
                Tambah project pertama
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th
                    className="text-[10px] tracking-[0.2em] uppercase font-normal px-5 py-4 w-12"
                    style={{ color: "var(--text-muted)" }}
                  >
                    No
                  </th>
                  <th
                    className="text-[10px] tracking-[0.2em] uppercase font-normal px-5 py-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Project
                  </th>
                  <th
                    className="text-[10px] tracking-[0.2em] uppercase font-normal px-5 py-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Kategori
                  </th>
                  <th
                    className="text-[10px] tracking-[0.2em] uppercase font-normal px-5 py-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Teknologi
                  </th>
                  <th
                    className="text-[10px] tracking-[0.2em] uppercase font-normal px-5 py-4 text-right"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                {filteredProjects.map((p, index) => (
                  <tr
                    key={p.id}
                    className="transition-colors hover:bg-[var(--bg-soft)]"
                  >
                    {/* No */}
                    <td
                      className="px-5 py-4 align-middle font-mono text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {index + 1}
                    </td>

                    {/* Project: Image thumbnail + Title + Slug */}
                    <td className="px-5 py-4 align-middle">
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-12 h-12 rounded-xl border overflow-hidden shrink-0 relative flex items-center justify-center font-bold text-xs"
                          style={{
                            background: "var(--bg-soft)",
                            borderColor: "var(--border)",
                            color: "var(--accent)",
                          }}
                        >
                          {p.image?.startsWith("/") ? (
                            <Image
                              src={p.image}
                              alt={p.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            p.category.toUpperCase()
                          )}
                        </div>
                        <div className="min-w-0">
                          <p
                            className="font-medium text-sm leading-tight truncate"
                            style={{ color: "var(--text)" }}
                          >
                            {p.title}
                          </p>
                          <p
                            className="text-[11px] font-mono mt-0.5"
                            style={{ color: "var(--text-muted)" }}
                          >
                            /projects/{p.slug}
                          </p>
                          {p.description && (
                            <p
                              className="text-xs line-clamp-1 mt-1 max-w-md"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {p.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Kategori Badge */}
                    <td className="px-5 py-4 align-middle whitespace-nowrap">
                      <span
                        className="inline-block text-[11px] font-medium px-3 py-1 rounded-full border capitalize"
                        style={{
                          borderColor:
                            p.category === "web"
                              ? "var(--accent)"
                              : "var(--mauve)",
                          background:
                            p.category === "web"
                              ? "var(--accent-soft)"
                              : "var(--lavender)",
                          color:
                            p.category === "web"
                              ? "var(--accent)"
                              : "var(--mauve)",
                        }}
                      >
                        {p.category === "web" ? "Web Dev" : "UI/UX Design"}
                      </span>
                    </td>

                    {/* Teknologi */}
                    <td
                      className="px-5 py-4 align-middle text-xs max-w-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <div className="flex flex-wrap gap-1">
                        {(p.technologies ?? []).length > 0 ? (
                          p.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] px-2 py-0.5 rounded-md border"
                              style={{
                                borderColor: "var(--border)",
                                background: "var(--bg-soft)",
                                color: "var(--text)",
                              }}
                            >
                              {tech}
                            </span>
                          ))
                        ) : (
                          <span style={{ color: "var(--text-muted)" }}>-</span>
                        )}
                      </div>
                    </td>

                    {/* Aksi */}
                    <td className="px-5 py-4 align-middle text-right whitespace-nowrap">
                      <div className="flex items-center gap-1.5 justify-end">
                        {/* Lihat publik */}
                        <a
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl border text-xs transition-all hover:scale-105"
                          style={{
                            borderColor: "var(--border)",
                            background: "var(--surface-2)",
                            color: "var(--text)",
                          }}
                          title="Lihat di website publik"
                        >
                          <Eye size={14} />
                        </a>

                        {/* Ubah */}
                        <Link
                          href={`/admin/proyek/${p.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all hover:scale-105"
                          style={{
                            borderColor: "var(--border)",
                            background: "var(--surface-2)",
                            color: "var(--text)",
                          }}
                          title="Ubah data project"
                        >
                          <Pencil size={13} />
                          Ubah
                        </Link>

                        {/* Hapus */}
                        <Link
                          href={`/admin/proyek/${p.id}/hapus`}
                          className="p-2 rounded-xl border text-xs transition-all hover:scale-105"
                          style={{
                            borderColor: "#e05c5c44",
                            color: "#e05c5c",
                            background: "#e05c5c0f",
                          }}
                          title="Hapus project"
                        >
                          <Trash2 size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
        Catatan: File gambar disimpan di dalam folder <code>public/</code>. Pastikan path gambar diawali dengan garis miring (contoh: <code>/project-1.png</code>).
      </p>
    </div>
  );
}
