import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2, AlertTriangle } from "lucide-react";
import { requireAdmin } from "@/lib/admin-guard";
import { deleteProject } from "../../actions";

export const metadata = {
  title: "Konfirmasi Hapus Project — Admin Portfolio",
};

type Params = {
  params: Promise<{ id: string }>;
};

function TombolHapus() {
  return (
    <button
      type="submit"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-[1.02]"
      style={{ background: "#e05c5c", color: "#ffffff" }}
    >
      <Trash2 size={14} />
      Ya, hapus project ini
    </button>
  );
}

export default async function HapusProjectPage({ params }: Params) {
  const supabase = await requireAdmin();
  const { id } = await params;

  const projectId = Number(id);
  if (!Number.isInteger(projectId) || projectId <= 0) notFound();

  const { data: proyek, error } = await supabase
    .from("projects")
    .select("id, title, slug, category, description, technologies, image")
    .eq("id", projectId)
    .maybeSingle();

  if (error) {
    console.error("Gagal memuat project:", error.message);
  }
  if (!proyek) notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
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
        style={{
          background: "var(--surface)",
          borderColor: "#e05c5c44",
        }}
      >
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "#e05c5c18",
              color: "#e05c5c",
            }}
          >
            <AlertTriangle size={18} />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-semibold" style={{ color: "var(--text)" }}>
              Hapus Project
            </h1>
            <p className="text-xs" style={{ color: "#e05c5c" }}>
              Tindakan ini permanen dan tidak dapat dibatalkan.
            </p>
          </div>
        </div>

        <p className="text-xs my-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Apakah Anda yakin ingin menghapus data project berikut? Project ini akan langsung hilang dari portofolio publik.
        </p>

        {/* Ringkasan Proyek */}
        <div
          className="rounded-2xl border p-5 mb-6 space-y-2"
          style={{ background: "var(--bg-soft)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>
              {proyek.title}
            </p>
            <span
              className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            >
              {proyek.category === "web" ? "Web Dev" : "UI/UX"}
            </span>
          </div>

          <p className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
            /projects/{proyek.slug}
          </p>

          <p className="text-xs line-clamp-2" style={{ color: "var(--text-muted)" }}>
            {proyek.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-1">
            {((proyek.technologies as string[] | null) ?? []).map((t: string) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-md border"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                  color: "var(--text-muted)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-wrap items-center gap-3">
          <form action={deleteProject}>
            <input type="hidden" name="id" value={proyek.id} />
            <TombolHapus />
          </form>

          <Link
            href="/admin/proyek"
            className="inline-flex items-center px-5 py-2.5 rounded-xl border text-xs font-medium transition-all hover:scale-[1.02]"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface-2)",
              color: "var(--text)",
            }}
          >
            Batal, simpan saja
          </Link>
        </div>
      </div>
    </div>
  );
}
