import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { authConfig, sessionCookieOptions } from "@/lib/supabase/config";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  const config = authConfig();
  if (!config) return response;
  const client = createServerClient(config.url, config.key, {
    cookieOptions: sessionCookieOptions,
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(values, headers) {
        values.forEach(({ name, value }) => request.cookies.set(name, value));
        const previous = response.cookies.getAll();
        response = NextResponse.next({ request });
        previous.forEach((cookie) => response.cookies.set(cookie));
        values.forEach(({ name, value, options }) => response.cookies.set(name, value, { ...options, ...sessionCookieOptions }));
        Object.entries(headers ?? {}).forEach(([key, value]) => response.headers.set(key, value));
        response.headers.set("Cache-Control", "private, no-store, max-age=0");
      },
    },
  });
  try { await client.auth.getUser(); } catch { /* Page/action guard independently denies access. */ }
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
