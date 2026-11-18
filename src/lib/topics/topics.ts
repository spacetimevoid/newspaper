export type Topic = Readonly<{
  slug: string;
  name: string;
  description: string;
}>;

export const topics = [
  {
    slug: "doi-song",
    name: "Đời sống",
    description: "Những ghi chép về nhịp sống thường ngày và những điều nhỏ bé đáng để tâm.",
  },
  {
    slug: "doc-va-viet",
    name: "Đọc & viết",
    description: "Từ những trang sách đến trang giấy: suy ngẫm về việc đọc, viết và lắng nghe mình.",
  },
  {
    slug: "quan-sat",
    name: "Quan sát",
    description: "Nhìn gần hơn những con đường, con người và câu chuyện ở quanh mình.",
  },
] as const satisfies readonly Topic[];

export type TopicName = (typeof topics)[number]["name"];
export type TopicSlug = (typeof topics)[number]["slug"];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}
