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
const BUCKET_GAMBAR = "images";
const MAX_UKURAN_GAMBAR = 5 * 1024 * 1024;
const TIPE_GAMBAR = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

function parseId(nilai: FormDataEntryValue | null): number | null {
  const angka = Number(typeof nilai === "string" ? nilai : Number.NaN);
  return Number.isInteger(angka) && angka > 0 ? angka : null;
}

function ambilFile(formData: FormData) {
  const nilai = formData.get("imageFile");
  return nilai instanceof File && nilai.size > 0 ? nilai : null;
}

function validasiGambar(file: File | null, wajib: boolean): string | null {
  if (!file) return wajib ? "Gambar proyek wajib diunggah." : null;
  if (!TIPE_GAMBAR.has(file.type)) return "Gambar harus berformat JPG, PNG, atau WebP.";
  if (file.size > MAX_UKURAN_GAMBAR) return "Ukuran gambar maksimal 5 MB.";
  return null;
}

async function unggahGambar(
  supabase: Awaited<ReturnType<typeof requireAdmin>>,
  file: File,
) {
  const extension = TIPE_GAMBAR.get(file.type)!;
  const path = `projects/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from(BUCKET_GAMBAR).upload(path, file, {
    contentType: file.type,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return { path, publicUrl: supabase.storage.from(BUCKET_GAMBAR).getPublicUrl(path).data.publicUrl };
}

function pathStorageDariUrl(url: string | null | undefined) {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${BUCKET_GAMBAR}/`;
  const index = url.indexOf(marker);
  return index === -1 ? null : decodeURIComponent(url.slice(index + marker.length).split("?")[0]);
}

async function hapusGambar(supabase: Awaited<ReturnType<typeof requireAdmin>>, url: string | null | undefined) {
  const path = pathStorageDariUrl(url);
  if (path) await supabase.storage.from(BUCKET_GAMBAR).remove([path]);
}

function parseDataProject(formData: FormData, image: string) {
  const data = new FormData();
  formData.forEach((value, key) => {
    if (typeof value === "string") data.set(key, value);
  });
  data.set("image", image);
  return parseProyek(data);
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

  const file = ambilFile(formData);
  const errorGambar = validasiGambar(file, true);
  if (errorGambar) return { error: "Periksa lagi kolom yang ditandai.", fieldErrors: { image: errorGambar } };

  const hasil = parseDataProject(formData, "/upload-pending.jpg");
  if ("error" in hasil) {
    return { error: hasil.error, fieldErrors: hasil.fieldErrors };
  }

  let gambarBaru: { path: string; publicUrl: string };
  try {
    gambarBaru = await unggahGambar(supabase, file!);
  } catch (error) {
    return { error: `Gagal mengunggah gambar: ${error instanceof Error ? error.message : "kesalahan tidak dikenal"}`, fieldErrors: {} };
  }

  hasil.data.image = gambarBaru.publicUrl;
  // Sengaja tanpa .select()/RETURNING: kita tidak butuh id hasilnya, dan
  // RETURNING butuh policy SELECT juga.
  const { error } = await supabase.from("projects").insert(hasil.data);

  if (error) {
    await hapusGambar(supabase, gambarBaru.publicUrl);
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
  revalidatePath("/admin/proyek", "page");
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

  const { data: lama } = await supabase
    .from("projects")
    .select("id, title, slug, image")
    .eq("id", id)
    .maybeSingle();

  if (!lama) {
    return { error: "Project tidak ditemukan.", fieldErrors: {} };
  }

  const file = ambilFile(formData);
  const errorGambar = validasiGambar(file, false);
  if (errorGambar) return { error: "Periksa lagi kolom yang ditandai.", fieldErrors: { image: errorGambar } };

  const hasil = parseDataProject(formData, lama.image);
  if ("error" in hasil) {
    return { error: hasil.error, fieldErrors: hasil.fieldErrors };
  }

  let gambarBaru: { path: string; publicUrl: string } | null = null;
  if (file) {
    try {
      gambarBaru = await unggahGambar(supabase, file);
      hasil.data.image = gambarBaru.publicUrl;
    } catch (error) {
      return { error: `Gagal mengunggah gambar: ${error instanceof Error ? error.message : "kesalahan tidak dikenal"}`, fieldErrors: {} };
    }
  }

  const { error } = await supabase
    .from("projects")
    .update(hasil.data)
    .eq("id", id);

  if (error) {
    if (gambarBaru) await hapusGambar(supabase, gambarBaru.publicUrl);
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

  if (gambarBaru) await hapusGambar(supabase, lama.image);

  await catatAktivitas(supabase, "update", hasil.data.title);

  revalidatePath("/admin");
  revalidatePath("/admin/proyek");
  revalidatePath("/admin/proyek", "page");
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
  revalidatePath("/admin/proyek", "page");
  revalidatePath("/projects");
  revalidatePath(`/projects/${baris.slug}`);

  redirect("/admin/proyek");
}
