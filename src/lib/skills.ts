import { supabase } from "./supabase";

// Tipe data skill — aturan bentuk data dari Supabase
export type Skill = {
  id: number;           // ID unik (auto)
  name: string;         // Nama skill (HTML, CSS, Next.js, dll)
  category: "frontend" | "design" | "tools" | string; // Kategori
  level?: number | null; // Tingkat penguasaan (1-100)
  icon?: string | null;  // Nama ikon Lucide (opsional)
};

// Ambil SEMUA skill dari Supabase
export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching skills:", error);
    return [];
  }

  return (data ?? []) as Skill[];
}