import type { Metadata } from "next";
import { isLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { notFound } from "next/navigation";
import { siteConfig, profileLinks } from "@/content/site-config";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  return buildMetadata({
    locale,
    path: "/contact",
    title: locale === "es" ? "Contacto" : "Contact",
    description: locale === "es" ? "Colaboraci\u00f3n en investigaci\u00f3n, medios y consultas." : "Research collaboration, media, and general inquiries.",
  });
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);
  const enabledLinks = profileLinks.filter((l) => l.enabled);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionHeading as="h1" title={t.contact.heading} description={t.contact.intro} />

      <div className="mt-10 grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <ContactForm labels={t.contact} />

        <aside className="space-y-6">
          <div>
            <h2 className="font-serif text-base font-semibold text-ink dark:text-ink-dark">
              {locale === "es" ? "Correo electr\u00f3nico" : "Email"}
            </h2>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-1 inline-block text-sm text-brisa-700 underline underline-offset-4 hover:text-brisa-900 dark:text-brisa-300"
            >
              {siteConfig.email}
            </a>
          </div>

          <div>
            <h2 className="font-serif text-base font-semibold text-ink dark:text-ink-dark">
              {locale === "es" ? "Afiliaci\u00f3n institucional" : "Institutional affiliation"}
            </h2>
            <p className="mt-1 text-sm text-ink/80 dark:text-ink-dark/80">{siteConfig.institution[locale]}</p>
            <p className="text-sm text-ink/60 dark:text-ink-dark/60">{siteConfig.region[locale]}</p>
          </div>

          <div>
            <h2 className="font-serif text-base font-semibold text-ink dark:text-ink-dark">
              {locale === "es" ? "Consultas de prensa o conferencias" : "Speaking or media inquiries"}
            </h2>
            <p className="mt-1 text-sm text-ink/80 dark:text-ink-dark/80">
              {locale === "es"
                ? "Indique el formato, la fecha y el p\u00fablico previsto en el asunto de su mensaje."
                : "Please note the format, date, and intended audience in your message subject."}
            </p>
          </div>

          <div>
            <h2 className="font-serif text-base font-semibold text-ink dark:text-ink-dark">
              {locale === "es" ? "Perfiles profesionales" : "Professional profiles"}
            </h2>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {enabledLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-brisa-700 underline underline-offset-4 hover:text-brisa-900 dark:text-brisa-300"
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
