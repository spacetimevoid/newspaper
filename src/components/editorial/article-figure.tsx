import Image from "next/image";
import type { ArticleImage } from "@/lib/articles/types";

export function ArticleFigure({ image }: { image: ArticleImage }) {
  return (
    <figure>
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 720px) 100vw, 680px" className="h-auto w-full" />
      {image.caption && <figcaption className="mt-2 font-sans text-xs leading-5 text-muted">{image.caption}</figcaption>}
    </figure>
  );
}
