export type Project = {
  slug: string;
  title: string;
  category: "web" | "uiux";
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  link: string;
};

export const projects: Project[] = [
  {
    slug: "manajemen-perpustakaan",
    title: "Manajemen Perpustakaan",
    category: "web",
    description:
      "Aplikasi web untuk mengelola data buku, peminjaman, dan pengembalian.",
    longDescription:
      "Manajemen Perpustakaan adalah aplikasi web yang dibuat untuk membantu proses pencatatan buku, peminjaman, dan pengembalian di perpustakaan. Dibangun menggunakan Next.js, Supabase sebagai database, dan Tailwind CSS untuk tampilan.",
    technologies: ["Next.js", "Supabase", "Tailwind CSS"],
    image: "/manajemen perpustakaan.png",
    link: "https://manajemen-perpustakaan-sandy.vercel.app",
  },
  {
    slug: "belajar-perkalian",
    title: "Website Belajar Perkalian",
    category: "web",
    description:
      "Website interaktif untuk anak-anak belajar perkalian dengan cara menyenangkan.",
    longDescription:
      "Website Belajar Perkalian dibuat agar anak-anak bisa belajar perkalian dengan cara yang menyenangkan. Fokus utama project ini adalah tampilan yang ramah anak dan interaksi sederhana.",
    technologies: ["Tailwind CSS", "JavaScript"],
    image: "/mtk3sd.png",
    link: "https://vitacantikbanget.github.io/belajar-perkalian-SD/mtk",
  },
  {
    slug: "MyApp",
    title: "MyApp",
    category: "web",
    description:
      "Eksperimen membuat aplikasi fullstack dengan Next.js dan Supabase.",
    longDescription:
      "MyApp adalah eksperimen saya untuk mempelajari cara membuat aplikasi fullstack menggunakan Next.js App Router dan Supabase sebagai backend.",
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
      "SafeReport adalah project desain UI/UX berupa aplikasi mobile untuk melaporkan kejadian tidak aman di lingkungan sekolah secara anonim. Dibuat menggunakan Figma, mulai dari riset, wireframe, hingga prototype.",
    technologies: ["Figma", "UI/UX Design"],
    image: "/safereport.png",
    link: "https://www.figma.com/design/nunI3SykyQcv9ZMpVIrlUS/Tugas-Pak-Sholeh-SafeReport?node-id=0-1&t=N333JAyed4XXOfvA-1",
  },
];

export const categories = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "uiux", label: "UI/UX" },
];