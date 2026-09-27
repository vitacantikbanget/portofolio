// Nama cookie doorpass dipakai di dua tempat: src/proxy.ts yang
// menyetelnya, dan src/app/admin/actions.ts yang menghapusnya saat
// logout. Kalau namanya ditulis terpisah di kedua file, keduanya bisa
// diam-diam berbeda dan cookie tidak terhapus. Jadi satu sumber saja.
export const DOORPASS_COOKIE = "admin_doorpass";
