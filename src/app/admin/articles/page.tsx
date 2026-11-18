import { requireAdmin } from "@/lib/auth/admin";
import { logout } from "../actions";

export default async function AdminArticlesPage() {
  const admin = await requireAdmin();
  return <main id="noi-dung" tabIndex={-1} className="mx-auto max-w-reading py-10">
    <h1 className="font-serif text-3xl font-bold">Quản lý bài viết</h1>
    <p className="mt-5 text-sm">Đang đăng nhập: {admin.email ?? admin.id}</p>
    <p className="mt-5 text-base leading-relaxed">Quản lý bài viết sẽ được triển khai trong Phase 3B.</p>
    <form action={logout} className="mt-6"><button className="min-h-11 border border-ink px-4 py-2 text-sm" type="submit">Đăng xuất</button></form>
  </main>;
}
