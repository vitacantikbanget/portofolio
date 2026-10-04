import { z } from "zod";

export const SKILL_CATEGORIES = [
  { value: "frontend", label: "Frontend Development" },
  { value: "design", label: "Design & UI/UX" },
  { value: "tools", label: "Tools & Backend" },
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number]["value"];

export type SkillInput = {
  name: string;
  category: string;
};

export type SkillState = {
  error: string | null;
  fieldErrors: Record<string, string>;
};

export const initialSkillState: SkillState = {
  error: null,
  fieldErrors: {},
};

const skillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama skill wajib diisi.")
    .max(60, "Nama skill maksimal 60 karakter."),
  category: z
    .string()
    .trim()
    .min(1, "Kategori wajib dipilih."),
});

function getString(formData: FormData, key: string): string {
  const val = formData.get(key);
  return typeof val === "string" ? val : "";
}

export function parseSkill(formData: FormData):
  | { data: SkillInput; fieldErrors: Record<string, string> }
  | { error: string; fieldErrors: Record<string, string> } {
  const parsed = skillSchema.safeParse({
    name: getString(formData, "name"),
    category: getString(formData, "category"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { error: "Periksa kembali kolom yang ditandai.", fieldErrors };
  }

  return {
    data: {
      name: parsed.data.name,
      category: parsed.data.category,
    },
    fieldErrors: {},
  };
}
