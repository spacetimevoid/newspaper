import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <main id="noi-dung" tabIndex={-1} className="site-container py-12 sm:py-16">
      <div className="mx-auto max-w-[680px]">
        <p className="text-sm text-muted">404</p>
        <h1 className="mt-3 font-serif text-3xl leading-snug font-bold">Không tìm thấy bài viết</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">Bài viết bạn tìm không có trong Khoảng lặng. Bạn có thể trở về trang nhất để đọc những ghi chép khác.</p>
        <Link href="/" className="mt-5 inline-flex min-h-11 items-center text-sm underline">← Về trang nhất</Link>
      </div>
    </main>
  );
}
