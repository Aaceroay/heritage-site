import { getDictionary } from "@/lib/i18n";
import { siteConfig, profileLinks } from "@/content/site-config";
import type { Locale } from "@/lib/types";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const enabledLinks = profileLinks.filter((l) => l.enabled);

  return (
    <footer className="border-t border-ink/10 bg-paper py-10 dark:border-white/10 dark:bg-paper-dark">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-serif text-base font-semibold text-ink dark:text-ink-dark">{siteConfig.name[locale]}</p>
            <p className="mt-1 max-w-sm text-sm text-ink/70 dark:text-ink-dark/70">{siteConfig.title[locale]}</p>
            <p className="mt-1 text-sm text-ink/70 dark:text-ink-dark/70">{siteConfig.institution[locale]}</p>
          </div>

          <nav aria-label="Professional profiles">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {enabledLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-ink/80 underline decoration-ink/30 underline-offset-4 hover:text-brisa-700 hover:decoration-brisa-500 dark:text-ink-dark/80 dark:hover:text-brisa-300"
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-ink/50 dark:border-white/10 dark:text-ink-dark/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            \u00a9 {new Date().getFullYear()} {siteConfig.name[locale]}. {t.footer.rights}
          </p>
          <p>{t.footer.sampleContentNotice}</p>
        </div>
      </div>
    </footer>
  );
}
