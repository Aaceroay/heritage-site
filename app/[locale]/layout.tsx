import type { Metadata } from "next";
import { getDictionary, locales } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { siteConfig } from "@/content/site-config";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SkipToContent } from "@/components/SkipToContent";
import { JsonLd } from "@/components/JsonLd";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  return {
    title: {
      default: `${siteConfig.name[locale]} \u2013 ${siteConfig.title[locale]}`,
      template: `%s \u2013 ${siteConfig.name[locale]}`,
    },
    description: siteConfig.specialization[locale],
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  return (
    <html lang={locale}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <SkipToContent label={t.nav.skipToContent} />
        <JsonLd data={personJsonLd(locale)} />
        <JsonLd data={websiteJsonLd(locale)} />
        <Header locale={locale} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
