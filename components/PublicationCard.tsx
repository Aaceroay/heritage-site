import type { Publication } from "@/lib/types";
import { Tag } from "./Tag";

const typeLabels: Record<Publication["type"], string> = {
  "journal-article": "Journal article",
  "book-chapter": "Book chapter",
  "edited-volume": "Edited volume",
  "encyclopedia-entry": "Encyclopedia entry",
  review: "Review",
  "dissertation-chapter": "Dissertation chapter",
  "working-paper": "Working paper",
  "manuscript-under-review": "Manuscript under review",
  "manuscript-in-preparation": "Manuscript in preparation",
  "public-scholarship": "Public scholarship",
  "policy-brief": "Policy brief",
};

export function PublicationCard({ pub, abstractLabel, doiLabel }: { pub: Publication; abstractLabel: string; doiLabel: string }) {
  return (
    <article className="rounded-lg border border-ink/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Tag tone="brisa">{typeLabels[pub.type]}</Tag>
        <Tag>{pub.year}</Tag>
        {pub.status === "forthcoming" ? <Tag tone="tierra">Forthcoming</Tag> : null}
        {pub.status === "under-review" ? <Tag>Under review</Tag> : null}
        {pub.peerReviewed ? <Tag>Peer-reviewed</Tag> : null}
        {pub.openAccess ? <Tag tone="tierra">Open access</Tag> : null}
      </div>

      <h3 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">{pub.title}</h3>
      <p className="mt-1 text-sm text-ink/70 dark:text-ink-dark/70">
        {pub.authors.join(", ")}
        {pub.venue ? ` \u2014 ${pub.venue}` : ""}
      </p>

      <details className="mt-3 text-sm">
        <summary className="cursor-pointer font-medium text-brisa-700 dark:text-brisa-300">{abstractLabel}</summary>
        <p className="mt-2 text-ink/80 dark:text-ink-dark/80">{pub.abstract}</p>
      </details>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {pub.doi ? (
          <a
            className="font-medium text-brisa-700 underline underline-offset-4 hover:text-brisa-900 dark:text-brisa-300"
            href={`https://doi.org/${pub.doi}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {doiLabel}
          </a>
        ) : null}
        {pub.links?.pdf ? (
          <a className="font-medium text-brisa-700 underline underline-offset-4 hover:text-brisa-900 dark:text-brisa-300" href={pub.links.pdf}>
            PDF
          </a>
        ) : null}
        {pub.links?.repository ? (
          <a className="font-medium text-brisa-700 underline underline-offset-4 hover:text-brisa-900 dark:text-brisa-300" href={pub.links.repository}>
            Repository
          </a>
        ) : null}
        {pub.links?.publisher ? (
          <a className="font-medium text-brisa-700 underline underline-offset-4 hover:text-brisa-900 dark:text-brisa-300" href={pub.links.publisher}>
            Publisher
          </a>
        ) : null}
      </div>
    </article>
  );
}
