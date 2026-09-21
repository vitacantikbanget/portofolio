"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, type Project } from "@/lib/projects";

// Daftar kategori buat filter
const categories = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "uiux", label: "UI/UX" },
];

// Komponen isi — dipisah biar bisa dibungkus <Suspense>
function ProjectsContent() {
  // searchParams = baca ?category=... dari URL
  const searchParams = useSearchParams();
  // router = buat pindah halaman (ganti filter)
  const router = useRouter();
  // pathname = path sekarang (/projects)
  const pathname = usePathname();

  // State buat data project
  const [projects, setProjects] = useState<Project[]>([]);
  // State loading
  const [loading, setLoading] = useState(true);

  // Baca kategori dari URL — default "all"
  const activeCategory = searchParams.get("category") || "all";

  // Ambil data dari Supabase pas pertama buka
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Filter project sesuai kategori
  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Fungsi ganti filter — ubah URL
  const handleFilter = (value: string) => {
    if (value === "all") {
      router.push(pathname); // balik ke /projects (tanpa query)
    } else {
      router.push(`${pathname}?category=${value}`); // tambah ?category=...
    }
  };

  return (
    <>
      {/* ===== TOMBOL KEMBALI ===== */}
      <Link
        href="/"
        className="group inline-flex items-center gap-2 text-sm mb-10 transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-1"
        />
        Kembali ke Beranda
      </Link>

      {/* ===== JUDUL HALAMAN ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p
          className="text-[11px] tracking-[0.3em] uppercase mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          All Projects
        </p>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--text)",
          }}
        >
          Semua project
          <br />
          <span className="italic" style={{ color: "var(--accent)" }}>
            yang pernah saya buat.
          </span>
        </h1>
      </motion.div>

      {/* ===== TOMBOL FILTER ===== */}
      {/* All / Web / UI/UX */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex flex-wrap gap-2 mb-12"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => handleFilter(cat.value)}
              className="px-4 py-2 rounded-full text-sm font-medium border transition-all hover:-translate-y-0.5"
              style={{
                // Tombol aktif: background accent. Kalau gak: surface
                background: isActive ? "var(--accent)" : "var(--surface)",
                borderColor: isActive ? "var(--accent)" : "var(--border)",
                color: isActive ? "#fff" : "var(--text)",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </motion.div>

      {/* ===== ISI ===== */}
      {/* 3 kondisi: loading / kosong / ada data */}
      {loading ? (
        // Kondisi 1: masih loading
        <div
          className="text-center py-20 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Memuat data...
        </div>
      ) : filtered.length === 0 ? (
        // Kondisi 2: data kosong
        <div
          className="text-center py-20 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Belum ada project di kategori ini.
        </div>
      ) : (
        // Kondisi 3: ada data — tampilkan grid
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      )}
    </>
  );
}

// Wrapper — bungkus dengan Suspense
// (wajib karena useSearchParams butuh Suspense di Next.js 15+)
export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="container-custom">
        <Suspense
          fallback={
            <div
              className="text-center py-20 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Memuat...
            </div>
          }
        >
          <ProjectsContent />
        </Suspense>
      </div>
    </main>
  );
}