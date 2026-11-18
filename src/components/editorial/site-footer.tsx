import Link from "next/link";

export function SiteFooter({ year }: { year: number }) {
  return (
    <footer className="site-container mt-8">
      <div className="border-t-[3px] border-double border-ink py-5">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p className="font-serif text-xl font-bold">Khoảng lặng</p>
          <nav aria-label="Điều hướng cuối trang">
            <ul className="flex flex-wrap gap-x-5 text-xs">
              <li><Link className="inline-flex min-h-11 items-center underline" href="/#bai-viet">Bài viết</Link></li>
              <li><a className="inline-flex min-h-11 items-center underline" href="#dau-trang">Về đầu trang ↑</a></li>
            </ul>
          </nav>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted">© {year} Khoảng lặng. Một ấn phẩm cá nhân bằng tiếng Việt.</p>
      </div>
    </footer>
  );
}
