import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { siteConfig } from "@/content/site-config";
import type { Locale } from "@/lib/types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { ButtonLink } from "./Button";

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const p = (path: string) => `/${locale}${path}`;

  const navItems = [
    { href: p("/about"), label: t.nav.about },
    { href: p("/research"), label: t.nav.research },
    { href: p("/dissertation"), label: t.nav.dissertation },
    { href: p("/publications"), label: t.nav.publications },
    { href: p("/teaching"), label: t.nav.teaching },
    { href: p("/talks"), label: t.nav.talks },
    { href: p("/community"), label: t.nav.community },
    { href: p("/news"), label: t.nav.news },
    { href: p("/cv"), label: t.nav.cv },
    { href: p("/contact"), label: t.nav.contact },
  ];

  return (
    <header className="relative border-b border-ink/10 bg-paper/95 backdrop-blur dark:border-white/10 dark:bg-paper-dark/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href={p("/")}
          className="font-serif text-lg font-semibold text-ink hover:text-brisa-700 dark:text-ink-dark dark:hover:text-brisa-300"
        >
          {siteConfig.name[locale]}
        </Link>

        <nav aria-label={t.nav.menu} className="hidden md:block">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink/80 hover:text-brisa-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brisa-600 dark:text-ink-dark/80 dark:hover:text-brisa-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/cv-placeholder.pdf" variant="accent" className="hidden sm:inline-flex">
            {t.nav.downloadCv}
          </ButtonLink>
          <LanguageSwitcher locale={locale} />
          <MobileNav items={navItems} menuLabel={t.nav.menu} closeLabel={t.nav.closeMenu} />
        </div>
      </div>
    </header>
  );
}
