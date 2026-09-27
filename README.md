# Portfolio Desvita Putri

Website portfolio pribadi dengan Next.js + Supabase.

## Tabel Database

### 1. `projects`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | int8 | Primary Key |
| slug | text | URL slug |
| title | text | Judul project |
| category | text | web / uiux |
| description | text | Deskripsi singkat |
| long_description | text | Deskripsi panjang |
| technologies | text[] | Array teknologi |
| image | text | Path gambar |
| link | text | Link project |
| created_at | timestamptz | Waktu dibuat |

### 2. `skills`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | int8 | Primary Key |
| name | text | Nama skill |
| category | text | frontend / design / tools |
| created_at | timestamptz | Waktu dibuat |

### 3. `profile`
Satu baris = satu user Supabase Auth. Menyimpan role admin/editor.

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Primary Key, FK ke `auth.users(id)` ON DELETE CASCADE |
| username | text | Nama tampilan |
| role | text | admin / editor, default `admin` |
| created_at | timestamptz | Waktu dibuat |

### 4. `admin_activity`
Log aktivitas admin.

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | int8 | Primary Key (identity) |
| user_id | uuid | FK ke `auth.users(id)` ON DELETE SET NULL |
| action | text | create / update / delete / login |
| project_title | text | Judul project terkait (opsional) |
| created_at | timestamptz | Waktu dibuat |

### 5. `pesan_kontak`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | int8 | Primary Key |
| nama | text | Nama pengirim |
| email | text | Email pengirim |
| pesan | text | Isi pesan |
| created_at | timestamptz | Waktu dibuat |

## Fungsi

### `public.is_admin()`
`returns boolean` — true kalau user yang sedang login punya `role = 'admin'`
di tabel `profile`.

Didefinisikan `security definer` supaya policy di tabel `profile` tidak
memanggil dirinya sendiri secara rekursif, dengan `set search_path = ''` agar
`auth.uid()` tidak bisa di-hijack lewat objek di search path.

> Jangan pernah menjalankan `alter table public.profile force row level security`.
> Begitu RLS dipaksa untuk owner, `is_admin()` ikut tunduk pada policy `profile`
> dan select akan error `42P17` (infinite recursion).

## Policy RLS

- **projects:** SELECT (public), INSERT + UPDATE + DELETE (authenticated)
- **skills:** SELECT (public)
- **pesan_kontak:** INSERT + SELECT (public)
- **profile:** SELECT (own row atau `is_admin()`), INSERT (own row, role terkunci
  `editor`), UPDATE (own row dengan role terkunci `editor`, atau `is_admin()`)
- **admin_activity:** SELECT + INSERT (`is_admin()`)

## Auth: Proxy dan Client Server

### `src/proxy.ts`
Proxy Next.js 16 (sebelumnya `middleware.ts`) yang me-refresh session Supabase
sebelum halaman dirender, karena Server Component tidak bisa menulis cookie.

Tanggung jawabnya:

1. Me-refresh token auth lewat `supabase.auth.getClaims()`.
2. Meneruskan token baru ke Server Component lewat `request.cookies.set`.
3. Meneruskannya ke browser lewat `response.cookies.set`, sekaligus header
   cache dari library (`Cache-Control`, `Expires`, `Pragma`) supaya respons
   ber-`Set-Cookie` tidak dicache CDN dan bocor ke user lain.

Matcher sengaja hanya `['/admin/:path*', '/login']`.

> Kalau nanti ada halaman terautentikasi di luar `/admin`, **matcher wajib
> dilebarkan**. Kalau tidak, session di route itu tidak pernah di-refresh.

### `src/lib/supabase-server.ts`
`createClient()` untuk Server Component / Server Action. Membaca session dari
cookie request, jadi harus dipanggil ulang di tiap request:

```ts
const supabase = await createClient();
```

`setAll`-nya dibungkus `try/catch` karena Server Component memang tidak bisa
menulis cookie. `src/lib/supabase.ts` yang lama tetap dipakai untuk data publik
(anon, tanpa cookie) - jangan pakai yang cookie-bound untuk data publik.

### Doorpass
`ADMIN_DOORPASS` bukan autentikasi, hanya penyamar pintu `/admin` **dan
`/login`**. Satu-satunya pintu masuk adalah `/admin?doorpass=<nilai>`: proxy
menyetel cookie `admin_doorpass` (httpOnly, session cookie) lalu mengarahkan
ke `/login` tanpa query string, supaya secret tidak tinggal di history browser
atau header `Referer`. Kalau `ADMIN_DOORPASS` kosong di env, semua akses
doorpass langsung 404 (fail-closed).

