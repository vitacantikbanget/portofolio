import { createServerClient } from "@supabase/ssr";
import { timingSafeEqual } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import { DOORPASS_COOKIE } from "@/lib/auth-cookie";

// Perbandingan timing-safe supaya doorpass tidak bisa ditebak lewat
// pengukuran waktu respons. Panjang buffer harus sama dulu.
function isValidDoorpass(candidate: string, expected: string) {
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
          // Header cache dari library wajib diteruskan, kalau tidak
          // CDN bisa menyimpan respons yang membawa Set-Cookie.
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value),
          );
        },
      },
    },
  );

  // Jangan ada kode di antara createServerClient dan getClaims().
  const { data } = await supabase.auth.getClaims();
  const isSignedIn = Boolean(data?.claims);

  const pathname = request.nextUrl.pathname;

  // Guard SELURUH route di bawah /admin, bukan hanya /admin persis.
  // Matcher menutup /admin/:path*, jadi kalau guardnya cuma "/admin"
  // maka /admin/... akan lolos tanpa cek doorpass sama sekali.
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLoginRoute = pathname === "/login";
  // config.matcher hanya /admin/:path* dan /login, jadi di titik ini
  // isAdminRoute atau isLoginRoute pasti true.

  const expected = process.env.ADMIN_DOORPASS;
  const doorCookie = request.cookies.get(DOORPASS_COOKIE)?.value;
  const hasDoor = Boolean(
    expected && doorCookie && isValidDoorpass(doorCookie, expected),
  );

  // Pintu masuk sekali jalan, dan hanya di /admin: /admin?doorpass=...
  // menyetel cookie lalu mengarahkan ke /login tanpa query string,
  // supaya secret tidak tinggal di history browser atau header Referer.
  const queryDoor = request.nextUrl.searchParams.get("doorpass");
  if (
    isAdminRoute &&
    !hasDoor &&
    expected &&
    queryDoor &&
    isValidDoorpass(queryDoor, expected)
  ) {
    const redirectResponse = NextResponse.redirect(
      new URL("/login", request.url),
    );

    redirectResponse.cookies.set(DOORPASS_COOKIE, expected, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // Sengaja TANPA maxAge: cookie jadi session cookie yang ikut mati
      // saat browser ditutup, dan dihapus lagi di signOut(). Jadi setiap
      // sesi baru harus mengetik doorpass lagi.
    });

    // Bawa cookie session hasil refresh, kalau ada.
    supabaseResponse.cookies
      .getAll()
      .forEach((c) => redirectResponse.cookies.set(c));

    return redirectResponse;
  }

  // Tanpa doorpass, /admin DAN /login sama-sama 404, supaya tidak
  // bocorkan bahwa aplikasi ini punya halaman admin.
  if (!hasDoor) {
    return new NextResponse(null, { status: 404 });
  }

  // Punya doorpass tapi belum login -> arahkan ke form login.
  if (isAdminRoute && !isSignedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Sudah punya session? jangan tampilkan form login lagi.
  if (isLoginRoute && isSignedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return supabaseResponse;
}

export const config = {
  // Hanya /admin dan /login. Matcher harus konstanta statis, dan
  // sengaja tidak mencakup halaman publik supaya tidak menambah
  // satu round-trip Supabase di setiap request pengunjung.
  matcher: ["/admin/:path*", "/login"],
};
