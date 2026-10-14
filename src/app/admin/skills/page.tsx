import { requireAdmin } from "../_lib/admin-guard";
import SkillTable from "./SkillTable";
import type { Skill } from "@/lib/skills";

export const metadata = {
  title: "Kelola Keahlian — Admin Portofolio",
};

export default async function SkillsPage() {
  const supabase = await requireAdmin();

  const { data: skills, error } = await supabase
    .from("skills")
    .select("id, name, category")
    .order("id", { ascending: false });

  if (error) {
    console.error("Gagal memuat skills:", error.message);
  }

  const list = (skills ?? []) as Skill[];

  return <SkillTable skills={list} />;
}
