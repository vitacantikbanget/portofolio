-- Tahap 5: slug proyek harus unik.
--
-- Halaman publik /projects/[slug] mencari dengan .eq("slug", slug).single().
-- Kalau ada dua baris dengan slug sama, .single() mengembalikan error,
-- getProjectBySlug() mengembalikan null, dan halaman publiknya jadi 404 -
-- bukan cuma halaman admin yang kacau. Jadi ini dicek di level database,
-- bukan cuma di form.
--
-- Pakai lower(slug) supaya "my-project" dan "My-Project" dianggap sama.
create unique index if not exists projects_slug_unik on public.projects (lower(slug));

comment on index public.projects_slug_unik is
  'Satu slug proyek hanya boleh dipakai satu proyek, tidak_case_sensitive.';