Nama cookie-nya didefinisikan sekali di `src/lib/auth-cookie.ts`, dipakai
`src/proxy.ts` untuk menyetel dan `src/app/admin/actions.ts` untuk menghapus.
Jangan tulis ulang string-nya di file lain.

Cookie **sengaja tanpa `maxAge`**, jadi ikut mati saat browser ditutup.
Dikombinasikan dengan penghapusan di `signOut()`, artinya setiap sesi baru
memang wajib mengetik `/admin?doorpass=<nilai>` lagi.

`/login` juga ikut 404 tanpa doorpass supaya form login tidak kelihatan saat
orang asal membuka URL. Ini hanya kosmetik, bukan pengaman: brute force tetap
bisa dilakukan langsung ke endpoint Supabase `/auth/v1/token` tanpa menyentuh
`/login`.

> Doorpass yang bocor tetap memberi akses database **nol**. Pengaman
> sesungguhnya tetap session Supabase + `is_admin()` + RLS, yang harus dicek di
> dalam page/Server Action - bukan mengandalkan Proxy. Proxy hanya refresh token
> dan menyembunyikan route.
>
> Cookie doorpass tidak bisa dihapus dari Proxy saat session habis, karena
> alurnya memang butuh cookie itu bertahan di antara "masuk doorpass" dan
> "login". Karena itu penghapusannya dilakukan eksplisit di `signOut()`.

## Halaman Admin

### `/login`
Form login (email + password) yang memanggil Server Action `signIn`. Route ini
hanya bisa dibuka kalau cookie `admin_doorpass` sudah ada, jadi formnya tidak
ditemukan orang yang asal membuka `/login`. Halamannya Server Component supaya
bisa export `metadata` (termasuk `robots: noindex`), tapi bagian beranimasi
dipisah ke `LoginCard.tsx` - `motion.*` dari framer-motion hanya bisa dipakai di
client component.

Server Action-nya di `src/app/login/actions.ts`, memakai `useActionState` di
`LoginForm.tsx`. Password salah dibalas dengan pesan yang sama untuk "email
tidak terdaftar" dan "password salah", supaya email terdaftar tidak bisa
dipetakan orang.

### `/admin`
Shell dashboard. Gerbangnya dua lapis:

1. `getClaims()` - kalau tidak ada session, `redirect("/login")`.
2. `rpc("is_admin")` - kalau false, `notFound()`.

Langkah kedua yang menentukan. `is_admin()` membaca tabel `profile`, jadi
keputusan role diambil dari database, bukan dari isi cookie.

Halaman ini juga menampilkan 10 aktivitas terakhir dari `admin_activity`, dan
tombol keluar yang memanggil `signOut` (`src/app/admin/actions.ts`).

### Alur lengkap

```
/admin  tanpa doorpass            -> 404 (route disembunyikan)
/login  tanpa doorpass            -> 404 (form login disembunyikan)
/admin?doorpass=<benar>           -> 307 ke /login, cookie doorpass disetel
/login  doorpass ok, belum login  -> 200 (form login)
/login  doorpass ok, sudah login  -> 307 ke /admin
/admin  doorpass ok, belum login  -> 307 ke /login
/admin  doorpass ok, sudah login  -> 200 (halaman + cek is_admin)
tekan "Keluar"                    -> cookie doorpass dihapus, 307 ke beranda
```

Setelah keluar, satu-satunya jalan masuk lagi adalah `/admin?doorpass=<nilai>`.
`signOut()` sengaja mengarahkan ke beranda, bukan ke `/login`, karena `/login`
sekarang juga 404 tanpa doorpass - mengarahkan ke sana akan berakhir di halaman
kosong tepat setelah user menekan Keluar.

Kalau browser ditutup tapi session Supabase masih ada, cookie doorpass hilang
(session cookie) sementara session bertahan. Membuka `/admin` langsung tetap 404;
harus lewat `/admin?doorpass=<nilai>` sekali lagi, lalu proxy meloloskan ke
`/admin` karena session-nya masih hidup.

Setiap login yang berhasil menulis satu baris `admin_activity` dengan
`action = 'login'`. Kegagalan menulis log tidak pernah menggagalkan login.
Logout sengaja tidak dicatat - nilai `action` di database hanya menerima
`create`, `update`, `delete`, dan `login`, dan menambah `logout` butuh
migration yang belum diperlukan.

## Environment Variables

Buat file `.env.local`:
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

## Cara Menjalankan

npm install
npm run dev