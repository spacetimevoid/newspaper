import type { SampleArticle } from "@/lib/articles/types";

export function cleanSearchQuery(value: string = ""): string {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeSearchText(value: string): string {
  return cleanSearchQuery(value)
    .toLocaleLowerCase("vi")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

// Pure, non-mutating search over public metadata. Body content is intentionally excluded.
export function searchArticles(articles: readonly SampleArticle[], query: string = ""): readonly SampleArticle[] {
  const needle = normalizeSearchText(query);
  if (!needle) return [];

  return articles
    .filter((article) => article.status === "published" &&
      [article.title, article.excerpt, article.category].some((value) => normalizeSearchText(value).includes(needle)))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
}
