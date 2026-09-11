import type { NewsItem } from "@/lib/types";

// SAMPLE CONTENT — replace with the candidate's actual news/media record.
export const newsItems: NewsItem[] = [
  {
    slug: "fellowship-announcement-2026",
    title: "Awarded a [Fellowship Name] for dissertation research",
    date: "2026-01-15",
    format: "press-release",
    description: "Sample milestone: a competitive fellowship supporting the final year of dissertation writing.",
    url: "#",
    language: "en",
    category: "news",
  },
  {
    slug: "podcast-interview-2025",
    title: "Interview on heritage bilingualism and family language policy",
    date: "2025-09-22",
    outlet: "[Podcast Name]",
    format: "podcast",
    description: "Sample media appearance discussing research on family language practices with a general audience.",
    url: "#",
    language: "en",
    relatedThemeSlug: "heritage-spanish-us",
    category: "media",
  },
  {
    slug: "newspaper-feature-2025",
    title: "Local researcher studies how bilingual families pass down Spanish",
    date: "2025-05-03",
    outlet: "[Local Newspaper]",
    format: "newspaper-article",
    description: "Sample press coverage of the candidate's community-engaged research project.",
    url: "#",
    language: "en",
    category: "media",
  },
  {
    slug: "conference-presentation-news-2026",
    title: "Presented invited talk at AAAL 2026",
    date: "2026-03-14",
    format: "explainer",
    description: "Sample milestone announcing an invited conference talk.",
    url: "#",
    language: "en",
    category: "news",
  },
];
