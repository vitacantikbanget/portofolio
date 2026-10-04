"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  RotateCcw,
  Pencil,
  Trash2,
  Plus,
  ExternalLink,
  Code2,
  Palette,
  Wrench,
  Sparkles,
} from "lucide-react";
import type { Skill } from "@/lib/skills";
import { SKILL_CATEGORIES } from "@/lib/skill-form";

type Props = {
  skills: Skill[];
};

export default function SkillTable({ skills }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const totalCount = skills.length;
  const frontendCount = useMemo(
    () => skills.filter((s) => s.category === "frontend").length,
    [skills],
  );
  const designCount = useMemo(
    () => skills.filter((s) => s.category === "design").length,
    [skills],
  );
  const toolsCount = useMemo(
    () => skills.filter((s) => s.category === "tools").length,
    [skills],
  );

  const filteredSkills = useMemo(() => {
    return skills.filter((s) => {
      const matchCategory =
        categoryFilter === "all" || s.category === categoryFilter;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCategory;

      const matchText =
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q);

      return matchCategory && matchText;
    });
  }, [skills, searchQuery, categoryFilter]);

  const isFiltered = searchQuery !== "" || categoryFilter !== "all";

  const handleReset = () => {
    setSearchQuery("");
    setCategoryFilter("all");
  };

  const getCategoryLabel = (cat: string) =>
    SKILL_CATEGORIES.find((c) => c.value === cat)?.label ?? cat;

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
            <Sparkles size={12} />
            Daftar Keahlian
          </span>

          <h1
            className="text-3xl sm:text-4xl font-medium leading-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--text)",
            }}
          >
            Kelola{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>
              Skills
            </span>
          </h1>

          <p
            className="text-xs sm:text-sm mt-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            Keahlian teknis dan perangkat lunak yang tampil di beranda portfolio.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="/#skills"
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
            Lihat di Beranda
          </a>

          <Link
            href="/admin/skills/baru"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-[1.02]"
            style={{ background: "var(--accent)", color: "#ffffff" }}
          >
            <Plus size={14} />
            + Tambah Skill
          </Link>
        </div>
      </div>

      {/* ====== 4 KARTU STATISTIK ====== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div
          className="rounded-2xl border p-4"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] tracking-wider uppercase font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Total Skills
            </span>
            <Sparkles size={14} style={{ color: "var(--accent)" }} />
          </div>
          <p className="text-2xl font-semibold" style={{ color: "var(--text)" }}>
            {totalCount}
          </p>
          <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
            Semua kategori
          </p>
        </div>

        <div
          className="rounded-2xl border p-4"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] tracking-wider uppercase font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Frontend
            </span>
            <Code2 size={14} style={{ color: "var(--accent)" }} />
          </div>
          <p className="text-2xl font-semibold" style={{ color: "var(--text)" }}>
            {frontendCount}
          </p>
          <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
            Web Development
          </p>
        </div>

        <div
          className="rounded-2xl border p-4"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] tracking-wider uppercase font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              UI/UX Design
            </span>
            <Palette size={14} style={{ color: "var(--accent)" }} />
          </div>
          <p className="text-2xl font-semibold" style={{ color: "var(--text)" }}>
            {designCount}
          </p>
          <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
            Design &amp; Prototyping
          </p>
        </div>

        <div
          className="rounded-2xl border p-4"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] tracking-wider uppercase font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Tools &amp; Backend
            </span>
            <Wrench size={14} style={{ color: "var(--accent)" }} />
          </div>
          <p className="text-2xl font-semibold" style={{ color: "var(--text)" }}>
            {toolsCount}
          </p>
          <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
            Tools pendukung
          </p>
        </div>
      </div>

      {/* ====== FILTER BAR ====== */}
      <div
        className="rounded-2xl border p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
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
              placeholder="Cari skill atau kategori..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs outline-none transition-all focus:border-[var(--accent)]"
              style={{
                background: "var(--bg-soft)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

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
            {SKILL_CATEGORIES.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>

          {isFiltered && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs transition-all hover:scale-105"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface-2)",
                color: "var(--text-muted)",
              }}
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>

        <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          Menampilkan <span className="font-semibold text-[var(--text)]">{filteredSkills.length}</span> dari {totalCount} skill
        </div>
      </div>

      {/* ====== TABEL DAFTAR SKILL ====== */}
      <div
        className="rounded-3xl border overflow-hidden"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        {filteredSkills.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm mb-3" style={{ color: "var(--text)" }}>
              {isFiltered
                ? "Tidak ada skill yang cocok dengan pencarian Anda."
                : "Belum ada skill yang tersimpan."}
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
                Kembalikan semua skill
              </button>
            ) : (
              <Link
                href="/admin/skills/baru"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium"
                style={{ background: "var(--accent)", color: "#ffffff" }}
              >
                <Plus size={14} />
                Tambah skill pertama
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
                    Nama Skill
                  </th>
                  <th
                    className="text-[10px] tracking-[0.2em] uppercase font-normal px-5 py-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Kategori
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
                {filteredSkills.map((s, index) => {
                  return (
                    <tr
                      key={s.id}
                      className="transition-colors hover:bg-[var(--bg-soft)]"
                    >
                      <td
                        className="px-5 py-3.5 align-middle font-mono text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {index + 1}
                      </td>

                      <td className="px-5 py-3.5 align-middle">
                        <p
                          className="font-medium text-sm"
                          style={{ color: "var(--text)" }}
                        >
                          {s.name}
                        </p>
                      </td>

                      <td className="px-5 py-3.5 align-middle whitespace-nowrap">
                        <span
                          className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full border whitespace-nowrap"
                          style={{
                            borderColor: "var(--border)",
                            background: "var(--bg-soft)",
                            color: "var(--text-muted)",
                          }}
                        >
                          {getCategoryLabel(s.category)}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 align-middle text-right whitespace-nowrap">
                        <div className="flex items-center gap-1.5 justify-end">
                          <Link
                            href={`/admin/skills/${s.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all hover:scale-105"
                            style={{
                              borderColor: "var(--border)",
                              background: "var(--surface-2)",
                              color: "var(--text)",
                            }}
                          >
                            <Pencil size={13} />
                            Ubah
                          </Link>

                          <Link
                            href={`/admin/skills/${s.id}/hapus`}
                            className="p-1.5 rounded-xl border text-xs transition-all hover:scale-105"
                            style={{
                              borderColor: "#e05c5c44",
                              color: "#e05c5c",
                              background: "#e05c5c0f",
                            }}
                            title="Hapus skill"
                          >
                            <Trash2 size={13} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
