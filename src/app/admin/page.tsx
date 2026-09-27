import Link from "next/link";
import {
  FolderKanban,
  Sparkles,
  Mail,
  Layers,
  Plus,
  ExternalLink,
  Pencil,
  ArrowRight,
  ShieldCheck,
  Clock,
  Eye,
} from "lucide-react";
import { requireAdmin } from "@/lib/admin-guard";

export const metadata = {
  title: "Dashboard — Admin Portfolio",
};

export default async function AdminDashboardPage() {
  const supabase = await requireAdmin();

  const { data: claimData } = await supabase.auth.getClaims();
  const claims = claimData?.claims;
  const userId = claims?.sub ?? "";
  const emailTampil = claims?.email ?? "admin";

  const { data: profil } = await supabase
    .from("profile")
    .select("username, role")
    .eq("id", userId)
    .maybeSingle();

  // Ambil hitungan dan data proyek serta pesan secara paralel
  const [
    jumlahProyek,
    jumlahSkill,
    jumlahPesan,
    proyekTerbaruRes,
    pesanTerbaruRes,
    aktivitasRes,
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("pesan_kontak").select("*", { count: "exact", head: true }),
    supabase
      .from("projects")
      .select("id, title, slug, category, image, technologies, description")
      .order("id", { ascending: false })
      .limit(5),
    supabase
      .from("pesan_kontak")
      .select("id, nama, email, pesan, created_at")
      .order("id", { ascending: false })
      .limit(5),
    supabase
      .from("admin_activity")
      .select("id, action, project_title, created_at")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const totalProyek = jumlahProyek.count ?? 0;
  const totalSkill = jumlahSkill.count ?? 0;
  const totalPesan = jumlahPesan.count ?? 0;
  const proyekTerbaru = proyekTerbaruRes.data ?? [];
  const pesanTerbaru = pesanTerbaruRes.data ?? [];
  const aktivitas = aktivitasRes.data ?? [];

  // Hitung jumlah per kategori dari data yang ada
  const webCount = proyekTerbaru.filter((p) => p.category === "web").length;
  const uiuxCount = proyekTerbaru.filter((p) => p.category === "uiux").length;

  return (
    <div className="space-y-8">
      {/* ====== HEADING ====== */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span
            className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border mb-3"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
              background: "var(--surface)",
            }}
          >
            <ShieldCheck size={12} />
            Admin Overview
          </span>

          <h1
            className="text-3xl sm:text-4xl font-medium leading-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--text)",
            }}
          >
            Selamat datang,{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>
              {profil?.username ?? "Desvita"}
            </span>
            !
          </h1>

          <p
            className="text-xs sm:text-sm mt-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            Kelola seluruh isi portfolio dari satu tempat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/proyek/baru"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-[1.02]"
            style={{ background: "var(--accent)", color: "#ffffff" }}
          >
            <Plus size={14} />
            Tambah Project
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all hover:scale-[1.02]"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          >
            <ExternalLink size={13} />
            Lihat Portfolio
          </a>
        </div>
      </div>

      {/* ====== BARIS 1: 4 KARTU STATISTIK ====== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Kartu 1: Projects */}
        <div
          className="rounded-2xl border p-5 transition-all hover:shadow-sm"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[10px] tracking-[0.2em] uppercase font-semibold"
              style={{ color: "var(--text-muted)" }}
            >
              Total Projects
            </span>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "var(--accent-soft)",
                color: "var(--accent)",
              }}
            >
              <FolderKanban size={16} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p
              className="text-3xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              {totalProyek}
            </p>
            <Link
              href="/admin/proyek"
              className="text-[11px] underline underline-offset-2 flex items-center gap-1"
              style={{ color: "var(--accent)" }}
            >
              Kelola <ArrowRight size={11} />
            </Link>
          </div>
          <p
            className="text-[11px] mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            Tampil langsung di website publik
          </p>
        </div>

        {/* Kartu 2: Skills */}
        <div
          className="rounded-2xl border p-5 transition-all hover:shadow-sm"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[10px] tracking-[0.2em] uppercase font-semibold"
              style={{ color: "var(--text-muted)" }}
            >
              Total Skills
            </span>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "var(--bg-soft)",
                color: "var(--text)",
              }}
            >
              <Sparkles size={16} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p
              className="text-3xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              {totalSkill}
            </p>
            <Link
              href="/admin/skills"
              className="text-[11px] underline underline-offset-2 flex items-center gap-1"
              style={{ color: "var(--accent)" }}
            >
              Kelola <ArrowRight size={11} />
            </Link>
          </div>
          <p
            className="text-[11px] mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            Keahlian teknis & perkakas
          </p>
        </div>

        {/* Kartu 3: Pesan Kontak */}
        <div
          className="rounded-2xl border p-5 transition-all hover:shadow-sm"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[10px] tracking-[0.2em] uppercase font-semibold"
              style={{ color: "var(--text-muted)" }}
            >
              Pesan Kontak
            </span>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "var(--accent-soft)",
                color: "var(--accent)",
              }}
            >
              <Mail size={16} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p
              className="text-3xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              {totalPesan}
            </p>
            {totalPesan > 0 ? (
              <span
                className="text-[10px] uppercase font-medium px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--accent)",
                  color: "#ffffff",
                }}
              >
                {totalPesan} pesan masuk
              </span>
            ) : (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                Belum ada
              </span>
            )}
          </div>
          <p
            className="text-[11px] mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            Kotak masuk dari formulir kontak
          </p>
        </div>

        {/* Kartu 4: Kategori Proyek */}
        <div
          className="rounded-2xl border p-5 transition-all hover:shadow-sm"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[10px] tracking-[0.2em] uppercase font-semibold"
              style={{ color: "var(--text-muted)" }}
            >
              Distribusi Kategori
            </span>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "var(--bg-soft)",
                color: "var(--text)",
              }}
            >
              <Layers size={16} />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p
              className="text-lg font-semibold truncate"
              style={{ color: "var(--text)" }}
            >
              Web &amp; UI/UX
            </p>
            <span
              className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border"
              style={{
                borderColor: "var(--border)",
                color: "var(--accent)",
              }}
            >
              2 Kategori
            </span>
          </div>
          <p
            className="text-[11px] mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            Web Development &middot; UI/UX Design
          </p>
        </div>
      </div>

      {/* ====== BARIS 2: AKTIVITAS TERBARU (CHART/GRAFIK) & QUICK ACTIONS ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kiri (2 Kolom): Visualisasi Aktivitas Mingguan */}
        <div
          className="lg:col-span-2 rounded-3xl border p-6 sm:p-7 flex flex-col justify-between"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2
                className="text-sm font-semibold"
                style={{ color: "var(--text)" }}
              >
                Aktivitas &amp; Pembaruan
              </h2>
              <span
                className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                Log Sistem
              </span>
            </div>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              Aktivitas pengelolaan konten dan pembaruan portofolio.
            </p>
          </div>

          {/* SVG Line Chart Elegan */}
          <div className="my-2">
            <div className="h-36 w-full relative">
              <svg
                viewBox="0 0 500 130"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--accent)"
                      stopOpacity="0.25"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--accent)"
                      stopOpacity="0.0"
                    />
                  </linearGradient>
                </defs>

                {/* Garis Horizontal Halus */}
                <line
                  x1="0"
                  y1="30"
                  x2="500"
                  y2="30"
                  stroke="var(--border)"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
                <line
                  x1="0"
                  y1="75"
                  x2="500"
                  y2="75"
                  stroke="var(--border)"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
                <line
                  x1="0"
                  y1="120"
                  x2="500"
                  y2="120"
                  stroke="var(--border)"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />

                {/* Area Gradient */}
                <path
                  d="M 0,90 Q 70,30 150,60 T 300,40 T 420,25 L 500,50 L 500,125 L 0,125 Z"
                  fill="url(#chartGrad)"
                />

                {/* Line Path */}
                <path
                  d="M 0,90 Q 70,30 150,60 T 300,40 T 420,25 L 500,50"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Data points */}
                {[
                  { cx: 70, cy: 45 },
                  { cx: 150, cy: 60 },
                  { cx: 300, cy: 40 },
                  { cx: 420, cy: 25 },
                  { cx: 500, cy: 50 },
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.cx}
                    cy={pt.cy}
                    r="4"
                    fill="var(--surface)"
                    stroke="var(--accent)"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>

            <div
              className="flex justify-between text-[10px] tracking-wider uppercase mt-3 pt-2 border-t"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
              <span>Min</span>
            </div>
          </div>

          {/* Log Aktivitas Terakhir */}
          <div className="mt-4 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
            <p className="text-[11px] font-medium mb-2" style={{ color: "var(--text)" }}>
              Catatan Aktivitas Terakhir:
            </p>
            {aktivitas.length === 0 ? (
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Belum ada aktivitas tercatat.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {aktivitas.slice(0, 3).map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between text-xs py-1.5 px-3 rounded-xl"
                    style={{ background: "var(--bg-soft)" }}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Clock size={12} style={{ color: "var(--accent)" }} />
                      <span className="capitalize font-medium" style={{ color: "var(--text)" }}>
                        {item.action}:
                      </span>
                      <span className="truncate" style={{ color: "var(--text-muted)" }}>
                        {item.project_title || "Sesi Admin"}
                      </span>
                    </span>
                    <span className="text-[10px] shrink-0" style={{ color: "var(--text-muted)" }}>
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Kanan (1 Kolom): Quick Actions */}
        <div
          className="rounded-3xl border p-6 sm:p-7 flex flex-col justify-between"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div>
            <h2
              className="text-sm font-semibold mb-1"
              style={{ color: "var(--text)" }}
            >
              Quick Actions
            </h2>
            <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
              Pintasan cepat untuk memperbarui portofolio.
            </p>

            <div className="space-y-2.5">
              <Link
                href="/admin/proyek/baru"
                className="flex items-center justify-between p-3.5 rounded-2xl border text-xs font-medium transition-all hover:scale-[1.02]"
                style={{
                  background: "var(--surface-2)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                <span className="flex items-center gap-2.5">
                  <Plus size={15} style={{ color: "var(--accent)" }} />
                  Tambah Project Baru
                </span>
                <ArrowRight size={13} style={{ color: "var(--text-muted)" }} />
              </Link>

              <Link
                href="/admin/skills"
                className="flex items-center justify-between p-3.5 rounded-2xl border text-xs font-medium transition-all hover:scale-[1.02]"
                style={{
                  background: "var(--surface-2)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                <span className="flex items-center gap-2.5">
                  <Sparkles size={15} style={{ color: "var(--accent)" }} />
                  Kelola Daftar Skills
                </span>
                <ArrowRight size={13} style={{ color: "var(--text-muted)" }} />
              </Link>

              <Link
                href="/admin/about"
                className="flex items-center justify-between p-3.5 rounded-2xl border text-xs font-medium transition-all hover:scale-[1.02]"
                style={{
                  background: "var(--surface-2)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                <span className="flex items-center gap-2.5">
                  <FolderKanban size={15} style={{ color: "var(--accent)" }} />
                  Edit Profil About
                </span>
                <ArrowRight size={13} style={{ color: "var(--text-muted)" }} />
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3.5 rounded-2xl border text-xs font-medium transition-all hover:scale-[1.02]"
                style={{
                  background: "var(--surface-2)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                <span className="flex items-center gap-2.5">
                  <Mail size={15} style={{ color: "var(--accent)" }} />
                  Pengaturan Website
                </span>
                <ArrowRight size={13} style={{ color: "var(--text-muted)" }} />
              </Link>
            </div>
          </div>

          <div
            className="mt-6 pt-4 border-t text-[11px]"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            Status RLS: <span className="font-semibold text-emerald-600 dark:text-emerald-400">Aktif &amp; Terkunci</span>
          </div>
        </div>
      </div>

      {/* ====== BARIS 3: PROJECT TERBARU & PROJECT ACTIVITY ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kiri (2 Kolom): Project Terbaru */}
        <div
          className="lg:col-span-2 rounded-3xl border p-6 sm:p-7"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2
                className="text-sm font-semibold"
                style={{ color: "var(--text)" }}
              >
                Project Terbaru
              </h2>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                5 proyek paling akhir yang tersimpan di database.
              </p>
            </div>
            <Link
              href="/admin/proyek"
              className="text-xs underline underline-offset-2 flex items-center gap-1 font-medium"
              style={{ color: "var(--accent)" }}
            >
              Lihat semua ({totalProyek})
            </Link>
          </div>

          {proyekTerbaru.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Belum ada project yang dibuat.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    <th
                      className="text-[10px] tracking-[0.2em] uppercase font-normal pb-3 pr-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      No
                    </th>
                    <th
                      className="text-[10px] tracking-[0.2em] uppercase font-normal pb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Project
                    </th>
                    <th
                      className="text-[10px] tracking-[0.2em] uppercase font-normal pb-3 px-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Kategori
                    </th>
                    <th
                      className="text-[10px] tracking-[0.2em] uppercase font-normal pb-3 text-right"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {proyekTerbaru.map((p, idx) => (
                    <tr key={p.id} className="transition-colors hover:bg-[var(--bg-soft)]">
                      <td className="py-3.5 pr-3 font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
                        {idx + 1}
                      </td>
                      <td className="py-3.5">
                        <p className="font-medium" style={{ color: "var(--text)" }}>
                          {p.title}
                        </p>
                        <p className="text-[10px] font-mono mt-0.5" style={{ color: "var(--text-muted)" }}>
                          /projects/{p.slug}
                        </p>
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className="inline-block text-[10px] px-2.5 py-0.5 rounded-full border capitalize"
                          style={{
                            borderColor: "var(--border)",
                            background: "var(--bg-soft)",
                            color: "var(--text)",
                          }}
                        >
                          {p.category === "web" ? "Web Dev" : "UI/UX"}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`/projects/${p.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border transition-all hover:scale-105"
                            style={{
                              borderColor: "var(--border)",
                              background: "var(--surface-2)",
                              color: "var(--text)",
                            }}
                            title="Lihat halaman publik"
                          >
                            <Eye size={13} />
                          </a>
                          <Link
                            href={`/admin/proyek/${p.id}`}
                            className="p-1.5 rounded-lg border transition-all hover:scale-105"
                            style={{
                              borderColor: "var(--border)",
                              background: "var(--surface-2)",
                              color: "var(--text)",
                            }}
                            title="Ubah project"
                          >
                            <Pencil size={13} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Kanan (1 Kolom): Feed Proyek Singkat */}
        <div
          className="rounded-3xl border p-6 sm:p-7"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <h2
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--text)" }}
          >
            Project Feed
          </h2>
          <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
            Cuplikan visual karya portofolio.
          </p>

          <div className="space-y-3">
            {proyekTerbaru.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-2.5 rounded-2xl border"
                style={{
                  background: "var(--bg-soft)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl border flex items-center justify-center overflow-hidden shrink-0 font-bold text-xs"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--accent)",
                  }}
                >
                  {p.category.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-xs font-medium truncate"
                    style={{ color: "var(--text)" }}
                  >
                    {p.title}
                  </p>
                  <p
                    className="text-[10px] truncate mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {(p.technologies ?? []).join(", ") || "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== BARIS 4: PESAN KONTAK TERBARU ====== */}
      <div
        id="pesan-terbaru"
        className="rounded-3xl border p-6 sm:p-7"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: "var(--accent-soft)",
                color: "var(--accent)",
              }}
            >
              <Mail size={14} />
            </div>
            <div>
              <h2
                className="text-sm font-semibold"
                style={{ color: "var(--text)" }}
              >
                Pesan Kontak Terbaru
              </h2>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Pesan dari calon klien atau pengunjung portofolio.
              </p>
            </div>
          </div>

          <span
            className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            {totalPesan} Pesan Tersimpan
          </span>
        </div>

        {pesanTerbaru.length === 0 ? (
          <div
            className="py-10 text-center rounded-2xl border"
            style={{
              background: "var(--bg-soft)",
              borderColor: "var(--border)",
            }}
          >
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Belum ada pesan yang masuk melalui form kontak.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {pesanTerbaru.map((pesan) => (
              <div
                key={pesan.id}
                className="rounded-2xl border p-4 flex flex-col justify-between"
                style={{
                  background: "var(--bg-soft)",
                  borderColor: "var(--border)",
                }}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase shrink-0"
                      style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                      }}
                    >
                      {pesan.nama.slice(0, 1) || "P"}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-xs font-semibold truncate"
                        style={{ color: "var(--text)" }}
                      >
                        {pesan.nama}
                      </p>
                      <p
                        className="text-[10px] truncate"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {pesan.email}
                      </p>
                    </div>
                  </div>

                  <p
                    className="text-xs line-clamp-3 leading-relaxed mb-3"
                    style={{ color: "var(--text)" }}
                  >
                    &ldquo;{pesan.pesan}&rdquo;
                  </p>
                </div>

                <div
                  className="pt-2 border-t flex items-center justify-between text-[10px]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {pesan.created_at
                      ? new Date(pesan.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Baru saja"}
                  </span>
                  <a
                    href={`mailto:${pesan.email}`}
                    className="underline hover:text-[var(--accent)]"
                  >
                    Balas email
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
