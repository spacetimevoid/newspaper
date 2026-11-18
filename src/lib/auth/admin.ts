import "server-only";
import { redirect } from "next/navigation";
import { createAuthClient } from "@/lib/supabase/server";
import { checkAdmin, type AuthGateway } from "./policy";

export async function createAuthGateway(writable = false): Promise<AuthGateway | null> {
  const client = await createAuthClient(writable);
  if (!client) return null;
  return {
    async user() {
      const { data, error } = await client.auth.getUser();
      return error ? null : data.user;
    },
    async allowed(id) {
      const { data, error } = await client.from("admin_allowlist").select("user_id").eq("user_id", id).eq("singleton", true).maybeSingle();
      return !error && data?.user_id === id;
    },
    async signIn(email, password) {
      const { error } = await client.auth.signInWithPassword({ email, password });
      return !error;
    },
    async signOut() {
      const { error } = await client.auth.signOut({ scope: "local" });
      return !error;
    },
  };
}

// Invoke inside every protected page, action, or future API operation, not only layouts.
export async function requireAdmin() {
  const gateway = await createAuthGateway();
  const admin = gateway ? await checkAdmin(gateway) : null;
  if (!admin) redirect("/admin/login");
  return admin;
}
