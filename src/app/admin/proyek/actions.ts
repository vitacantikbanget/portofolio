"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../_lib/admin-guard";
import {
  parseProyek,
  type ProyekState,
} from "@/lib/project-form";

// Server Action adalah endpoint HTTP publik. Halaman /admin/proyek memang
// sudah dijaga proxy, tapi request bisa dikirim langsung ke action ini
// tanpa lewat halaman. Jadi setiap action memanggil requireAdmin() sendiri.
//
// Error 23505 = unique violation. Itu yang keluar dari index
// projects_slug_unik kalau slug bentrok.
const SLOM_BENTROK = "23505";

function parseId(nilai: FormDataEntryValue | null): number | null {
  const angka = Number(typeof nilai === "string" ? nilai : Number.NaN);
  return Number.isInteger(angka) && angka > 0 ? angka : null;
}

// Kegagalan menulis log tidak boleh menggagalkan aksi user, jadi error-nya
// cuma dicatat ke console.
async function catatAktivitas(
  supabase: Awaited<ReturnType<typeof requireAdmin>>,
  action: "create" | "update" | "delete",
  projectTitle: string,
) {
  const { data } = await supabase.auth.getClaims();
  const { error } = await supabase.from("admin_activity").insert({
    action,
    project_title: projectTitle,
    user_id: data?.claims?.sub ?? null,
  });
  if (error) console.error("Gagal menulis admin_activity:", error.message);
}

export async function createProject(
  _prev: ProyekState,
  formData: FormData,
): Promise<ProyekState> {
  const supabase = await requireAdmin();

  const hasil = parseProyek(formData);
  if ("error" in hasil) {
    return { error: hasil.error, fieldErrors: hasil.fieldErrors };
  }

  // Sengaja tanpa .select()/RETURNING: kita tidak butuh id hasilnya, dan
  // RETURNING butuh policy SELECT juga.
  const { error } = await supabase.from("projects").insert(hasil.data);

  if (error) {
    if (error.code === SLOM_BENTROK) {
      return {
        error: `Slug "${hasil.data.slug}" sudah dipakai project lain.`,
        fieldErrors: { slug: "Slug sudah dipakai project lain." },
      };
    }
    return {
      error: `Gagal menyimpan project: ${error.message}`,
      fieldErrors: {},
    };
  }

  await catatAktivitas(supabase, "create", hasil.data.title);

  revalidatePath("/admin");
  revalidatePath("/admin/proyek");
  revalidatePath("/projects");
  revalidatePath(`/projects/${hasil.data.slug}`);

  redirect("/admin/proyek");
}

export async function updateProject(
  _prev: ProyekState,
  formData: FormData,
): Promise<ProyekState> {
  const supabase = await requireAdmin();

  const id = parseId(formData.get("id"));
  if (id === null) {
    return { error: "ID project tidak valid.", fieldErrors: {} };
  }

  const hasil = parseProyek(formData);
  if ("error" in hasil) {
    return { error: hasil.error, fieldErrors: hasil.fieldErrors };
  }

  // Dicek dulu supaya (a) ID palsu tidak mengembalikan sukses palsu -
  // update tanpa .select() dianggap sukses walau 0 baris kena, dan
  // (b) judul untuk log_activity diambil dari baris yang benar.
  const { data: lama } = await supabase
    .from("projects")
    .select("id, title, slug")
    .eq("id", id)
    .maybeSingle();

  if (!lama) {
    return { error: "Project tidak ditemukan.", fieldErrors: {} };
  }

  const { error } = await supabase
    .from("projects")
    .update(hasil.data)
    .eq("id", id);

  if (error) {
    if (error.code === SLOM_BENTROK) {
      return {
        error: `Slug "${hasil.data.slug}" sudah dipakai project lain.`,
        fieldErrors: { slug: "Slug sudah dipakai project lain." },
      };
    }
    return {
      error: `Gagal menyimpan perubahan: ${error.message}`,
      fieldErrors: {},
    };
  }

  await catatAktivitas(supabase, "update", hasil.data.title);

  revalidatePath("/admin");
  revalidatePath("/admin/proyek");
  revalidatePath("/projects");
  revalidatePath(`/projects/${hasil.data.slug}`);

  // Kalau slug berubah, URL publik yang lama juga harus dibersihkan dari
  // cache, kalau tidak /projects/<slug-lama> masih menampilkan data lama.
  if (lama.slug !== hasil.data.slug) {
    revalidatePath(`/projects/${lama.slug}`);
  }

  redirect("/admin/proyek");
}

export async function deleteProject(formData: FormData) {
  const supabase = await requireAdmin();

  const id = parseId(formData.get("id"));
  if (id === null) redirect("/admin/proyek");

  // Sama seperti update: delete tanpa .select() terlihat sukses walau
  // 0 baris kena, jadi barisnya dicek dulu.
  const { data: baris } = await supabase
    .from("projects")
    .select("id, title, slug")
    .eq("id", id)
    .maybeSingle();

  if (!baris) redirect("/admin/proyek");

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Gagal menghapus project:", error.message);
    redirect("/admin/proyek");
  }

  await catatAktivitas(supabase, "delete", baris.title);

  revalidatePath("/admin");
  revalidatePath("/admin/proyek");
  revalidatePath("/projects");
  revalidatePath(`/projects/${baris.slug}`);

  redirect("/admin/proyek");
}
