import type { Metadata } from "next";
import { isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { notFound } from "next/navigation";
import { publications } from "@/content/publications";
import { researchAreas } from "@/content/research-areas";
import { SectionHeading } from "@/components/SectionHeading";
import { PublicationsFilter } from "@/components/PublicationsFilter";
import { JsonLd } from "@/components/JsonLd";
import { scholarlyArticleJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  return buildMetadata({
    locale,
    path: "/publications",
    title: locale === "es" ? "Publicaciones" : "Publications",
    description:
      locale === "es"
        ? "Base de datos filtrable de publicaciones acad\u00e9micas y de divulgaci\u00f3n."
        : "A searchable, filterable database of scholarly and public-facing publications.",
  });
}

export default function PublicationsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  const themeOptions = researchAreas.map((a) => ({ slug: a.slug, title: a.title }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      {publications
        .filter((pub) => pub.status === "published")
        .slice(0, 5)
        .map((pub) => (
          <JsonLd key={pub.slug} data={scholarlyArticleJsonLd(locale, pub)} />
        ))}

      <SectionHeading
        as="h1"
        eyebrow={locale === "es" ? "Publicaciones" : "Publications"}
        title={locale === "es" ? "Publicaciones" : "Publications"}
        description={
          locale === "es"
            ? "Filtra por a\u00f1o, tipo, tema, autor\u00eda, revisi\u00f3n por pares o acceso abierto. Los manuscritos en revisi\u00f3n no se presentan como aceptados o publicados."
            : "Filter by year, type, theme, authorship, peer-review status, or open access. Manuscripts under review are never represented as accepted or published."
        }
      />

      <div className="mt-8">
        <PublicationsFilter publications={publications} themeOptions={themeOptions} labels={t.publications} />
      </div>
    </div>
  );
}
