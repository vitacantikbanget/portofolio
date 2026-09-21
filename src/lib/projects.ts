import { supabase } from "./supabase";

// Tipe data project — aturan bentuk data dari Supabase
export type Project = {
  id: number;              // ID unik (auto dari Supabase)
  slug: string;            // URL slug
  title: string;           // Judul project
  category: "web" | "uiux"; // Cuma boleh 2 nilai
  description: string;     // Deskripsi singkat
  long_description: string; // Deskripsi panjang (pakai underscore)
  technologies: string[];  // Array teknologi
  image: string;           // Path gambar
  link: string;            // Link project
};

// Ambil SEMUA project dari Supabase
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")        // pilih tabel "projects"
    .select("*")             // ambil semua kolom
    .order("id", { ascending: true }); // urutkan dari ID terkecil

  // Kalau ada error → return array kosong
  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  // Kalau sukses → return data
  return data as Project[];
}

// Ambil 1 project berdasarkan slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug) // filter: WHERE slug = "..."
    .single();        // ambil 1 data aja (bukan array)

  // Kalau gak ketemu → return null
  if (error) return null;

  return data as Project;
}