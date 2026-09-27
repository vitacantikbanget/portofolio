import { requireAdmin } from "@/lib/admin-guard";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin — Desvita Putri",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await requireAdmin();

  const { data: claimData } = await supabase.auth.getClaims();
  const claims = claimData?.claims;
  const userId = claims?.sub ?? "";
  const email = claims?.email ?? "admin";

  const { data: profil } = await supabase
    .from("profile")
    .select("username, role")
    .eq("id", userId)
    .maybeSingle();

  const user = {
    username: profil?.username ?? "admin",
    email,
    role: profil?.role ?? "admin",
  };

  return <AdminShell user={user}>{children}</AdminShell>;
}
