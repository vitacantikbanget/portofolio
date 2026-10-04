import { z } from "zod";

export const KATEGORI = [
  { value: "web", label: "Web Development" },
  { value: "uiux", label: "UI/UX Design" },
] as const;

export type Kategori = (typeof KATEGORI)[number]["value"];

// Bentuk data yang siap masuk kolom projects.
export type ProyekInput = {
  title: string;
  slug: string;
  category: Kategori;
  description: string;
  long_description: string | null;
  technologies: string[];
  image: string;
  link: string | null;
};

export type ProyekState = {
  error: string | null;
  fieldErrors: Record<string, string>;
};

export const initialProyekState: ProyekState = {
  error: null,
  fieldErrors: {},
};

// Ubah judul jadi slug: "MyApp Project" -> "myapp-project".
// Aksen dibuang dulu supaya "NihonGo Kurabu" -> "nihongo-kurabu".
export function toSlug(judul: string) {
  return judul
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const skema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Judul wajib diisi.")
    .max(120, "Judul maksimal 120 karakter."),
  // Boleh kosong di form karena akan diturunkan dari title.
  slug: z
    .string()
    .trim()
    .max(120, "Slug maksimal 120 karakter.")
    .regex(/^[a-z0-9-]*$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung."),
  category: z
    .string()
    .trim()
    .refine((v) => v === "web" || v === "uiux", "Kategori harus web atau uiux."),
  description: z
    .string()
    .trim()
    .min(1, "Deskripsi singkat wajib diisi.")
    .max(300, "Deskripsi singkat maksimal 300 karakter."),
  long_description: z
    .string()
    .trim()
    .max(5000, "Deskripsi panjang maksimal 5000 karakter."),
  // technologies masuk dari database sebagai text[], jadi di form berupa
  // satu string dipisah koma. lihat parseProyek di bawah.
  technologies: z
    .string()
    .trim()
    .max(300, "Daftar teknologi maksimal 300 karakter."),
  // Wajib, dan wajib diawali "/". next.config.ts tidak punya
  // images.remotePatterns, jadi path eksternal akan ditolak next/image.
  // Halaman publik juga memanggil <Image src={project.image}> tanpa
  // penjaga null, jadi image tidak boleh kosong.
  image: z
    .string()
    .trim()
    .min(1, "Gambar proyek wajib diunggah."),
  // link tidak dirender di halaman publik mana pun, jadi boleh kosong.
  link: z
    .string()
    .trim()
    .max(500, "Link maksimal 500 karakter.")
    .refine(
      (v) => v === "" || /^https?:\/\/\S+$/.test(v),
      "Link harus diawali http:// atau https://",
    ),
});

// FormData selalu string, tapi secara tipe bisa File.ambil string saja.
function ambilString(formData: FormData, key: string) {
  const nilai = formData.get(key);
  return typeof nilai === "string" ? nilai : "";
}

export function parseProyek(
  formData: FormData,
): { data: ProyekInput; fieldErrors: Record<string, string> } | {
  error: string;
  fieldErrors: Record<string, string>;
} {
  const hasil = skema.safeParse({
    title: ambilString(formData, "title"),
    slug: ambilString(formData, "slug").toLowerCase(),
    category: ambilString(formData, "category"),
    description: ambilString(formData, "description"),
    long_description: ambilString(formData, "long_description"),
    technologies: ambilString(formData, "technologies"),
    image: ambilString(formData, "image"),
    link: ambilString(formData, "link"),
  });

  if (!hasil.success) {
    // Rakit error per-field supaya form bisa menandai input yang salah,
    // bukan cuma menampilkan satu pesan generik di atas.
    const fieldErrors: Record<string, string> = {};
    for (const issue of hasil.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { error: "Periksa lagi kolom yang ditandai.", fieldErrors };
  }

  const isi = hasil.data;

  // Slom kosong -> turunkan dari judul.
  const slug = isi.slug || toSlug(isi.title);
  if (!slug) {
    return {
      error: "Slug tidak bisa dibuat dari judul ini. Isi slug manual.",
      fieldErrors: { slug: "Slug wajib diisi." },
    };
  }

  // "Next.js, TypeScript , Tailwind" -> ["Next.js","TypeScript","Tailwind"]
  // Kalau kosong hasilnya [] - BUKAN null. Halaman publik memanggil
  // project.technologies.map(...) tanpa penjaga null, jadi null akan
  // membuat halaman detail 500.
  const technologies = isi.technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    data: {
      title: isi.title,
      slug,
      category: isi.category as Kategori,
      description: isi.description,
      long_description: isi.long_description || null,
      technologies,
      image: isi.image,
      link: isi.link || null,
    },
    fieldErrors: {},
  };
}
