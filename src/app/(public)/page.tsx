import { ArticleList } from "@/components/editorial/article-list";
import { ArticleSummary } from "@/components/editorial/article-summary";
import { sampleArticles } from "@/lib/articles/mock-articles";

export default function HomePage() {
  const [lead, ...remaining] = sampleArticles;
  const supporting = remaining.slice(0, 2);
  const additional = remaining.slice(2);

  return (
    <main id="noi-dung" tabIndex={-1} className="site-container">
      <section id="bai-viet" aria-labelledby="front-heading" className="py-5">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h1 id="front-heading" className="text-xs font-bold uppercase tracking-wide">Trang nhất</h1>
          <p className="text-xs text-muted">5 bài viết mẫu</p>
        </div>
        <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-0">
          {lead && <div className="self-start md:pr-7"><ArticleSummary article={lead} lead headingLevel={2} /></div>}
          <ul className="divide-y divide-rule border-t border-rule md:border-t-0 md:border-l md:pl-6">
            {supporting.map((article) => (
              <li key={article.id} className="py-5 first:md:pt-0 last:pb-0"><ArticleSummary article={article} headingLevel={2} /></li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="more-heading" className="mt-3 border-t-2 border-ink">
        <h2 id="more-heading" className="border-b border-rule py-3 font-serif text-lg font-bold">Ghi chép & suy ngẫm</h2>
        <ArticleList articles={additional} />
      </section>
    </main>
  );
}
