import "server-only";
import type { Locale } from "./types";
import en from "@/content/i18n/dictionaries/en.json";
import es from "@/content/i18n/dictionaries/es.json";

const dictionaries = { en, es };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries.en;
}

export const locales: Locale[] = ["en", "es"];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Swap the locale segment of a pathname, preserving the rest of the path.
 * e.g. ("/en/research", "es") -> "/es/research"
 */
export function localizePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && isLocale(segments[1] ?? "")) {
    segments[1] = targetLocale;
    return segments.join("/") || "/";
  }
  return `/${targetLocale}${pathname}`;
}
