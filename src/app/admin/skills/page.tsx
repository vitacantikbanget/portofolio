import { requireAdmin } from "@/lib/admin-guard";
import SkillTable from "./SkillTable";
import type { Skill } from "@/lib/skills";

export const metadata = {
  title: "Kelola Skills — Admin Portfolio",
};

export default async function SkillsPage() {
  const supabase = await requireAdmin();

  const { data: skills, error } = await supabase
    .from("skills")
    .select("id, name, category, level, icon")
    .order("id", { ascending: true });

  if (error) {
    console.error("Gagal memuat skills:", error.message);
  }

  const list = (skills ?? []) as Skill[];

  return <SkillTable skills={list} />;
}
