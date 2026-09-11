import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { notFound } from "next/navigation";
import { communityProjects } from "@/content/community-projects";
import { SectionHeading } from "@/components/SectionHeading";
import { Tag } from "@/components/Tag";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  return buildMetadata({
    locale,
    path: "/community",
    title: locale === "es" ? "Vinculaci\u00f3n Comunitaria" : "Community Engagement",
    description:
      locale === "es"
        ? "Proyectos, alianzas y compromisos \u00e9ticos con comunidades hispanohablantes."
        : "Projects, partnerships, and ethical commitments with Spanish-speaking communities.",
  });
}

const commitments = {
  en: [
    { title: "Community consent", body: "Consent is treated as ongoing and revisable, not a one-time signature, and is negotiated in the community's preferred language." },
    { title: "Collaborative knowledge production", body: "Community partners help shape research questions and review findings before dissemination." },
    { title: "Accessible dissemination", body: "Findings are shared back in plain-language, bilingual formats \u2014 not only in academic venues." },
    { title: "Compensation and recognition", body: "Participants' and partners' time and expertise are compensated and credited." },
    { title: "Data sovereignty", body: "Communities retain a say in how their language data is stored, used, and shared." },
    { title: "Linguistic dignity", body: "All varieties of Spanish are treated as legitimate; no variety is described as broken or deficient." },
  ],
  es: [
    { title: "Consentimiento comunitario", body: "El consentimiento se trata como un proceso continuo y revisable, no una firma \u00fanica, y se negocia en el idioma preferido de la comunidad." },
    { title: "Producci\u00f3n colaborativa de conocimiento", body: "Los socios comunitarios ayudan a formular las preguntas de investigaci\u00f3n y revisan los hallazgos antes de su difusi\u00f3n." },
    { title: "Difusi\u00f3n accesible", body: "Los hallazgos se comparten en formatos biling\u00fces y de lenguaje claro, no solo en \u00e1mbitos acad\u00e9micos." },
    { title: "Compensaci\u00f3n y reconocimiento", body: "El tiempo y la experiencia de participantes y socios se compensan y se reconocen." },
    { title: "Soberan\u00eda de datos", body: "Las comunidades conservan voz sobre c\u00f3mo se almacenan, usan y comparten sus datos ling\u00fc\u00edsticos." },
    { title: "Dignidad ling\u00fc\u00edstica", body: "Todas las variedades del espa\u00f1ol se tratan como leg\u00edtimas; ninguna variedad se describe como incorrecta o deficiente." },
  ],
};

export default function CommunityPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionHeading
        as="h1"
        eyebrow={locale === "es" ? "Vinculaci\u00f3n comunitaria" : "Community engagement"}
        title={locale === "es" ? "Vinculaci\u00f3n Comunitaria" : "Community Engagement"}
        description={
          locale === "es"
            ? "Mi investigaci\u00f3n se desarrolla en relaci\u00f3n rec\u00edproca con comunidades hispanohablantes, no \u00fanicamente sobre ellas."
            : "My research is developed in reciprocal relationship with Spanish-speaking communities \u2014 not only about them."
        }
      />

      <section className="mt-10">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "Proyectos comunitarios" : "Community projects"}
        </h2>
        <ul className="mt-4 space-y-4">
          {communityProjects.map((proj) => (
            <li key={proj.slug} className="rounded-lg border border-ink/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-wrap items-center gap-2">
                <Tag tone="brisa">{proj.year}</Tag>
                <Tag>{proj.partner}</Tag>
              </div>
              <h3 className="mt-2 font-serif text-lg font-semibold text-ink dark:text-ink-dark">{proj.title}</h3>
              <p className="mt-2 text-sm text-ink/80 dark:text-ink-dark/80">{proj.description}</p>
              <p className="mt-2 text-sm text-ink/60 dark:text-ink-dark/60">
                {locale === "es" ? "Rol: " : "Role: "}
                {proj.role}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {proj.outputs.map((out) => (
                  <li key={out}>
                    <Tag tone="tierra">{out}</Tag>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-lg border border-brisa-200 bg-brisa-50/60 p-6 dark:border-brisa-800 dark:bg-brisa-900/20">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "Compromisos \u00e9ticos" : "Ethical commitments"}
        </h2>
        <dl className="mt-4 grid gap-5 sm:grid-cols-2">
          {commitments[locale].map((c) => (
            <div key={c.title}>
              <dt className="font-medium text-ink dark:text-ink-dark">{c.title}</dt>
              <dd className="mt-1 text-sm text-ink/80 dark:text-ink-dark/80">{c.body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
