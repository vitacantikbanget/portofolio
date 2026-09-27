import { requireAdmin } from "@/lib/admin-guard";
import AboutForm from "./AboutForm";

export const metadata = {
  title: "Kelola About — Admin Portfolio",
};

export default async function AboutPage() {
  const supabase = await requireAdmin();

  const { data: claimData } = await supabase.auth.getClaims();
  const userId = claimData?.claims?.sub;

  const { data: profil } = await supabase
    .from("profile")
    .select("username, headline, tagline, bio, avatar_url")
    .eq("id", userId ?? "")
    .maybeSingle();

  const initialData = {
    username: profil?.username ?? "Desvita Putri",
    headline: profil?.headline ?? "Frontend Developer & UI/UX Enthusiast",
    tagline:
      profil?.tagline ??
      "Merancang antarmuka web yang estetis, interaktif, dan mudah digunakan.",
    bio:
      profil?.bio ??
      "Halo! Saya Desvita Putri Wulandari, seorang mahasiswi yang berfokus pada pengembangan antarmuka web modern dan perancangan UI/UX. Senang mempelajari teknologi terbaru dan menciptakan pengalaman digital yang berkesan.",
    avatar_url: profil?.avatar_url ?? "/profile.jpeg",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span
          className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border mb-3"
          style={{
            borderColor: "var(--accent)",
            color: "var(--accent)",
            background: "var(--surface)",
          }}
        >
          Informasi Profil
        </span>

        <h1
          className="text-3xl sm:text-4xl font-medium leading-tight"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--text)",
          }}
        >
          Kelola{" "}
          <span className="italic" style={{ color: "var(--accent)" }}>
            About
          </span>
        </h1>

        <p
          className="text-xs sm:text-sm mt-1.5"
          style={{ color: "var(--text-muted)" }}
        >
          Sesuaikan teks pengantar, headline, dan biografi Anda untuk bagian About di beranda.
        </p>
      </div>

      <AboutForm initialData={initialData} />
    </div>
  );
}
