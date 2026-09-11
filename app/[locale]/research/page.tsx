import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { notFound } from "next/navigation";
import { researchAreas } from "@/content/research-areas";
import { publications } from "@/content/publications";
import { talks } from "@/content/talks";
import { communityProjects } from "@/content/community-projects";
import { SectionHeading } from "@/components/SectionHeading";
import { ButtonLink } from "@/components/Button";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  return buildMetadata({
    locale,
    path: "/research",
    title: locale === "es" ? "Investigaci\u00f3n" : "Research",
    description: locale === "es" ? "Agenda de investigaci\u00f3n organizada por \u00e1rea tem\u00e1tica." : "Research agenda organized by thematic area.",
  });
}

const methods = {
  en: [
    "Sociolinguistic interviews",
    "Ethnographic observation",
    "Community-based participatory research",
    "Discourse analysis",
    "Variationist analysis",
    "Corpus methods",
    "Survey research",
    "Classroom observation",
    "Qualitative coding",
    "Mixed methods",
  ],
  es: [
    "Entrevistas sociolingüísticas",
    "Observación etnográfica",
    "Investigación participativa de base comunitaria",
    "Análisis del discurso",
    "Análisis variacionista",
    "Métodos de corpus",
    "Investigación por encuesta",
    "Observación en el aula",
    "Codificación cualitativa",
    "Métodos mixtos",
  ],
};

const ethics = {
  en: [
    "Informed consent",
    "Community accountability",
    "Confidentiality",
    "Protection of minoritized participants",
    "Responsible use of recordings and language data",
    "Avoiding deficit-based descriptions of heritage speakers",
  ],
  es: [
    "Consentimiento informado",
    "Rendición de cuentas ante la comunidad",
    "Confidencialidad",
    "Protección de participantes minorizados",
    "Uso responsable de grabaciones y datos lingüísticos",
    "Evitar descripciones deficitarias de las personas hablantes de herencia",
  ],
};

export default function ResearchPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const p = (path: string) => `/${locale}${path}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionHeading
        as="h1"
        eyebrow={locale === "es" ? "Agenda de investigaci\u00f3n" : "Research agenda"}
        title={locale === "es" ? "Investigaci\u00f3n" : "Research"}
        description={
          locale === "es"
            ? "Mi investigaci\u00f3n examina la sociolingüística del español como lengua de herencia en Estados Unidos, organizada en las siguientes áreas temáticas."
            : "My research examines the sociolinguistics of Spanish as a heritage language in the United States, organized into the following thematic areas."
        }
      />

      <div className="mt-6">
        <ButtonLink href="/research-statement-placeholder.pdf" variant="secondary">
          {locale === "es" ? "Descargar declaraci\u00f3n de investigaci\u00f3n" : "Download research statement"}
        </ButtonLink>
      </div>

      <div className="mt-12 space-y-10">
        {researchAreas.map((area) => {
          const relatedPubs = publications.filter((pub) => area.relatedPublicationSlugs.includes(pub.slug));
          const relatedTalks = talks.filter((talk) => area.relatedTalkSlugs.includes(talk.slug));
          const relatedProjects = communityProjects.filter((proj) => area.relatedProjectSlugs.includes(proj.slug));

          return (
            <article key={area.slug} id={area.slug} className="scroll-mt-24 border-t border-ink/10 pt-8 dark:border-white/10">
              <h2 className="font-serif text-xl font-semibold text-ink dark:text-ink-dark">{area.title}</h2>
              <p className="mt-2 max-w-prose text-ink/80 dark:text-ink-dark/80">{area.shortDescription}</p>

              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink/50 dark:text-ink-dark/50">
                {locale === "es" ? "Preguntas clave" : "Key questions"}
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/80 dark:text-ink-dark/80">
                {area.keyQuestions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>

              {relatedPubs.length > 0 ? (
                <p className="mt-3 text-sm text-ink/70 dark:text-ink-dark/70">
                  {locale === "es" ? "Publicaciones relacionadas: " : "Related publications: "}
                  {relatedPubs.map((pub) => pub.title).join("; ")}
                </p>
              ) : null}
              {relatedTalks.length > 0 ? (
                <p className="mt-1 text-sm text-ink/70 dark:text-ink-dark/70">
                  {locale === "es" ? "Ponencias relacionadas: " : "Related talks: "}
                  {relatedTalks.map((t) => t.title).join("; ")}
                </p>
              ) : null}
              {relatedProjects.length > 0 ? (
                <p className="mt-1 text-sm text-ink/70 dark:text-ink-dark/70">
                  {locale === "es" ? "Proyectos relacionados: " : "Related projects: "}
                  {relatedProjects.map((proj) => proj.title).join("; ")}
                </p>
              ) : null}

              <ButtonLink href={p(`/publications?theme=${area.slug}`)} variant="secondary" className="mt-4">
                {locale === "es" ? "Ver publicaciones de esta \u00e1rea" : "View publications in this area"}
              </ButtonLink>
            </article>
          );
        })}
      </div>

      <section className="mt-16 rounded-lg border border-ink/10 p-6 dark:border-white/10">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "M\u00e9todos de investigaci\u00f3n" : "Research methods"}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {methods[locale].map((m) => (
            <li key={m} className="rounded-full bg-ink/5 px-3 py-1 text-sm text-ink/80 dark:bg-white/10 dark:text-ink-dark/80">
              {m}
            </li>
          ))}
        </ul>

        <h3 className="mt-6 font-serif text-base font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "\u00c9tica de la investigaci\u00f3n" : "Research ethics"}
        </h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink/80 dark:text-ink-dark/80">
          {ethics[locale].map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
