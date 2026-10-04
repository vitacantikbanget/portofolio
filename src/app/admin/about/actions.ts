"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "../_lib/admin-guard";
import { type AboutState } from "./state";

const aboutSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Nama panggilan wajib diisi.")
    .max(50, "Nama panggilan maksimal 50 karakter."),
  headline: z
    .string()
    .trim()
    .max(120, "Headline maksimal 120 karakter.")
    .optional(),
  tagline: z
    .string()
    .trim()
    .max(180, "Tagline maksimal 180 karakter.")
    .optional(),
  bio: z
    .string()
    .trim()
    .max(3000, "Bio maksimal 3000 karakter.")
    .optional(),
});

const BUCKET_GAMBAR = "images";
const MAX_UKURAN_GAMBAR = 5 * 1024 * 1024;
const TIPE_GAMBAR = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

function ambilFile(formData: FormData) {
  const nilai = formData.get("avatarFile");
  return nilai instanceof File && nilai.size > 0 ? nilai : null;
}

function validasiGambar(file: File | null) {
  if (!file) return null;
  if (!TIPE_GAMBAR.has(file.type)) return "Foto harus berformat JPG, PNG, atau WebP.";
  if (file.size > MAX_UKURAN_GAMBAR) return "Ukuran foto maksimal 5 MB.";
  return null;
}

async function unggahAvatar(supabase: Awaited<ReturnType<typeof requireAdmin>>, file: File) {
  const path = `about/${crypto.randomUUID()}.${TIPE_GAMBAR.get(file.type)!}`;
  const { error } = await supabase.storage.from(BUCKET_GAMBAR).upload(path, file, {
    contentType: file.type,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return supabase.storage.from(BUCKET_GAMBAR).getPublicUrl(path).data.publicUrl;
}

function pathStorageDariUrl(url: string | null | undefined) {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${BUCKET_GAMBAR}/`;
  const index = url.indexOf(marker);
  return index === -1 ? null : decodeURIComponent(url.slice(index + marker.length).split("?")[0]);
}

async function hapusAvatar(supabase: Awaited<ReturnType<typeof requireAdmin>>, url: string | null | undefined) {
  const path = pathStorageDariUrl(url);
  if (path) await supabase.storage.from(BUCKET_GAMBAR).remove([path]);
}

export async function updateAbout(
  _prev: AboutState,
  formData: FormData,
): Promise<AboutState> {
  const supabase = await requireAdmin();
  const { data: claimData } = await supabase.auth.getClaims();
  const userId = claimData?.claims?.sub;

  if (!userId) {
    return { error: "Sesi tidak valid.", fieldErrors: {} };
  }

  const parsed = aboutSchema.safeParse({
    username: formData.get("username"),
    headline: formData.get("headline"),
    tagline: formData.get("tagline"),
    bio: formData.get("bio"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { error: "Periksa kembali kolom yang ditandai.", fieldErrors };
  }

  const file = ambilFile(formData);
  const errorGambar = validasiGambar(file);
  if (errorGambar) return { error: "Periksa kembali kolom yang ditandai.", fieldErrors: { avatar_url: errorGambar } };

  const { data: profilLama } = await supabase
    .from("profile")
    .select("avatar_url")
    .eq("id", userId)
    .maybeSingle();

  let avatarUrl = profilLama?.avatar_url ?? null;
  if (file) {
    try {
      avatarUrl = await unggahAvatar(supabase, file);
    } catch (error) {
      return { error: `Gagal mengunggah foto: ${error instanceof Error ? error.message : "kesalahan tidak dikenal"}`, fieldErrors: {} };
    }
  }

  const { error } = await supabase
    .from("profile")
    .update({
      username: parsed.data.username,
      headline: parsed.data.headline || null,
      tagline: parsed.data.tagline || null,
      bio: parsed.data.bio || null,
      avatar_url: avatarUrl,
    })
    .eq("id", userId);

  if (error) {
    if (file) await hapusAvatar(supabase, avatarUrl);
    return {
      error: `Gagal menyimpan profil: ${error.message}`,
      fieldErrors: {},
    };
  }

  if (file) await hapusAvatar(supabase, profilLama?.avatar_url);

  // Catat ke admin_activity
  await supabase.from("admin_activity").insert({
    action: "update",
    project_title: "Informasi Profil About",
    user_id: userId,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/about");
  revalidatePath("/");
  revalidatePath("/", "layout");

  return { success: true, error: null, fieldErrors: {} };
}
