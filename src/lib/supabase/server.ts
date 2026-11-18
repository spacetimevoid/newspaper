import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { authConfig, sessionCookieOptions } from "./config";

export async function createAuthClient(writable = false) {
  const config = authConfig();
  if (!config) return null;
  const store = await cookies();
  return createServerClient(config.url, config.key, {
    cookieOptions: sessionCookieOptions,
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
    cookies: {
      getAll: () => store.getAll(),
      setAll(values) {
        // Server Components are read-only; the admin proxy refreshes their cookies.
        if (writable) values.forEach(({ name, value, options }) => store.set(name, value, { ...options, ...sessionCookieOptions }));
      },
    },
  });
}
