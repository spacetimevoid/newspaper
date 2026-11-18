import { sampleArticles } from "@/lib/articles/mock-articles";
import type { SampleArticle } from "@/lib/articles/types";
import { getTopicBySlug } from "@/lib/topics/topics";

// Keep filtering and ordering outside the route so pagination can be added here later.
export function getArticlesForTopic(slug: string): readonly SampleArticle[] {
  const topic = getTopicBySlug(slug);
  if (!topic) return [];

  return sampleArticles
    .filter((article) => article.category === topic.name)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
}
