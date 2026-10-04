import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { requireAdmin } from "../../_lib/admin-guard";
import SkillForm from "../SkillForm";
import { updateSkill } from "../actions";

export const metadata = {
  title: "Ubah Skill Ã¢â‚¬â€ Admin Portfolio",
};

type Params = {
  params: Promise<{ id: string }>;
};

export default async function UbahSkillPage({ params }: Params) {
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
    <div className="max-w-3xl mx-auto space-y-6">
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
            <Pencil size={15} />
          </div>
          <div>
            <h1
              className="text-base sm:text-lg font-semibold"
              style={{ color: "var(--text)" }}
            >
              Ubah Skill: {skill.name}
            </h1>
          </div>
        </div>
        <p className="text-xs mb-6 pl-9.5" style={{ color: "var(--text-muted)" }}>
          Perbarui nama atau kategori skill ini.
        </p>

        <SkillForm
          action={updateSkill}
          submitLabel="Simpan Perubahan"
          values={{
            id: skill.id,
            name: skill.name,
            category: skill.category,
          }}
        />
      </div>
    </div>
  );
}
