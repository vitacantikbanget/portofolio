"use client";

import { useActionState, useRef, useState } from "react";
import { AlertCircle, ImagePlus, Loader2 } from "lucide-react";
import { KATEGORI, initialProyekState, type ProyekState } from "@/lib/project-form";

type Values = {
  id?: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  long_description: string;
  technologies: string[];
  image: string;
  link: string;
};

const KOSONG: Values = {
  title: "",
  slug: "",
  category: "web",
  description: "",
  long_description: "",
  technologies: [],
  image: "",
  link: "",
};

function Field({
  label,
  name,
  hint,
  error,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[10px] tracking-[0.2em] uppercase block mb-2"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="text-[11px] mt-1.5" style={{ color: "var(--text-muted)" }}>
          {hint}
        </p>
      )}
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

const gayaInput =
  "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--accent)]";
const gayaInputBerisik = {
  background: "var(--bg-soft)",
  borderColor: "var(--border)",
  color: "var(--text)",
};

export default function ProjectForm({
  values,
  action,
  submitLabel,
}: {
  values?: Values;
  action: (prev: ProyekState, formData: FormData) => Promise<ProyekState>;
  submitLabel: string;
}) {
  const v = values ?? KOSONG;
  const [state, formAction, isPending] = useActionState(
    action,
    initialProyekState,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const e = (field: keyof ProyekState["fieldErrors"]) =>
    state.fieldErrors[field];

  return (
    <form action={formAction} className="space-y-5">
      {v.id !== undefined && <input type="hidden" name="id" value={v.id} />}
      <input type="hidden" name="currentImage" value={v.image} />

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

      <Field label="Judul" name="title" error={e("title")}>
        <input
          id="title"
          name="title"
          defaultValue={v.title}
          required
          maxLength={120}
          placeholder="MyApp Project"
          className={gayaInput}
          style={{
            ...gayaInputBerisik,
            borderColor: e("title") ? "#e05c5c" : "var(--border)",
          }}
        />
      </Field>

      <Field
        label="Slug"
        name="slug"
        hint="URL halaman publik. Kosongkan untuk dibuat otomatis dari judul."
        error={e("slug")}
      >
        <input
          id="slug"
          name="slug"
          defaultValue={v.slug}
          maxLength={120}
          placeholder="otomatis-dari-judul"
          className={gayaInput}
          style={{
            ...gayaInputBerisik,
            borderColor: e("slug") ? "#e05c5c" : "var(--border)",
          }}
        />
      </Field>

      <Field label="Kategori" name="category" error={e("category")}>
        <select
          id="category"
          name="category"
          defaultValue={v.category}
          className={gayaInput}
          style={gayaInputBerisik}
        >
          {KATEGORI.map((k) => (
            <option key={k.value} value={k.value}>
              {k.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Deskripsi singkat"
        name="description"
        hint="Tampil di kartu proyek dan meta tag."
        error={e("description")}
      >
        <textarea
          id="description"
          name="description"
          defaultValue={v.description}
          required
          maxLength={300}
          rows={2}
          placeholder="Ringkasan satu sampai dua kalimat."
          className={`${gayaInput} resize-y`}
          style={{
            ...gayaInputBerisik,
            borderColor: e("description") ? "#e05c5c" : "var(--border)",
          }}
        />
      </Field>

      <Field
        label="Deskripsi panjang"
        name="long_description"
        hint="Tampil di halaman detail. Boleh kosong."
        error={e("long_description")}
      >
        <textarea
          id="long_description"
          name="long_description"
          defaultValue={v.long_description}
          maxLength={5000}
          rows={6}
          placeholder="Background, solusi, dan detail teknis project."
          className={`${gayaInput} resize-y`}
          style={gayaInputBerisik}
        />
      </Field>

      <Field
        label="Teknologi"
        name="technologies"
        hint="Pisahkan dengan koma, contoh: Next.js, TypeScript, Tailwind"
        error={e("technologies")}
      >
        <input
          id="technologies"
          name="technologies"
          defaultValue={v.technologies.join(", ")}
          maxLength={300}
          placeholder="Next.js, TypeScript, Tailwind"
          className={gayaInput}
          style={gayaInputBerisik}
        />
      </Field>

      <Field
        label="Gambar proyek"
        name="imageFile"
        hint={v.image ? "Pilih gambar baru hanya jika ingin menggantinya." : "Wajib diisi untuk proyek baru."}
        error={e("image")}
      >
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            if (!file || !fileInputRef.current) return;
            const transfer = new DataTransfer();
            transfer.items.add(file);
            fileInputRef.current.files = transfer.files;
            setSelectedFileName(file.name);
          }}
          className="rounded-xl border border-dashed p-5 text-center transition-colors"
          style={{
            background: "var(--bg-soft)",
            borderColor: e("image") ? "#e05c5c" : "var(--border)",
          }}
        >
          <ImagePlus className="mx-auto mb-2" size={20} style={{ color: "var(--accent)" }} />
          <p className="text-sm" style={{ color: "var(--text)" }}>
            Tarik gambar ke sini atau pilih file
          </p>
          <p className="mt-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
            JPG, PNG, atau WebP · maksimum 5 MB
          </p>
          <input
            ref={fileInputRef}
            id="imageFile"
            name="imageFile"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => setSelectedFileName(event.target.files?.[0]?.name ?? "")}
            className="sr-only"
          />
          <label
            htmlFor="imageFile"
            className="mt-3 inline-flex cursor-pointer rounded-lg px-3 py-2 text-xs font-medium"
            style={{ background: "var(--surface-2)", color: "var(--text)" }}
          >
            Pilih gambar
          </label>
          {selectedFileName && (
            <p className="mt-3 text-xs" style={{ color: "var(--accent)" }}>
              {selectedFileName}
            </p>
          )}
        </div>
      </Field>

      <Field
        label="Link project"
        name="link"
        hint="Opsional. Harus diawali http:// atau https://"
        error={e("link")}
      >
        <input
          id="link"
          name="link"
          defaultValue={v.link}
          maxLength={500}
          placeholder="https://myapp.vercel.app"
          className={gayaInput}
          style={gayaInputBerisik}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          {isPending && <Loader2 size={15} className="animate-spin" />}
          {isPending ? "Menyimpan..." : submitLabel}
        </button>

        <a
          href="/admin/proyek"
          className="inline-flex items-center px-5 py-3 rounded-xl border text-sm transition-all hover:scale-[1.02]"
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
