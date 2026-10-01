import { requireAdmin } from "../_lib/admin-guard";
import ProjectTable, { type ProjectItem } from "./ProjectTable";

export const metadata = {
  title: "Kelola Project Ã¢â‚¬â€ Admin Portfolio",
};

export default async function KelolaProyekPage() {
  const supabase = await requireAdmin();

  const { data: proyek, error } = await supabase
    .from("projects")
    .select("id, title, slug, category, description, image, technologies")
    .order("id", { ascending: true });

  if (error) {
    console.error("Gagal memuat projects:", error.message);
  }

  const list = (proyek ?? []) as ProjectItem[];

  return <ProjectTable projects={list} />;
}
