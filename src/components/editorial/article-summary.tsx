import Image from "next/image";
import Link from "next/link";
import { formatPublicationDate } from "@/lib/articles/format-date";
import type { SampleArticle } from "@/lib/articles/mock-articles";

export function ArticleSummary({ article, lead = false, headingLevel = 3 }: { article: SampleArticle; lead?: boolean; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article id={article.id} aria-labelledby={`${article.id}-title`} className="min-w-0 scroll-mt-6">
      <p className="mb-2 text-xs font-semibold text-muted">{article.category}</p>
      <Heading id={`${article.id}-title`} className={`font-serif font-bold ${lead ? "text-title" : "text-xl leading-snug sm:text-2xl"}`}>
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </Heading>
      {lead && article.image && (
        <figure className="mt-4">
          <Image src={article.image.src} alt={article.image.alt} width={article.image.width} height={article.image.height} sizes="(min-width: 768px) 66vw, 100vw" className="h-auto w-full" />
          {article.image.caption && <figcaption className="mt-2 text-xs leading-5 text-muted">{article.image.caption}</figcaption>}
        </figure>
      )}
      <p className={`mt-3 max-w-reading font-serif text-body ${lead ? "sm:text-lg" : ""}`}>{article.excerpt}</p>
      <time className="mt-3 block text-xs leading-5 text-muted" dateTime={article.publishedAt}>{formatPublicationDate(article.publishedAt)}</time>
    </article>
  );
}
