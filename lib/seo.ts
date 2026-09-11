import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import type { Locale } from "./types";

interface PageSeoInput {
  locale: Locale;
  path: string; // e.g. "/research" (no locale prefix)
  title: string;
  description: string;
}

export function buildMetadata({ locale, path, title, description }: PageSeoInput): Metadata {
  const url = `${siteConfig.siteUrl}/${locale}${path}`;
  const altLocale: Locale = locale === "en" ? "es" : "en";

  return {
    title: `${title} \u2013 ${siteConfig.name[locale]}`,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.siteUrl}/en${path}`,
        es: `${siteConfig.siteUrl}/es${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name[locale],
      locale: locale === "en" ? "en_US" : "es_ES",
      alternateLocale: altLocale === "en" ? "en_US" : "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name[locale],
    jobTitle: siteConfig.title[locale],
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.institution[locale],
    },
    email: `mailto:${siteConfig.email}`,
    url: `${siteConfig.siteUrl}/${locale}`,
    sameAs: [siteConfig.orcid],
    knowsAbout: [siteConfig.specialization[locale]],
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name[locale],
    url: `${siteConfig.siteUrl}/${locale}`,
    inLanguage: locale,
  };
}

export function scholarlyArticleJsonLd(
  locale: Locale,
  pub: { title: string; authors: string[]; year: number; doi?: string; abstract: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub.title,
    author: pub.authors.map((name) => ({ "@type": "Person", name })),
    datePublished: String(pub.year),
    ...(pub.doi ? { sameAs: `https://doi.org/${pub.doi}` } : {}),
    abstract: pub.abstract,
    inLanguage: locale,
  };
}
