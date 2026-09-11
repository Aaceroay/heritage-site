import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { notFound } from "next/navigation";
import { bios } from "@/content/bio";
import { affiliations } from "@/content/site-config";
import { SectionHeading } from "@/components/SectionHeading";
import { CopyBioButton } from "@/components/CopyBioButton";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  return buildMetadata({
    locale,
    path: "/about",
    title: locale === "es" ? "Sobre m\u00ed" : "About",
    description: locale === "es" ? "Biograf\u00eda profesional y perspectiva de investigaci\u00f3n." : "Professional biography and research perspective.",
  });
}

const perspectiveItems = {
  en: [
    "Variation within Spanish-speaking communities",
    "Intersectionality",
    "Race and racialization",
    "Regional and transnational identities",
    "Family language practices",
    "Institutional language ideologies",
    "Educational equity",
    "Community knowledge",
    "Ethical representation of participants",
  ],
  es: [
    "Variaci\u00f3n dentro de las comunidades hispanohablantes",
    "Interseccionalidad",
    "Raza y racializaci\u00f3n",
    "Identidades regionales y transnacionales",
    "Pr\u00e1cticas ling\u00fc\u00edsticas familiares",
    "Ideolog\u00edas ling\u00fc\u00edsticas institucionales",
    "Equidad educativa",
    "Conocimiento comunitario",
    "Representaci\u00f3n \u00e9tica de las personas participantes",
  ],
};

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const bio = bios[locale];
  const perspective = perspectiveItems[locale];

  const copyLabel = locale === "es" ? "Copiar" : "Copy";
  const copiedLabel = locale === "es" ? "\u00a1Copiado!" : "Copied!";

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <SectionHeading as="h1" eyebrow={locale === "es" ? "Biograf\u00eda" : "Biography"} title={locale === "es" ? "Sobre m\u00ed" : "About"} />

      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
            {locale === "es" ? "Biograf\u00eda breve" : "Short bio"}
          </h2>
          <CopyBioButton text={bio.short} label={copyLabel} copiedLabel={copiedLabel} />
        </div>
        <p className="text-ink/80 dark:text-ink-dark/80">{bio.short}</p>
      </section>

      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
            {locale === "es" ? "Biograf\u00eda media" : "Medium bio"}
          </h2>
          <CopyBioButton text={bio.medium} label={copyLabel} copiedLabel={copiedLabel} />
        </div>
        <p className="text-ink/80 dark:text-ink-dark/80">{bio.medium}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "Biograf\u00eda extendida" : "Extended bio"}
        </h2>
        <div className="mt-3 space-y-4 text-ink/80 dark:text-ink-dark/80">
          {bio.extended.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-brisa-200 bg-brisa-50/60 p-6 dark:border-brisa-800 dark:bg-brisa-900/20">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "Perspectiva de investigaci\u00f3n" : "Research perspective"}
        </h2>
        <p className="mt-2 text-sm text-ink/70 dark:text-ink-dark/70">
          {locale === "es"
            ? "Mi enfoque del espa\u00f1ol como lengua de herencia presta especial atenci\u00f3n a:"
            : "My approach to Spanish heritage-language research pays particular attention to:"}
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {perspective.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-ink/80 dark:text-ink-dark/80">
              <span aria-hidden="true" className="text-tierra-600">
                \u2013
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "Afiliaciones" : "Affiliations"}
        </h2>
        <ul className="mt-4 space-y-2">
          {affiliations.map((aff) => (
            <li key={aff.name} className="text-sm text-ink/80 dark:text-ink-dark/80">
              {aff.url ? (
                <a href={aff.url} className="underline underline-offset-4 hover:text-brisa-700 dark:hover:text-brisa-300">
                  {aff.name}
                </a>
              ) : (
                aff.name
              )}
              <span className="ml-2 text-xs uppercase tracking-wide text-ink/40 dark:text-ink-dark/40">
                {aff.type.replace(/-/g, " ")}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
