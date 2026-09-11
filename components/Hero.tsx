import { siteConfig } from "@/content/site-config";
import type { Locale } from "@/lib/types";
import { ButtonLink } from "./Button";
import { getDictionary } from "@/lib/i18n";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const p = (path: string) => `/${locale}${path}`;

  const positioning =
    locale === "en"
      ? "I study how Spanish heritage speakers in the United States navigate language variation, identity, and belonging across educational and community settings \u2014 and how research can be accountable to the communities it studies."
      : "Estudio c\u00f3mo las personas hablantes de espa\u00f1ol como lengua de herencia en Estados Unidos navegan la variaci\u00f3n ling\u00fc\u00edstica, la identidad y la pertenencia en contextos educativos y comunitarios, y c\u00f3mo la investigaci\u00f3n puede rendir cuentas a las comunidades que estudia.";

  return (
    <section className="border-b border-ink/10 bg-gradient-to-b from-brisa-50 to-paper dark:border-white/10 dark:from-brisa-900/30 dark:to-paper-dark">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.3fr_1fr] md:items-center md:py-24">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-tierra-600 dark:text-tierra-300">
            {siteConfig.jobMarketStatus[locale]}
          </p>
          <h1 className="font-serif text-3xl font-bold leading-tight text-ink dark:text-ink-dark sm:text-4xl md:text-5xl">
            {siteConfig.name[locale]}
          </h1>
          <p className="mt-3 text-lg font-medium text-brisa-700 dark:text-brisa-300">{siteConfig.title[locale]}</p>
          <p className="mt-2 text-base text-ink/70 dark:text-ink-dark/70">{siteConfig.institution[locale]}</p>
          <p className="mt-6 max-w-prose text-lg text-ink/80 dark:text-ink-dark/80">{positioning}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/cv-placeholder.pdf" variant="accent">
              {t.nav.downloadCv}
            </ButtonLink>
            <ButtonLink href={p("/research")} variant="primary">
              {t.home.viewResearch}
            </ButtonLink>
            <ButtonLink href={p("/contact")} variant="secondary">
              {t.home.contactMe}
            </ButtonLink>
          </div>
        </div>

        <div className="mx-auto aspect-square w-48 overflow-hidden rounded-2xl border border-ink/10 bg-brisa-100 shadow-sm dark:border-white/10 dark:bg-brisa-900 sm:w-64 md:ml-auto md:mr-0">
          {/* Optional portrait \u2014 replace src with a real headshot. Site functions fully without one. */}
          <div className="flex h-full w-full items-center justify-center text-sm text-brisa-700 dark:text-brisa-200">
            [Portrait placeholder]
          </div>
        </div>
      </div>
    </section>
  );
}
