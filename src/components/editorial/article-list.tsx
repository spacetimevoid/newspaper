import type { SampleArticle } from "@/lib/articles/mock-articles";
import { ArticleSummary } from "@/components/editorial/article-summary";

export function ArticleList({ articles }: { articles: readonly SampleArticle[] }) {
  return (
    <ul className="grid md:grid-cols-2">
      {articles.map((article, index) => (
        <li key={article.id} className={`py-5 ${index > 0 ? "border-t border-rule md:border-t-0 md:border-l md:pl-6" : "md:pr-6"}`}>
          <ArticleSummary article={article} />
        </li>
      ))}
    </ul>
  );
}
