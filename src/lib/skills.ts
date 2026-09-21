import { supabase } from "./supabase";

// Tipe data skill — aturan bentuk data dari Supabase
export type Skill = {
  id: number;      // ID unik (auto)
  name: string;    // Nama skill (HTML, CSS, dll)
  category: string; // Kategori (frontend, design, tools)
};

// Ambil SEMUA skill dari Supabase
export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from("skills")           // pilih tabel "skills"
    .select("*")              // ambil semua kolom
    .order("id", { ascending: true }); // urutkan dari ID terkecil

  // Kalau ada error → return array kosong
  if (error) {
    console.error("Error fetching skills:", error);
    return [];
  }

  // Kalau sukses → return data
  return data as Skill[];
}