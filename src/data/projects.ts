// Tipe data project — aturan bentuk data project
export type Project = {
  slug: string;           // URL unik (contoh: "manajemen-perpustakaan")
  title: string;          // Judul project
  category: "web" | "uiux"; // Cuma boleh "web" atau "uiux"
  description: string;    // Deskripsi singkat
  longDescription: string; // Deskripsi panjang
  technologies: string[]; // Array teknologi (bisa banyak)
  image: string;          // Path gambar
  link: string;           // Link ke project
};

// Data semua project — array of object
export const projects: Project[] = [
  {
    slug: "manajemen-perpustakaan",
    title: "Manajemen Perpustakaan",
    category: "web",
    description:
      "Aplikasi web untuk mengelola data buku, peminjaman, dan pengembalian.",
    longDescription:
      "Manajemen Perpustakaan adalah aplikasi web yang dibuat untuk membantu proses pencatatan buku, peminjaman, dan pengembalian di perpustakaan. Dibangun menggunakan Next.js, Supabase sebagai database, dan Tailwind CSS untuk tampilan. Fitur utama: kelola buku, kelola anggota, peminjaman, pengembalian, dan laporan bulanan.",
    technologies: ["Next.js", "Supabase", "Tailwind CSS"],
    image: "/manajemen perpustakaan.png", // ⚠️ Ada spasi — sebaiknya pakai strip (-)
    link: "https://manajemen-perpustakaan-sandy.vercel.app",
  },
  {
    slug: "belajar-perkalian",
    title: "Website Belajar Perkalian",
    category: "web",
    description:
      "Website interaktif untuk anak-anak belajar perkalian dengan cara menyenangkan.",
    longDescription:
      "Website Belajar Perkalian dibuat agar anak-anak bisa belajar perkalian dengan cara yang menyenangkan. Fokus utama project ini adalah tampilan yang ramah anak dan interaksi sederhana. Dibuat menggunakan HTML, CSS, dan JavaScript vanilla, dengan pendekatan Tailwind CSS untuk styling.",
    technologies: ["Tailwind CSS", "JavaScript"],
    image: "/mtk3sd.png",
    link: "https://vitacantikbanget.github.io/belajar-perkalian-SD/mtk",
  },
  {
    slug: "myapp",
    title: "MyApp",
    category: "web",
    description:
      "Eksperimen membuat aplikasi fullstack dengan Next.js dan Supabase.",
    longDescription:
      "MyApp adalah eksperimen saya untuk mempelajari cara membuat aplikasi fullstack menggunakan Next.js App Router dan Supabase sebagai backend. Di sini saya belajar tentang routing, authentication, dan integrasi database.",
    technologies: ["Next.js", "Supabase"],
    image: "/nextjsv2.png",
    link: "https://nextjs-v2-fbui.vercel.app/",
  },
  {
    slug: "safereport",
    title: "SafeReport",
    category: "uiux",
    description:
      "Desain UI/UX aplikasi pelaporan kejadian tidak aman di lingkungan sekolah.",
    longDescription:
      "SafeReport adalah project desain UI/UX berupa aplikasi mobile untuk melaporkan kejadian tidak aman di lingkungan sekolah secara anonim. Dibuat menggunakan Figma, mulai dari riset, wireframe, hingga prototype yang bisa diuji. Fokus utama: kemudahan pelaporan dan privasi pelapor.",
    technologies: ["Figma", "UI/UX Design"],
    image: "/safereport.png",
    link: "https://www.figma.com/design/nunI3SykyQcv9ZMpVIrlUS/Tugas-Pak-Sholeh-SafeReport?node-id=0-1&t=N333JAyed4XXOfvA-1",
  },
];

// Daftar kategori buat filter di halaman /projects
export const categories = [
  { value: "all", label: "All" },   // semua project
  { value: "web", label: "Web" },   // cuma web
  { value: "uiux", label: "UI/UX" }, // cuma ui/ux
];