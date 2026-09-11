import type { Affiliation, ProfileLink } from "@/lib/types";

/**
 * SITE-WIDE CONFIGURATION
 * -----------------------
 * Edit the values below to update the candidate's identity across the
 * entire site: metadata, JSON-LD structured data, header/footer links,
 * and the contact page. Nothing else in the codebase should need to
 * change when these values change.
 *
 * All fields marked "PLACEHOLDER" must be replaced with real information
 * before the site goes live. Do not invent institutions, dates, or
 * credentials — leave a placeholder rather than guessing.
 */

export const siteConfig = {
  siteUrl: "https://example-scholar.edu", // PLACEHOLDER: production domain

  name: {
    en: "[FULL NAME]", // PLACEHOLDER
    es: "[NOMBRE COMPLETO]", // PLACEHOLDER
  },

  title: {
    en: "ABD PhD Candidate in Applied Linguistics",
    es: "Candidata/o doctoral (ABD) en Lingüística Aplicada",
  },

  specialization: {
    en: "Sociolinguistics of Spanish as a heritage language in the United States",
    es: "Sociolingüística del español como lengua de herencia en Estados Unidos",
  },

  institution: {
    en: "[Department of Linguistics, University Name]", // PLACEHOLDER
    es: "[Departamento de Lingüística, Nombre de la Universidad]", // PLACEHOLDER
  },

  region: {
    en: "United States", // PLACEHOLDER — general region only, no home address
    es: "Estados Unidos",
  },

  email: "scholar@example.edu", // PLACEHOLDER

  orcid: "https://orcid.org/0000-0000-0000-0000", // PLACEHOLDER

  jobMarketStatus: {
    en: "On the 2026–2027 academic job market",
    es: "En el mercado laboral académico 2026–2027",
  },

  defaultLocale: "en" as const,
  locales: ["en", "es"] as const,
};

export const profileLinks: ProfileLink[] = [
  { label: "ORCID", href: siteConfig.orcid, enabled: true },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=PLACEHOLDER", enabled: true },
  { label: "Institutional profile", href: "https://example.edu/people/placeholder", enabled: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/placeholder", enabled: true },
  { label: "ResearchGate", href: "https://www.researchgate.net/profile/placeholder", enabled: false },
  { label: "Academia.edu", href: "https://independent.academia.edu/placeholder", enabled: false },
  { label: "Bluesky", href: "https://bsky.app/profile/placeholder.bsky.social", enabled: true },
  { label: "GitHub", href: "https://github.com/placeholder", enabled: false },
  { label: "OSF", href: "https://osf.io/placeholder", enabled: true },
  { label: "Email", href: `mailto:${siteConfig.email}`, enabled: true },
];

export const affiliations: Affiliation[] = [
  {
    name: "[Sociolinguistics Research Group, University Name]", // PLACEHOLDER
    type: "research-group",
  },
  {
    name: "American Association for Applied Linguistics (AAAL)",
    type: "professional-association",
    url: "https://www.aaal.org/",
  },
  {
    name: "American Association of Teachers of Spanish and Portuguese (AATSP)",
    type: "professional-association",
    url: "https://www.aatsp.org/",
  },
  {
    name: "[Center for Heritage Languages, University Name]", // PLACEHOLDER
    type: "academic-center",
  },
  {
    name: "[Local Spanish Heritage-Language Community Initiative]", // PLACEHOLDER
    type: "community-organization",
  },
];
