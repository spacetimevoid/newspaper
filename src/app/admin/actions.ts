"use server";

import { redirect } from "next/navigation";
import { createAuthGateway } from "@/lib/auth/admin";
import { authenticateAdmin, endSession, LOGIN_ERROR, safeAdminRedirect } from "@/lib/auth/policy";

export type LoginState = { error: string };

export async function login(_previous: LoginState, form: FormData): Promise<LoginState> {
  const email = form.get("email");
  const password = form.get("password");
  if (typeof email !== "string" || typeof password !== "string") return { error: LOGIN_ERROR };
  let success = false;
  try {
    const gateway = await createAuthGateway(true);
    success = !!gateway && !!await authenticateAdmin(gateway, email.trim(), password);
  } catch { /* Generic failure, no credential or account details in responses/logs. */ }
  if (!success) return { error: LOGIN_ERROR };
  redirect(safeAdminRedirect(form.get("next")));
}

export async function logout() {
  const gateway = await createAuthGateway(true);
  if (!gateway || !await endSession(gateway)) redirect("/admin/login?logout=failed");
  redirect("/admin/login");
}
