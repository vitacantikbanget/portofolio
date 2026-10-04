"use client";

import { useActionState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  SKILL_CATEGORIES,
  initialSkillState,
  type SkillState,
} from "@/lib/skill-form";

type Values = {
  id?: number;
  name: string;
  category: string;
};

const KOSONG: Values = {
  name: "",
  category: "frontend",
};

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[10px] tracking-[0.2em] uppercase block mb-2 font-medium"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          className="text-[11px] mt-1.5 flex items-center gap-1.5"
          style={{ color: "#e05c5c" }}
        >
          <AlertCircle size={12} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-[var(--accent)]";
const inputStyle = {
  background: "var(--bg-soft)",
  borderColor: "var(--border)",
  color: "var(--text)",
};

export default function SkillForm({
  values,
  action,
  submitLabel,
}: {
  values?: Values;
  action: (prev: SkillState, formData: FormData) => Promise<SkillState>;
  submitLabel: string;
}) {
  const v = values ?? KOSONG;

  const [state, formAction, isPending] = useActionState(
    action,
    initialSkillState,
  );

  const e = (field: keyof SkillState["fieldErrors"]) =>
    state.fieldErrors[field];

  return (
    <form action={formAction} className="space-y-5">
      {v.id !== undefined && <input type="hidden" name="id" value={v.id} />}

      {state.error && (
        <div
          className="flex items-start gap-2 text-xs px-4 py-3 rounded-xl border"
          style={{
            color: "#e05c5c",
            borderColor: "#e05c5c55",
            background: "#e05c5c14",
          }}
        >
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Nama Skill */}
      <Field label="Nama Skill" name="name" error={e("name")}>
        <input
          id="name"
          name="name"
          defaultValue={v.name}
          required
          maxLength={60}
          placeholder="contoh: Next.js, Tailwind CSS, Figma"
          className={inputClass}
          style={{
            ...inputStyle,
            borderColor: e("name") ? "#e05c5c" : "var(--border)",
          }}
        />
      </Field>

      {/* Kategori */}
      <Field label="Kategori" name="category" error={e("category")}>
        <select
          id="category"
          name="category"
          defaultValue={v.category}
          className={inputClass}
          style={inputStyle}
        >
          {SKILL_CATEGORIES.map((k) => (
            <option key={k.value} value={k.value}>
              {k.label}
            </option>
          ))}
        </select>
      </Field>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-[1.02] disabled:opacity-50"
          style={{ background: "var(--accent)", color: "#ffffff" }}
        >
          {isPending && <Loader2 size={14} className="animate-spin" />}
          {isPending ? "Menyimpan..." : submitLabel}
        </button>

        <a
          href="/admin/skills"
          className="inline-flex items-center px-5 py-2.5 rounded-xl border text-xs font-medium transition-all hover:scale-[1.02]"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface-2)",
            color: "var(--text)",
          }}
        >
          Batal
        </a>
      </div>
    </form>
  );
}
