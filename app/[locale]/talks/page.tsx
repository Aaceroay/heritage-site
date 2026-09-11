import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/types";
import { notFound } from "next/navigation";
import { talks } from "@/content/talks";
import { SectionHeading } from "@/components/SectionHeading";
import { TalkCard } from "@/components/TalkCard";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  return buildMetadata({
    locale,
    path: "/talks",
    title: locale === "es" ? "Ponencias y Conferencias" : "Talks & Conferences",
    description:
      locale === "es" ? "Charlas invitadas, ponencias, p\u00f3steres y conferencias." : "Invited talks, conference presentations, posters, and lectures.",
  });
}

export default function TalksPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  const now = new Date();
  const upcoming = talks.filter((t) => new Date(t.date) > now).sort((a, b) => a.date.localeCompare(b.date));
  const past = talks.filter((t) => new Date(t.date) <= now).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionHeading
        as="h1"
        eyebrow={locale === "es" ? "Ponencias" : "Talks"}
        title={locale === "es" ? "Ponencias y Conferencias" : "Talks & Conferences"}
      />

      {upcoming.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
            {locale === "es" ? "Pr\u00f3ximas" : "Upcoming"}
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {upcoming.map((talk) => (
              <li key={talk.slug}>
                <TalkCard talk={talk} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">
          {locale === "es" ? "Anteriores" : "Past"}
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {past.map((talk) => (
            <li key={talk.slug}>
              <TalkCard talk={talk} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
