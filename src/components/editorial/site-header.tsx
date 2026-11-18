import Link from "next/link";
import { topics } from "@/lib/topics/topics";

export function SiteHeader({ date }: { date: Date }) {
  const dateLabel = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Saigon",
  }).format(date);
  const isoDate = new Intl.DateTimeFormat("en-CA", {
    year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Saigon",
  }).format(date);

  return (
    <header id="dau-trang" className="site-container">
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-rule py-3 text-xs leading-5 text-muted">
        <time dateTime={isoDate}>{dateLabel}</time>
        <p>Ghi chép & suy ngẫm</p>
      </div>
      <div className="py-5 text-center sm:py-6">
        <Link href="/" className="inline-block font-serif text-[clamp(2.25rem,7vw,4.25rem)] leading-tight font-bold tracking-tight">
          Khoảng lặng<span className="sr-only"> — Trang chủ</span>
        </Link>
        <p className="mt-2 text-xs leading-5 text-muted">Một góc nhìn riêng về những điều thường ngày</p>
      </div>
      <nav aria-label="Chuyên mục" className="border-t border-b-[3px] border-double border-ink">
        <ul className="flex flex-wrap justify-center gap-x-5 px-1 text-sm sm:gap-x-8">
          <li><Link className="inline-flex min-h-11 items-center" href="/#bai-viet">Trang nhất</Link></li>
          {topics.map((topic) => (
            <li key={topic.slug}><Link className="inline-flex min-h-11 items-center" href={`/topics/${topic.slug}`}>{topic.name}</Link></li>
          ))}
          <li>
            <Link href="/search" className="inline-flex min-h-11 min-w-11 items-center justify-center">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" focusable="false">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m16 16 5 5" />
              </svg>
              <span className="sr-only">Tìm kiếm</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
