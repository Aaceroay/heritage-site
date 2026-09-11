import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { notFound } from "next/navigation";
import { newsItems } from "@/content/news";
import { SectionHeading } from "@/components/SectionHeading";
import { NewsCard } from "@/components/NewsCard";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  return buildMetadata({
    locale,
    path: "/news",
    title: locale === "es" ? "Noticias y Medios" : "News & Media",
    description: locale === "es" ? "Entrevistas, art\u00edculos de prensa y actualizaciones acad\u00e9micas." : "Interviews, press coverage, and academic milestones.",
  });
}

export default function NewsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  const sorted = [...newsItems].sort((a, b) => b.date.localeCompare(a.date));
  const media = sorted.filter((n) => n.category === "media");
  const news = sorted.filter((n) => n.category === "news");

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionHeading
        as="h1"
        eyebrow={locale === "es" ? "Noticias y medios" : "News & media"}
        title={locale === "es" ? "Noticias y Medios" : "News & Media"}
      />

      <section className="mt-10">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "Cobertura medi\u00e1tica" : "Press & media coverage"}
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {media.map((item) => (
            <li key={item.slug}>
              <NewsCard item={item} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "Actualizaciones acad\u00e9micas" : "Academic milestones"}
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {news.map((item) => (
            <li key={item.slug}>
              <NewsCard item={item} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
