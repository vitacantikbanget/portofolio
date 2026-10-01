import { requireAdmin } from "../_lib/admin-guard";
import SettingsForm from "./SettingsForm";

export const metadata = {
  title: "Pengaturan Website Ã¢â‚¬â€ Admin Portfolio",
};

export default async function SettingsPage() {
  const supabase = await requireAdmin();

  const { data: claimData } = await supabase.auth.getClaims();
  const userId = claimData?.claims?.sub;

  const { data: profil } = await supabase
    .from("profile")
    .select("accent_color, site_title, site_description")
    .eq("id", userId ?? "")
    .maybeSingle();

  const initialData = {
    accent_color: profil?.accent_color ?? "#a96f6b",
    site_title: profil?.site_title ?? "Desvita Putri Ã¢â‚¬â€ Personal Portfolio",
    site_description:
      profil?.site_description ??
      "Portfolio pribadi Desvita Putri Wulandari Ã¢â‚¬â€ Frontend Developer & UI/UX Designer.",
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
          Konfigurasi Sistem
        </span>

        <h1
          className="text-3xl sm:text-4xl font-medium leading-tight"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--text)",
          }}
        >
          Pengaturan{" "}
          <span className="italic" style={{ color: "var(--accent)" }}>
            Website
          </span>
        </h1>

        <p
          className="text-xs sm:text-sm mt-1.5"
          style={{ color: "var(--text-muted)" }}
        >
          Sesuaikan tema visual utama dan informasi metadata SEO portofolio Anda.
        </p>
      </div>

      <SettingsForm initialData={initialData} />
    </div>
  );
}
