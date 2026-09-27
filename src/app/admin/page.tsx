import { redirect, notFound } from "next/navigation";
import { History, Lock, ShieldCheck, User } from "lucide-react";
import { createClient } from "@/lib/supabase-server";
import LogoutButton from "./LogoutButton";

export const metadata = {
  title: "Admin — Desvita Putri",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const supabase = await createClient();

  // Sesi sudah di-refresh oleh src/proxy.ts, jadi getClaims() cukup
  // tanpa perlu network call kedua.
  const { data: claimData } = await supabase.auth.getClaims();
  if (!claimData?.claims) {
    redirect("/login");
  }

  // Gerbang sesungguhnya: dicek ke tabel profile, bukan dari cookie.
  const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin");

  if (adminError) {
    console.error("Gagal memanggil is_admin():", adminError.message);
  }

  if (!isAdmin) {
    notFound();
  }

  // Data untuk tampilkan di shell.
  const { data: profil } = await supabase
    .from("profile")
    .select("username, role")
    .eq("id", claimData.claims.sub)
    .maybeSingle();

  const { data: aktivitas } = await supabase
    .from("admin_activity")
    .select("id, action, project_title, created_at")
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(10);

  return (
    <main className="min-h-screen w-full relative px-4 py-12 sm:py-16">
      {/* ====== BACKGROUND DECOR ====== */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "40vw",
          height: "40vw",
          maxWidth: "480px",
          maxHeight: "480px",
          top: "-20%",
          right: "-12%",
          background: "var(--accent)",
          opacity: 0.12,
          filter: "blur(100px)",
        }}
      />

      <div className="container-custom relative">
        {/* ====== HEADER ====== */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-full border mb-4"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
              }}
            >
              <ShieldCheck size={12} />
              Admin
            </span>

            <h1
              className="text-3xl sm:text-4xl font-medium leading-tight"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--text)",
              }}
            >
              Halo,{" "}
              <span className="italic" style={{ color: "var(--accent)" }}>
                {profil?.username ?? "admin"}
              </span>
            </h1>

            <p
              className="text-xs mt-2 flex items-center gap-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              <User size={12} />
              {claimData.claims.email ?? claimData.claims.sub}
              {"  "}-  role: {profil?.role ?? "admin"}
            </p>
          </div>

          <LogoutButton />
        </div>

        {/* ====== KARTU RINGKASAN ====== */}
        <div
          className="rounded-3xl border p-6 sm:p-8 mb-6"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <h2
            className="text-sm font-medium mb-1"
            style={{ color: "var(--text)" }}
          >
            Dashboard
          </h2>
          <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>
            Area ini sudah terbuka dan siap dipakai. Management project
            menyusul di tahap berikutnya.
          </p>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: "Projects", value: "segera" },
              { label: "Pesan masuk", value: "segera" },
              { label: "Skills", value: "segera" },
            ].map((kartu) => (
              <div
                key={kartu.label}
                className="rounded-2xl border p-4"
                style={{
                  background: "var(--bg-soft)",
                  borderColor: "var(--border)",
                }}
              >
                <p
                  className="text-[10px] tracking-[0.15em] uppercase mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {kartu.label}
                </p>
                <p
                  className="text-lg font-medium"
                  style={{ color: "var(--text)" }}
                >
                  {kartu.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ====== LOG AKTIVITAS ====== */}
        <div
          className="rounded-3xl border p-6 sm:p-8"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <History size={15} style={{ color: "var(--accent)" }} />
            <h2 className="text-sm font-medium" style={{ color: "var(--text)" }}>
              Aktivitas terbaru
            </h2>
          </div>

          {!aktivitas || aktivitas.length === 0 ? (
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Belum ada aktivitas tercatat.
            </p>
          ) : (
            <ul className="space-y-2">
              {aktivitas.map((baris) => (
                <li
                  key={baris.id}
                  className="flex flex-wrap items-center justify-between gap-2 text-xs px-4 py-3 rounded-xl border"
                  style={{
                    background: "var(--bg-soft)",
                    borderColor: "var(--border)",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Lock size={12} style={{ color: "var(--text-muted)" }} />
                    <span style={{ color: "var(--text)" }}>{baris.action}</span>
                    {baris.project_title && (
                      <span style={{ color: "var(--text-muted)" }}>
                        {baris.project_title}
                      </span>
                    )}
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>
                    {new Date(baris.created_at).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Jakarta",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
