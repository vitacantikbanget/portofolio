import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { requireAdmin } from "../../_lib/admin-guard";
import SkillForm from "../SkillForm";
import { createSkill } from "../actions";

export const metadata = {
  title: "Tambah Skill Ã¢â‚¬â€ Admin Portfolio",
};

export default async function TambahSkillPage() {
  await requireAdmin();

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
            <Plus size={15} />
          </div>
          <h1
            className="text-base sm:text-lg font-semibold"
            style={{ color: "var(--text)" }}
          >
            Tambah Skill Baru
          </h1>
        </div>
        <p className="text-xs mb-6 pl-9.5" style={{ color: "var(--text-muted)" }}>
          Tambahkan keahlian teknis atau alat yang Anda kuasai untuk ditampilkan di halaman beranda.
        </p>

        <SkillForm action={createSkill} submitLabel="Simpan Skill" />
      </div>
    </div>
  );
}
