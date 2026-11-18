import Link from "next/link";
import { authConfig } from "@/lib/supabase/config";
import { LoginForm } from "./login-form";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ logout?: string }> }) {
  const configured = !!authConfig();
  const { logout } = await searchParams;
  return <main id="noi-dung" tabIndex={-1} className="mx-auto max-w-md py-10">
    <h1 className="font-serif text-3xl font-bold">Đăng nhập quản trị</h1>
    {!configured && <p className="mt-4 text-sm leading-relaxed" role="status">Đăng nhập chưa sẵn sàng. Vui lòng thử lại sau.</p>}
    {logout === "failed" && <p role="alert" className="mt-4 text-sm">Chưa thể xác nhận đăng xuất. Vui lòng thử lại.</p>}
    <LoginForm enabled={configured} />
    <Link href="/" className="mt-6 inline-flex min-h-11 items-center text-sm underline">← Về trang nhất</Link>
  </main>;
}
