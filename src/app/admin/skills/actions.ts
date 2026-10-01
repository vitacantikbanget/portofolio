"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../_lib/admin-guard";
import { parseSkill, type SkillState } from "@/lib/skill-form";

function parseId(nilai: FormDataEntryValue | null): number | null {
  const angka = Number(typeof nilai === "string" ? nilai : Number.NaN);
  return Number.isInteger(angka) && angka > 0 ? angka : null;
}

async function catatAktivitas(
  supabase: Awaited<ReturnType<typeof requireAdmin>>,
  action: "create" | "update" | "delete",
  title: string,
) {
  const { data } = await supabase.auth.getClaims();
  const { error } = await supabase.from("admin_activity").insert({
    action,
    project_title: `Skill: ${title}`,
    user_id: data?.claims?.sub ?? null,
  });
  if (error) console.error("Gagal menulis admin_activity:", error.message);
}

export async function createSkill(
  _prev: SkillState,
  formData: FormData,
): Promise<SkillState> {
  const supabase = await requireAdmin();

  const hasil = parseSkill(formData);
  if ("error" in hasil) {
    return { error: hasil.error, fieldErrors: hasil.fieldErrors };
  }

  const { error } = await supabase.from("skills").insert(hasil.data);

  if (error) {
    return {
      error: `Gagal menyimpan skill: ${error.message}`,
      fieldErrors: {},
    };
  }

  await catatAktivitas(supabase, "create", hasil.data.name);

  revalidatePath("/admin");
  revalidatePath("/admin/skills");
  revalidatePath("/");

  redirect("/admin/skills");
}

export async function updateSkill(
  _prev: SkillState,
  formData: FormData,
): Promise<SkillState> {
  const supabase = await requireAdmin();

  const id = parseId(formData.get("id"));
  if (id === null) {
    return { error: "ID skill tidak valid.", fieldErrors: {} };
  }

  const hasil = parseSkill(formData);
  if ("error" in hasil) {
    return { error: hasil.error, fieldErrors: hasil.fieldErrors };
  }

  const { data: lama } = await supabase
    .from("skills")
    .select("id, name")
    .eq("id", id)
    .maybeSingle();

  if (!lama) {
    return { error: "Skill tidak ditemukan.", fieldErrors: {} };
  }

  const { error } = await supabase
    .from("skills")
    .update(hasil.data)
    .eq("id", id);

  if (error) {
    return {
      error: `Gagal menyimpan perubahan skill: ${error.message}`,
      fieldErrors: {},
    };
  }

  await catatAktivitas(supabase, "update", hasil.data.name);

  revalidatePath("/admin");
  revalidatePath("/admin/skills");
  revalidatePath("/");

  redirect("/admin/skills");
}

export async function deleteSkill(formData: FormData) {
  const supabase = await requireAdmin();

  const id = parseId(formData.get("id"));
  if (id === null) redirect("/admin/skills");

  const { data: baris } = await supabase
    .from("skills")
    .select("id, name")
    .eq("id", id)
    .maybeSingle();

  if (!baris) redirect("/admin/skills");

  const { error } = await supabase.from("skills").delete().eq("id", id);

  if (error) {
    console.error("Gagal menghapus skill:", error.message);
    redirect("/admin/skills");
  }

  await catatAktivitas(supabase, "delete", baris.name);

  revalidatePath("/admin");
  revalidatePath("/admin/skills");
  revalidatePath("/");

  redirect("/admin/skills");
}
