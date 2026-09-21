import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug } from "@/lib/projects";

// Tipe params — Next.js 15+ pakai Promise
type Params = {
  params: Promise<{ slug: string }>;
};

// Set judul tab browser otomatis
export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  // Kalau project gak ada, tampilkan judul generic
  if (!project) return { title: "Project tidak ditemukan" };

  return {
    title: `${project.title} — Desvita Putri`,
    description: project.description,
  };
}

// Komponen utama halaman detail
export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  // Kalau project gak ketemu → tampilkan halaman 404
  if (!project) notFound();

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="container-custom">
        {/* ===== TOMBOL KEMBALI ===== */}
        {/* Arrow geser ke kiri saat hover */}
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm mb-10 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Kembali ke Projects
        </Link>

        {/* ===== KATEGORI KECIL ===== */}
        {/* Tampil "Web" atau "UI/UX" */}
        <div className="mb-5">
          <span
            className="text-[11px] tracking-[0.3em] uppercase font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            {project.category === "web" ? "Web" : "UI/UX"}
          </span>
        </div>

        {/* ===== JUDUL PROJECT ===== */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] mb-8 max-w-3xl"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--text)",
          }}
        >
          {project.title}
        </h1>

        {/* ===== GAMBAR BESAR ===== */}
        {/* Rasio 16:9, rounded, ada border */}
        <div
          className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border mb-16"
          style={{ borderColor: "var(--border)" }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority // load duluan
          />
        </div>

        {/* ===== INFO GRID 2 KOLOM ===== */}
        {/* Kiri: deskripsi (2/3). Kanan: tools + kategori (1/3) */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
          {/* ============ KIRI — DESKRIPSI ============ */}
          <div className="lg:col-span-2">
            <p
              className="text-[11px] tracking-[0.3em] uppercase font-medium mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              About The Project
            </p>

            <h2
              className="text-3xl sm:text-4xl font-medium mb-6"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--text)",
              }}
            >
              Background & Solution
            </h2>

            {/* Garis accent di bawah judul */}
            <div
              className="w-16 h-[2px] mb-6"
              style={{ background: "var(--accent)" }}
            />

            {/* Deskripsi panjang dari Supabase */}
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {project.long_description}
            </p>
          </div>

          {/* ============ KANAN — TOOLS + KATEGORI ============ */}
          <div className="space-y-10">
            {/* Bagian Tools */}
            <div>
              <p
                className="text-[11px] tracking-[0.3em] uppercase font-medium mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                Tools
              </p>
              <div
                className="w-16 h-[2px] mb-6"
                style={{ background: "var(--accent)" }}
              />
              {/* Loop tag teknologi */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3.5 py-2 rounded-full border"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      background: "var(--surface)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bagian Kategori */}
            <div>
              <p
                className="text-[11px] tracking-[0.3em] uppercase font-medium mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                Category
              </p>
              <div
                className="w-16 h-[2px] mb-6"
                style={{ background: "var(--accent)" }}
              />
              <p className="text-sm" style={{ color: "var(--text)" }}>
                {project.category === "web"
                  ? "Web Development"
                  : "UI/UX Design"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}