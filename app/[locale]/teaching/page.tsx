import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { notFound } from "next/navigation";
import { courses } from "@/content/courses";
import { SectionHeading } from "@/components/SectionHeading";
import { CourseCard } from "@/components/CourseCard";
import { ButtonLink } from "@/components/Button";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  return buildMetadata({
    locale,
    path: "/teaching",
    title: locale === "es" ? "Docencia" : "Teaching",
    description: locale === "es" ? "Filosof\u00eda de ense\u00f1anza, cursos y mentor\u00eda." : "Teaching philosophy, courses, and mentoring.",
  });
}

const teachingAreas = [
  "Introduction to Sociolinguistics",
  "Spanish in the United States",
  "Spanish Heritage Language",
  "Language and Culture",
  "Language Variation and Change",
  "Raciolinguistics",
  "Linguistic Anthropology",
  "Research Methods",
  "Academic Writing",
  "Second-Language Acquisition",
  "Multilingualism",
  "Language Policy",
  "Community-Based Research",
];

export default function TeachingPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionHeading
        as="h1"
        eyebrow={locale === "es" ? "Docencia" : "Teaching"}
        title={locale === "es" ? "Docencia" : "Teaching"}
      />

      <section className="mt-10">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "Filosof\u00eda de ense\u00f1anza" : "Teaching philosophy"}
        </h2>
        <p className="mt-3 max-w-prose text-ink/80 dark:text-ink-dark/80">
          {locale === "es"
            ? "Placeholder: mi ense\u00f1anza parte del principio de que toda variedad ling\u00fc\u00edstica que el estudiantado trae al aula es un recurso, no un d\u00e9ficit que corregir. Dise\u00f1o evaluaciones inclusivas y materiales que reflejan la diversidad de las comunidades hispanohablantes."
            : "Placeholder: my teaching starts from the principle that every linguistic variety students bring to the classroom is a resource, not a deficit to correct. I design inclusive assessments and materials that reflect the diversity of Spanish-speaking communities."}
        </p>
        <ButtonLink href="/teaching-statement-placeholder.pdf" variant="secondary" className="mt-4">
          {locale === "es" ? "Descargar declaraci\u00f3n de ense\u00f1anza" : "Download teaching statement"}
        </ButtonLink>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "\u00c1reas de docencia" : "Teaching areas"}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {teachingAreas.map((area) => (
            <li key={area} className="rounded-full bg-ink/5 px-3 py-1 text-sm text-ink/80 dark:bg-white/10 dark:text-ink-dark/80">
              {area}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "Cursos" : "Courses"}
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {courses.map((course) => (
            <li key={course.slug}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-lg border border-ink/10 p-6 dark:border-white/10">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "Ense\u00f1anza inclusiva" : "Inclusive teaching practices"}
        </h2>
        <p className="mt-3 max-w-prose text-sm text-ink/80 dark:text-ink-dark/80">
          {locale === "es"
            ? "Placeholder: aplico principios de dise\u00f1o universal para el aprendizaje (DUA), evaluaci\u00f3n flexible y materiales accesibles, e incorporo mentor\u00eda de estudiantado de posgrado y de grado."
            : "Placeholder: I apply Universal Design for Learning principles, flexible assessment, and accessible materials, and I mentor both undergraduate and graduate students."}
        </p>
      </section>
    </div>
  );
}
