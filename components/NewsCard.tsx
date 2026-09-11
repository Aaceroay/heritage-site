import type { NewsItem } from "@/lib/types";
import { Tag } from "./Tag";

export function NewsCard({ item }: { item: NewsItem }) {
  const formattedDate = new Date(item.date).toLocaleDateString(item.language === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="rounded-lg border border-ink/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-2 flex flex-wrap gap-2">
        <Tag tone="brisa">{item.format.replace("-", " ")}</Tag>
        {item.outlet ? <Tag>{item.outlet}</Tag> : null}
      </div>
      <h3 className="font-serif text-base font-semibold text-ink dark:text-ink-dark">
        <a href={item.url} className="hover:text-brisa-700 dark:hover:text-brisa-300">
          {item.title}
        </a>
      </h3>
      <p className="mt-1 text-sm text-ink/60 dark:text-ink-dark/60">
        <time dateTime={item.date}>{formattedDate}</time>
      </p>
      <p className="mt-2 text-sm text-ink/80 dark:text-ink-dark/80">{item.description}</p>
    </article>
  );
}
