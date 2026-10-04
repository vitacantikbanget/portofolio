-- Bucket publik untuk gambar portofolio dan avatar.
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do update set public = true;

alter table storage.objects enable row level security;

drop policy if exists "images_select_public" on storage.objects;
create policy "images_select_public" on storage.objects
  for select using (bucket_id = 'images');

drop policy if exists "images_insert_admin" on storage.objects;
create policy "images_insert_admin" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'images' and public.is_admin());

drop policy if exists "images_update_admin" on storage.objects;
create policy "images_update_admin" on storage.objects
  for update to authenticated
  using (bucket_id = 'images' and public.is_admin())
  with check (bucket_id = 'images' and public.is_admin());

drop policy if exists "images_delete_admin" on storage.objects;
create policy "images_delete_admin" on storage.objects
  for delete to authenticated
  using (bucket_id = 'images' and public.is_admin());
