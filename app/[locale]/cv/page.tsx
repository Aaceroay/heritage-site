import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { ButtonLink } from "@/components/Button";
import { publications } from "@/content/publications";
import { courses } from "@/content/courses";
import { talks } from "@/content/talks";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  return buildMetadata({
    locale,
    path: "/cv",
    title: "CV",
    description: locale === "es" ? "Curr\u00edculum vitae en PDF y en HTML." : "Curriculum vitae, available as PDF and HTML.",
  });
}

export default function CvPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <SectionHeading as="h1" title="CV" description={locale === "es" ? "\u00daltima actualizaci\u00f3n: [FECHA]" : "Last updated: [DATE]"} />

      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href="/cv-placeholder.pdf" variant="accent">
          {locale === "es" ? "Descargar PDF" : "Download PDF"}
        </ButtonLink>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-ink/10 dark:border-white/10">
        <iframe
          src="/cv-placeholder.pdf"
          title={locale === "es" ? "Visor de CV en PDF" : "CV PDF viewer"}
          className="h-[600px] w-full"
        />
      </div>

      <p className="mt-4 text-sm text-ink/60 dark:text-ink-dark/60">
        {locale === "es"
          ? "Si el visor de PDF no carga, use el enlace de descarga anterior. A continuaci\u00f3n se ofrece tambi\u00e9n una versi\u00f3n en HTML, accesible para lectores de pantalla y motores de b\u00fasqueda."
          : "If the PDF viewer does not load, use the download link above. An HTML version is also provided below for screen-reader and search-engine accessibility."}
      </p>

      <section className="mt-12">
        <h2 className="font-serif text-xl font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "Versi\u00f3n HTML del CV" : "HTML version of CV"}
        </h2>

        <div className="mt-6">
          <h3 className="font-medium text-ink dark:text-ink-dark">{locale === "es" ? "Educaci\u00f3n" : "Education"}</h3>
          <p className="mt-1 text-sm text-ink/70 dark:text-ink-dark/70">[PLACEHOLDER \u2014 degree, institution, year]</p>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-ink dark:text-ink-dark">{locale === "es" ? "Publicaciones" : "Publications"}</h3>
          <ol className="mt-2 space-y-2 text-sm text-ink/80 dark:text-ink-dark/80">
            {publications.map((pub) => (
              <li key={pub.slug}>
                {pub.authors.join(", ")} ({pub.year}). {pub.title}. {pub.venue ? `${pub.venue}.` : ""}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-ink dark:text-ink-dark">{locale === "es" ? "Docencia" : "Teaching"}</h3>
          <ol className="mt-2 space-y-2 text-sm text-ink/80 dark:text-ink-dark/80">
            {courses.map((course) => (
              <li key={course.slug}>
                {course.title} \u2014 {course.institution}, {course.term}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-ink dark:text-ink-dark">
            {locale === "es" ? "Ponencias y conferencias" : "Talks and conferences"}
          </h3>
          <ol className="mt-2 space-y-2 text-sm text-ink/80 dark:text-ink-dark/80">
            {talks.map((talk) => (
              <li key={talk.slug}>
                {talk.title} \u2014 {talk.event}, {talk.location}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "Materiales del mercado laboral" : "Job-market materials"}
        </h2>
        <p className="mt-2 text-sm text-ink/60 dark:text-ink-dark/60">
          {locale === "es"
            ? "Esta secci\u00f3n se puede activar o desactivar seg\u00fan la etapa del proceso. Nunca se expone informaci\u00f3n privada (direcci\u00f3n particular, tel\u00e9fono privado, cartas de recomendaci\u00f3n confidenciales, datos de participantes)."
            : "This section can be enabled or disabled depending on the stage of the search process. Private information (home address, personal phone number, confidential letters, participant data) is never exposed here."}
        </p>
        <ul className="mt-4 flex flex-wrap gap-3">
          <li>
            <ButtonLink href="/research-statement-placeholder.pdf" variant="secondary">
              {locale === "es" ? "Declaraci\u00f3n de investigaci\u00f3n" : "Research statement"}
            </ButtonLink>
          </li>
          <li>
            <ButtonLink href="/teaching-statement-placeholder.pdf" variant="secondary">
              {locale === "es" ? "Declaraci\u00f3n de ense\u00f1anza" : "Teaching statement"}
            </ButtonLink>
          </li>
          <li>
            <ButtonLink href="/dei-statement-placeholder.pdf" variant="secondary">
              DEIB {locale === "es" ? "(declaraci\u00f3n)" : "statement"}
            </ButtonLink>
          </li>
          <li>
            <ButtonLink href="/job-market-paper-placeholder.pdf" variant="secondary">
              {locale === "es" ? "Art\u00edculo del mercado laboral" : "Job-market paper"}
            </ButtonLink>
          </li>
          <li>
            <ButtonLink href="/sample-syllabus-placeholder.pdf" variant="secondary">
              {locale === "es" ? "Programa de ejemplo" : "Sample syllabus"}
            </ButtonLink>
          </li>
        </ul>
      </section>
    </div>
  );
}
