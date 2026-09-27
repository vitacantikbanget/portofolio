-- ============================================================
-- Tahap 3: Kolom level & icon pada tabel skills, plus RLS admin.
-- ============================================================

-- (1) Tambah kolom level dan icon jika belum ada
alter table public.skills
  add column if not exists level integer default 80 check (level >= 1 and level <= 100),
  add column if not exists icon text;

comment on column public.skills.level is 'Tingkat penguasaan skill dalam persen (1-100).';
comment on column public.skills.icon is 'Nama ikon Lucide (opsional), misal: Code2, Palette, Wrench.';

-- (2) Aktifkan RLS di tabel skills
alter table public.skills enable row level security;

-- (3) Policy SELECT: publik boleh membaca semua skill
drop policy if exists "skills_select_public" on public.skills;
create policy "skills_select_public" on public.skills
  for select
  using (true);

-- (4) Policy INSERT/UPDATE/DELETE: hanya admin via is_admin()
drop policy if exists "skills_insert_admin" on public.skills;
create policy "skills_insert_admin" on public.skills
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists "skills_update_admin" on public.skills;
create policy "skills_update_admin" on public.skills
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "skills_delete_admin" on public.skills;
create policy "skills_delete_admin" on public.skills
  for delete to authenticated
  using (public.is_admin());
