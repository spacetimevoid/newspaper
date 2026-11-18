import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleSummary } from "@/components/editorial/article-summary";
import { getTopicBySlug } from "@/lib/topics/topics";
import { getArticlesForTopic } from "@/lib/topics/topic-articles";

type TopicPageProps = Readonly<{ params: Promise<{ slug: string }> }>;

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Không tìm thấy chuyên mục — Khoảng lặng", robots: { index: false, follow: false } };
  return { title: `${topic.name} — Khoảng lặng`, description: topic.description };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();
  const articles = getArticlesForTopic(topic.slug);

  return (
    <main id="noi-dung" tabIndex={-1} className="site-container py-6 sm:py-8">
      <div className="mx-auto max-w-reading">
        <Link href="/" className="inline-flex min-h-11 items-center text-sm text-muted underline">← Về trang nhất</Link>
        <header className="mt-4 border-b-2 border-ink pb-5">
          <p className="mb-2 text-xs font-semibold text-muted">Chuyên mục</p>
          <h1 className="font-serif text-3xl leading-snug font-bold sm:text-4xl">{topic.name}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">{topic.description}</p>
        </header>
        {articles.length > 0 ? (
          <ul aria-label={`Bài viết trong chuyên mục ${topic.name}`} className="divide-y divide-rule">
            {articles.map((article) => (
              <li key={article.id} className="py-6 sm:py-7"><ArticleSummary article={article} headingLevel={2} /></li>
            ))}
          </ul>
        ) : (
          <p className="py-6 text-base leading-relaxed text-muted">Chuyên mục này chưa có bài viết. Mời bạn trở lại trang nhất để đọc những ghi chép khác.</p>
        )}
      </div>
    </main>
  );
}
