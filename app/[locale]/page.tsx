import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { isLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { siteConfig } from "@/content/site-config";
import { researchAreas } from "@/content/research-areas";
import { publications } from "@/content/publications";
import { courses } from "@/content/courses";
import { newsItems } from "@/content/news";
import { dissertation } from "@/content/bio";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { PublicationCard } from "@/components/PublicationCard";
import { CourseCard } from "@/components/CourseCard";
import { NewsCard } from "@/components/NewsCard";
import { Tag } from "@/components/Tag";
import { ButtonLink } from "@/components/Button";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  return buildMetadata({
    locale,
    path: "/",
    title: siteConfig.title[locale],
    description: siteConfig.specialization[locale],
  });
}

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);
  const p = (path: string) => `/${locale}${path}`;

  const selectedPubs = publications.filter((pub) => pub.selected && pub.language === locale).slice(0, 4);
  const englishOnlyFallback = selectedPubs.length > 0 ? selectedPubs : publications.filter((pub) => pub.selected).slice(0, 4);
  const snapshotCourses = courses.slice(0, 3);
  const latestNews = newsItems.slice(0, 3);
  const diss = dissertation.en; // dissertation content currently authored in English only

  return (
    <>
      <Hero locale={locale} />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeading title={t.home.researchSnapshot} as="h2" />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {researchAreas.slice(0, 6).map((area) => (
            <li key={area.slug}>
              <Link
                href={p(`/research#${area.slug}`)}
                className="block h-full rounded-lg border border-ink/10 bg-white/60 p-4 shadow-sm transition-colors hover:border-brisa-400 dark:border-white/10 dark:bg-white/5"
              >
                <p className="font-medium text-ink dark:text-ink-dark">{area.title}</p>
                <p className="mt-1 text-sm text-ink/60 dark:text-ink-dark/60">{area.shortDescription}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-ink/10 bg-brisa-50/50 py-14 dark:border-white/10 dark:bg-brisa-900/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading title={t.home.currentStatus} as="h2" />
          <dl className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <dt className="text-sm font-medium text-ink/60 dark:text-ink-dark/60">{t.home.dissertationStage}</dt>
              <dd className="mt-1 text-base font-medium text-ink dark:text-ink-dark">{diss.stage}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-ink/60 dark:text-ink-dark/60">{t.home.expectedCompletion}</dt>
              <dd className="mt-1 text-base font-medium text-ink dark:text-ink-dark">{diss.expectedCompletion}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-ink/60 dark:text-ink-dark/60">{t.home.institution}</dt>
              <dd className="mt-1 text-base font-medium text-ink dark:text-ink-dark">{diss.institution}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-ink/60 dark:text-ink-dark/60">{t.home.jobMarketStatus}</dt>
              <dd className="mt-1 text-base font-medium text-ink dark:text-ink-dark">{siteConfig.jobMarketStatus[locale]}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title={t.home.selectedPublications} as="h2" />
          <ButtonLink href={p("/publications")} variant="secondary">
            {t.home.viewAllPublications}
          </ButtonLink>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {englishOnlyFallback.map((pub) => (
            <li key={pub.slug}>
              <PublicationCard pub={pub} abstractLabel={t.publications.abstract} doiLabel={t.publications.doi} />
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-ink/10 py-14 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title={t.home.teachingSnapshot} as="h2" />
            <ButtonLink href={p("/teaching")} variant="secondary">
              {t.home.viewTeaching}
            </ButtonLink>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {snapshotCourses.map((course) => (
              <li key={course.slug}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-tierra-50/40 py-14 dark:border-white/10 dark:bg-tierra-900/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading title={t.home.featuredWork} as="h2" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-lg border border-ink/10 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <Tag tone="tierra">Dissertation</Tag>
              <h3 className="mt-2 font-serif text-lg font-semibold text-ink dark:text-ink-dark">{diss.title}</h3>
              <p className="mt-2 text-sm text-ink/80 dark:text-ink-dark/80">{diss.abstract}</p>
              <Link
                href={p("/dissertation")}
                className="mt-3 inline-block text-sm font-medium text-brisa-700 underline underline-offset-4 dark:text-brisa-300"
              >
                {locale === "es" ? "Ver la tesis" : "View dissertation"}
              </Link>
            </article>
            <article className="rounded-lg border border-ink/10 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <Tag tone="brisa">Community project</Tag>
              <h3 className="mt-2 font-serif text-lg font-semibold text-ink dark:text-ink-dark">
                Comunidad Hablando: a bilingual family language archive
              </h3>
              <p className="mt-2 text-sm text-ink/80 dark:text-ink-dark/80">
                A collaborative archive of recorded family conversations, co-designed with community partners.
              </p>
              <Link
                href={p("/community")}
                className="mt-3 inline-block text-sm font-medium text-brisa-700 underline underline-offset-4 dark:text-brisa-300"
              >
                {locale === "es" ? "Ver vinculaci\u00f3n comunitaria" : "View community engagement"}
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeading title={t.home.latestNews} as="h2" />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {latestNews.map((item) => (
            <li key={item.slug}>
              <NewsCard item={item} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
