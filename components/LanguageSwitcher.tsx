"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/types";

function localizePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && (segments[1] === "en" || segments[1] === "es")) {
    segments[1] = targetLocale;
    return segments.join("/") || "/";
  }
  return `/${targetLocale}${pathname}`;
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const other: Locale = locale === "en" ? "es" : "en";

  return (
    <Link
      href={localizePath(pathname, other)}
      hrefLang={other}
      lang={other}
      className="rounded-md border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brisa-600 dark:border-white/15 dark:text-ink-dark dark:hover:bg-white/10"
      aria-label={other === "es" ? "Cambiar a español" : "Switch to English"}
    >
      {other === "es" ? "ES" : "EN"}
    </Link>
  );
}
