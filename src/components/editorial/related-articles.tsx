import Link from "next/link";
import type { SampleArticle } from "@/lib/articles/types";

export function RelatedArticles({ articles }: { articles: readonly SampleArticle[] }) {
  return (
    <section aria-labelledby="related-heading" className="mt-12 border-t-2 border-ink">
      <h2 id="related-heading" className="border-b border-rule py-4 font-serif text-xl font-bold">Đọc tiếp</h2>
      <ul className="divide-y divide-rule">
        {articles.map((article) => (
          <li key={article.id} className="py-5">
            <p className="mb-2 text-xs text-muted">{article.category}</p>
            <h3 className="font-serif text-xl leading-snug font-bold"><Link className="underline decoration-rule hover:decoration-ink" href={`/articles/${article.slug}`}>{article.title}</Link></h3>
            <p className="mt-2 font-serif text-base leading-relaxed text-muted">{article.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
