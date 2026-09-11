import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { notFound } from "next/navigation";
import { dissertation } from "@/content/bio";
import { SectionHeading } from "@/components/SectionHeading";
import { Tag } from "@/components/Tag";
import { ButtonLink } from "@/components/Button";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  return buildMetadata({
    locale,
    path: "/dissertation",
    title: locale === "es" ? "Tesis doctoral" : "Dissertation",
    description: dissertation.en.abstract,
  });
}

const statusTone: Record<string, "brisa" | "tierra" | "neutral"> = {
  complete: "brisa",
  "in progress": "tierra",
  "not started": "neutral",
};

export default function DissertationPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = dissertation.en; // authored in English; translate if the candidate wants a Spanish version

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Tag tone="tierra">{locale === "es" ? "En progreso" : "In progress"}</Tag>
      <h1 className="mt-3 font-serif text-2xl font-bold text-ink dark:text-ink-dark sm:text-3xl">{d.title}</h1>
      <p className="mt-2 text-ink/70 dark:text-ink-dark/70">
        {d.stage} \u00b7 {locale === "es" ? "Finalizaci\u00f3n prevista" : "Expected completion"}: {d.expectedCompletion}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href="/dissertation-abstract-placeholder.pdf" variant="secondary">
          {locale === "es" ? "Descargar resumen" : "Download abstract"}
        </ButtonLink>
        <ButtonLink href="/job-market-paper-placeholder.pdf" variant="secondary">
          {locale === "es" ? "Art\u00edculo del mercado laboral" : "Job-market paper"}
        </ButtonLink>
      </div>

      <SectionHeading as="h2" title={locale === "es" ? "Resumen" : "Abstract"} />
      <p className="mt-3 max-w-prose text-ink/80 dark:text-ink-dark/80">{d.abstract}</p>

      <SectionHeading as="h2" title={locale === "es" ? "Preguntas de investigaci\u00f3n" : "Research questions"} />
      <ul className="mt-3 list-disc space-y-1 pl-5 text-ink/80 dark:text-ink-dark/80">
        {d.researchQuestions.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ul>

      <SectionHeading as="h2" title={locale === "es" ? "Marco te\u00f3rico" : "Theoretical framework"} />
      <p className="mt-3 max-w-prose text-ink/80 dark:text-ink-dark/80">{d.theoreticalFramework}</p>

      <SectionHeading as="h2" title={locale === "es" ? "Metodolog\u00eda" : "Methodology"} />
      <p className="mt-3 max-w-prose text-ink/80 dark:text-ink-dark/80">{d.methodology}</p>

      <SectionHeading as="h2" title={locale === "es" ? "Contribuciones" : "Contributions"} />
      <dl className="mt-3 space-y-3">
        <div>
          <dt className="font-medium text-ink dark:text-ink-dark">
            {locale === "es" ? "A la ling\u00fc\u00edstica aplicada" : "To Applied Linguistics"}
          </dt>
          <dd className="text-ink/80 dark:text-ink-dark/80">{d.contributions.appliedLinguistics}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink dark:text-ink-dark">
            {locale === "es" ? "A la sociolingu\u00edstica" : "To sociolinguistics"}
          </dt>
          <dd className="text-ink/80 dark:text-ink-dark/80">{d.contributions.sociolinguistics}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink dark:text-ink-dark">
            {locale === "es" ? "Al espa\u00f1ol de herencia" : "To Spanish heritage-language research"}
          </dt>
          <dd className="text-ink/80 dark:text-ink-dark/80">{d.contributions.heritageSpanish}</dd>
        </div>
      </dl>

      <SectionHeading as="h2" title={locale === "es" ? "Cap\u00edtulos" : "Chapter overview"} />
      <ul className="mt-3 divide-y divide-ink/10 dark:divide-white/10">
        {d.chapters.map((ch) => (
          <li key={ch.title} className="flex items-center justify-between gap-4 py-2">
            <span className="text-ink/80 dark:text-ink-dark/80">{ch.title}</span>
            <Tag tone={statusTone[ch.status] ?? "neutral"}>{ch.status}</Tag>
          </li>
        ))}
      </ul>

      <SectionHeading as="h2" title={locale === "es" ? "Comit\u00e9" : "Committee"} />
      <ul className="mt-3 space-y-1 text-ink/80 dark:text-ink-dark/80">
        {d.committee.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </div>
  );
}
