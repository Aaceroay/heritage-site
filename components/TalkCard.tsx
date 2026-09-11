import type { Talk } from "@/lib/types";
import { Tag } from "./Tag";

const typeLabels: Record<Talk["type"], string> = {
  "invited-talk": "Invited talk",
  "conference-presentation": "Conference presentation",
  poster: "Poster",
  workshop: "Workshop",
  "guest-lecture": "Guest lecture",
  panel: "Panel",
  "department-talk": "Department talk",
  "public-lecture": "Public lecture",
};

export function TalkCard({ talk }: { talk: Talk }) {
  const isUpcoming = new Date(talk.date) > new Date();
  const formattedDate = new Date(talk.date).toLocaleDateString(talk.language === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="rounded-lg border border-ink/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-2 flex flex-wrap gap-2">
        <Tag tone="brisa">{typeLabels[talk.type]}</Tag>
        <Tag tone={isUpcoming ? "tierra" : "neutral"}>{isUpcoming ? "Upcoming" : "Past"}</Tag>
      </div>
      <h3 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">{talk.title}</h3>
      <p className="mt-1 text-sm text-ink/70 dark:text-ink-dark/70">
        {talk.event} \u2014 {talk.organization}
      </p>
      <p className="mt-1 text-sm text-ink/60 dark:text-ink-dark/60">
        <time dateTime={talk.date}>{formattedDate}</time> \u00b7 {talk.location}
      </p>
      {talk.abstract ? <p className="mt-3 text-sm text-ink/80 dark:text-ink-dark/80">{talk.abstract}</p> : null}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {talk.slidesUrl ? (
          <a className="font-medium text-brisa-700 underline underline-offset-4 dark:text-brisa-300" href={talk.slidesUrl}>
            Slides
          </a>
        ) : null}
        {talk.handoutUrl ? (
          <a className="font-medium text-brisa-700 underline underline-offset-4 dark:text-brisa-300" href={talk.handoutUrl}>
            Handout
          </a>
        ) : null}
        {talk.recordingUrl ? (
          <a className="font-medium text-brisa-700 underline underline-offset-4 dark:text-brisa-300" href={talk.recordingUrl}>
            Recording
          </a>
        ) : null}
      </div>
    </article>
  );
}
