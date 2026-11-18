import type { TopicName } from "@/lib/topics/topics";

export type ArticleImage = Readonly<{
  src: `/images/${string}`;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}>;

// Plain strings are rendered as React text, never interpreted as HTML.
export type ArticleBlock =
  | Readonly<{ type: "paragraph"; text: string }>
  | Readonly<{ type: "heading"; level: 2 | 3; text: string }>
  | Readonly<{ type: "blockquote"; text: string }>
  | Readonly<{ type: "list"; ordered: boolean; items: readonly string[] }>
  | Readonly<{ type: "image"; image: ArticleImage }>;

export type SampleArticle = Readonly<{
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: TopicName;
  author: string;
  publishedAt: string;
  status: "draft" | "published";
  content: readonly ArticleBlock[];
  image?: ArticleImage;
}>;
