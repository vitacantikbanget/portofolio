import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2, AlertTriangle } from "lucide-react";
import { requireAdmin } from "../../../_lib/admin-guard";
import { deleteSkill } from "../../actions";

export const metadata = {
  title: "Konfirmasi Hapus Skill Ã¢â‚¬â€ Admin Portfolio",
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
      Ya, hapus skill ini
    </button>
  );
}

export default async function HapusSkillPage({ params }: Params) {
  const supabase = await requireAdmin();
  const { id } = await params;

  const skillId = Number(id);
  if (!Number.isInteger(skillId) || skillId <= 0) notFound();

  const { data: skill, error } = await supabase
    .from("skills")
    .select("id, name, category")
    .eq("id", skillId)
    .maybeSingle();

  if (error) {
    console.error("Gagal memuat skill:", error.message);
  }
  if (!skill) notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/skills"
        className="group inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-[var(--accent)]"
        style={{ color: "var(--text-muted)" }}
      >
        <ArrowLeft
          size={14}
          className="transition-transform group-hover:-translate-x-1"
        />
        Kembali ke daftar skills
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
              Hapus Skill
            </h1>
            <p className="text-xs" style={{ color: "#e05c5c" }}>
              Tindakan ini permanen dan tidak dapat dibatalkan.
            </p>
          </div>
        </div>

        <p className="text-xs my-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Apakah Anda yakin ingin menghapus keahlian berikut? Skill ini tidak akan lagi tampil di halaman beranda.
        </p>

        {/* Ringkasan Skill */}
        <div
          className="rounded-2xl border p-5 mb-6 space-y-2"
          style={{ background: "var(--bg-soft)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>
              {skill.name}
            </p>
            <span
              className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border capitalize"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            >
              {skill.category}
            </span>
          </div>

        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-wrap items-center gap-3">
          <form action={deleteSkill}>
            <input type="hidden" name="id" value={skill.id} />
            <TombolHapus />
          </form>

          <Link
            href="/admin/skills"
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
