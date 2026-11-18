import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/editorial/article-body";
import { ArticleFigure } from "@/components/editorial/article-figure";
import { RelatedArticles } from "@/components/editorial/related-articles";
import { getArticleBySlug, getRelatedArticles } from "@/lib/articles/mock-articles";
import { formatPublicationDate } from "@/lib/articles/format-date";

type ArticlePageProps = Readonly<{ params: Promise<{ slug: string }> }>;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Không tìm thấy bài viết — Khoảng lặng", robots: { index: false, follow: false } };
  return { title: `${article.title} — Khoảng lặng`, description: article.excerpt };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <main id="noi-dung" tabIndex={-1} className="site-container py-6 sm:py-8">
      <div className="mx-auto max-w-[680px]">
        <Link href="/" className="inline-flex min-h-11 items-center text-sm text-muted underline">← Về trang nhất</Link>
        <article aria-labelledby="article-title">
          <header className="mt-5 border-b border-rule pb-6 sm:mt-7">
            <p className="mb-3 text-sm font-semibold text-muted">{article.category}</p>
            <h1 id="article-title" className="font-serif text-[32px] leading-[1.25] font-bold sm:text-[40px] lg:text-[48px]">{article.title}</h1>
            <p className="mt-5 font-serif text-xl leading-relaxed text-muted sm:text-[22px]">{article.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm leading-6 text-muted">
              <p>Bởi <span className="font-semibold text-ink">{article.author}</span></p>
              <time dateTime={article.publishedAt}>{formatPublicationDate(article.publishedAt)}</time>
            </div>
            {article.image && <div className="mt-6"><ArticleFigure image={article.image} /></div>}
          </header>
          <div className="pt-7 sm:pt-8"><ArticleBody content={article.content} /></div>
        </article>
        <RelatedArticles articles={getRelatedArticles(article)} />
        <Link href="/" className="mt-4 inline-flex min-h-11 items-center text-sm underline">← Về trang nhất</Link>
      </div>
    </main>
  );
}
