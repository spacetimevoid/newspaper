import type { ArticleBlock } from "@/lib/articles/types";
import { ArticleFigure } from "@/components/editorial/article-figure";

function ContentBlock({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "heading": {
      const Heading = block.level === 2 ? "h2" : "h3";
      return <Heading className={`pt-3 font-bold ${block.level === 2 ? "text-2xl leading-snug" : "text-xl leading-snug"}`}>{block.text}</Heading>;
    }
    case "blockquote":
      return <blockquote className="border-l-2 border-ink pl-5 text-muted"><p>{block.text}</p></blockquote>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return <List className={`space-y-2 pl-6 ${block.ordered ? "list-decimal" : "list-disc"}`}>
        {block.items.map((item, index) => <li key={index} className="pl-1 wrap-anywhere">{item}</li>)}
      </List>;
    }
    case "image":
      return <ArticleFigure image={block.image} />;
    default: {
      const exhaustive: never = block;
      return exhaustive;
    }
  }
}

export function ArticleBody({ content }: { content: readonly ArticleBlock[] }) {
  return (
    <div className="space-y-6 font-serif text-lg leading-[1.7] sm:text-[19px]">
      {content.map((block, index) => <ContentBlock key={index} block={block} />)}
    </div>
  );
}
