import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Pencil, ExternalLink } from "lucide-react";
import { requireAdmin } from "../../_lib/admin-guard";
import ProjectForm from "../ProjectForm";
import { updateProject } from "../actions";

export const metadata = {
  title: "Ubah Project Ã¢â‚¬â€ Admin Portfolio",
};

type Params = {
  params: Promise<{ id: string }>;
};

export default async function UbahProjectPage({ params }: Params) {
  const supabase = await requireAdmin();
  const { id } = await params;

  const projectId = Number(id);
  if (!Number.isInteger(projectId) || projectId <= 0) notFound();

  const { data: proyek, error } = await supabase
    .from("projects")
    .select("id, title, slug, category, description, long_description, technologies, image, link")
    .eq("id", projectId)
    .maybeSingle();

  if (error) {
    console.error("Gagal memuat project:", error.message);
  }
  if (!proyek) notFound();

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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: "var(--accent-soft)",
                color: "var(--accent)",
              }}
            >
              <Pencil size={15} />
            </div>
            <div>
              <h1
                className="text-base sm:text-lg font-semibold"
                style={{ color: "var(--text)" }}
              >
                Ubah Project: {proyek.title}
              </h1>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Halaman publik:{" "}
                <span className="font-mono text-[var(--text)]">/projects/{proyek.slug}</span>
              </p>
            </div>
          </div>

          <a
            href={`/projects/${proyek.slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs transition-all hover:scale-105"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface-2)",
              color: "var(--text)",
            }}
          >
            <ExternalLink size={12} />
            Lihat halaman publik
          </a>
        </div>

        <ProjectForm
          action={updateProject}
          submitLabel="Simpan Perubahan"
          values={{
            id: proyek.id,
            title: proyek.title,
            slug: proyek.slug,
            category: proyek.category,
            description: proyek.description,
            long_description: proyek.long_description ?? "",
            technologies: proyek.technologies ?? [],
            image: proyek.image,
            link: proyek.link ?? "",
          }}
        />
      </div>
    </div>
  );
}
