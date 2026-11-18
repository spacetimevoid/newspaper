import type { Metadata } from "next";
import { ArticleSummary } from "@/components/editorial/article-summary";
import { sampleArticles } from "@/lib/articles/mock-articles";
import { cleanSearchQuery, searchArticles } from "@/lib/search/search-articles";

export const metadata: Metadata = {
  title: "Tìm kiếm — Khoảng lặng",
  description: "Tìm bài viết theo tiêu đề, trích đoạn hoặc chuyên mục trong Khoảng lặng.",
};

type SearchPageProps = Readonly<{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  // Repeated q parameters consistently use the first value.
  const query = cleanSearchQuery(Array.isArray(q) ? q[0] : q);
  const articles = searchArticles(sampleArticles, query);

  return (
    <main id="noi-dung" tabIndex={-1} className="site-container py-6 sm:py-8">
      <div className="mx-auto max-w-reading">
        <header className="border-b-2 border-ink pb-5">
          <h1 className="font-serif text-3xl leading-snug font-bold sm:text-4xl">Tìm kiếm</h1>
          <form action="/search" method="get" role="search" className="mt-5">
            <label htmlFor="search-query" className="mb-2 block text-sm font-semibold">Từ khóa</label>
            <div className="flex flex-wrap gap-2">
              <input key={query} id="search-query" type="search" name="q" defaultValue={query} aria-describedby="search-hint" className="min-h-11 min-w-0 flex-1 basis-40 rounded-none border border-muted bg-paper px-3 py-2 text-base text-ink" />
              <button type="submit" className="min-h-11 border border-ink bg-ink px-5 py-2 text-sm text-paper hover:underline">Tìm</button>
            </div>
            <p id="search-hint" className="mt-2 text-sm leading-relaxed text-muted">Tìm theo tiêu đề, trích đoạn hoặc chuyên mục. Có thể nhập tiếng Việt có dấu hoặc không dấu.</p>
          </form>
        </header>
        <p className="border-b border-rule py-4 text-sm leading-relaxed text-muted">
          {query ? <>{articles.length} kết quả cho <span className="wrap-anywhere font-semibold text-ink">“{query}”</span></> : "0 kết quả — Nhập từ khóa để tìm bài viết."}
        </p>
        {articles.length > 0 ? (
          <ul aria-label="Kết quả tìm kiếm" className="divide-y divide-rule">
            {articles.map((article) => (
              <li key={article.id} className="py-6 sm:py-7"><ArticleSummary article={article} headingLevel={2} /></li>
            ))}
          </ul>
        ) : (
          <p className="py-6 text-base leading-relaxed text-muted">
            {query ? "Chưa tìm thấy bài viết phù hợp. Hãy thử từ khóa ngắn hơn hoặc tên chuyên mục như Đời sống, Đọc & viết, Quan sát." : "Bạn có thể bắt đầu với một điều mình quan tâm, chẳng hạn sách, đi bộ hoặc đời sống."}
          </p>
        )}
      </div>
    </main>
  );
}
