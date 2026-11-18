"use client";

import { useActionState } from "react";
import { login } from "../actions";

export function LoginForm({ enabled }: { enabled: boolean }) {
  const [state, action, pending] = useActionState(login, { error: "" });
  const field = "mt-2 block min-h-11 w-full rounded-none border border-muted bg-paper px-3 py-2 text-base";
  return <form action={action} className="mt-6 space-y-5">
    <div><label htmlFor="email" className="text-sm">Email</label><input id="email" name="email" type="email" autoComplete="username" required maxLength={254} className={field} aria-describedby={state.error ? "login-error" : undefined} /></div>
    <div><label htmlFor="password" className="text-sm">Mật khẩu</label><input id="password" name="password" type="password" autoComplete="current-password" required maxLength={4096} className={field} aria-describedby={state.error ? "login-error" : undefined} /></div>
    {state.error && <p id="login-error" role="alert" className="text-sm leading-relaxed">{state.error}</p>}
    <button disabled={!enabled || pending} className="min-h-11 bg-ink px-5 py-2 text-sm text-paper disabled:opacity-60" type="submit">{pending ? "Đang đăng nhập…" : "Đăng nhập"}</button>
  </form>;
}
