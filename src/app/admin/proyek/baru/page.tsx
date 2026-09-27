import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin-guard";
import ProjectForm from "../ProjectForm";
import { createProject } from "../actions";

export const metadata = {
  title: "Tambah Project — Admin Portfolio",
};

export default async function TambahProjectPage() {
  await requireAdmin();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/admin/proyek"
        className="group inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-[var(--accent)]"
        style={{ color: "var(--text-muted)" }}
      >
        <ArrowLeft
          size={14}
          className="transition-transform group-hover:-translate-x-1"
        />
        Kembali ke daftar project
      </Link>

      <div
        className="rounded-3xl border p-6 sm:p-8"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2.5 mb-1.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent)",
            }}
          >
            <Plus size={15} />
          </div>
          <h1
            className="text-base sm:text-lg font-semibold"
            style={{ color: "var(--text)" }}
          >
            Tambah Project Baru
          </h1>
        </div>
        <p className="text-xs mb-6 pl-9.5" style={{ color: "var(--text-muted)" }}>
          Isi informasi project untuk ditampilkan di website portofolio publik. Slug otomatis dibuat jika dikosongkan.
        </p>

        <ProjectForm action={createProject} submitLabel="Simpan Project" />
      </div>
    </div>
  );
}
