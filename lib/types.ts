export type Locale = "en" | "es";

export type PublicationType =
  | "journal-article"
  | "book-chapter"
  | "edited-volume"
  | "encyclopedia-entry"
  | "review"
  | "dissertation-chapter"
  | "working-paper"
  | "manuscript-under-review"
  | "manuscript-in-preparation"
  | "public-scholarship"
  | "policy-brief";

export type PublicationStatus =
  | "published"
  | "forthcoming"
  | "under-review"
  | "in-preparation";

export interface Publication {
  slug: string;
  title: string;
  authors: string[]; // full author list in citation order; candidate's name included
  year: number;
  type: PublicationType;
  status: PublicationStatus;
  venue?: string; // journal / book / volume title
  abstract: string;
  keywords: string[];
  themes: string[]; // links to ResearchArea.slug
  doi?: string;
  links?: {
    publisher?: string;
    pdf?: string;
    repository?: string;
  };
  bibtex?: string;
  peerReviewed: boolean;
  openAccess: boolean;
  language: Locale;
  featured?: boolean;
  selected?: boolean; // include in "Selected publications" for search committees
}

export type CourseRole = "instructor-of-record" | "teaching-assistant" | "co-designer" | "guest-lecturer";

export interface Course {
  slug: string;
  title: string;
  institution: string;
  term: string; // e.g. "Fall 2025"
  role: CourseRole;
  description: string;
  enrollment?: number;
  topics: string[];
  modality: "in-person" | "online" | "hybrid";
  syllabusUrl?: string;
  language: Locale;
}

export type TalkType =
  | "invited-talk"
  | "conference-presentation"
  | "poster"
  | "workshop"
  | "guest-lecture"
  | "panel"
  | "department-talk"
  | "public-lecture";

export interface Talk {
  slug: string;
  title: string;
  event: string;
  organization: string;
  location: string; // city, or "Online"
  date: string; // ISO date
  type: TalkType;
  abstract?: string;
  slidesUrl?: string;
  handoutUrl?: string;
  recordingUrl?: string;
  relatedPublicationSlug?: string;
  language: Locale;
}

export type MediaFormat =
  | "interview"
  | "newspaper-article"
  | "podcast"
  | "radio"
  | "press-release"
  | "blog-post"
  | "explainer"
  | "video"
  | "newsletter";

export interface NewsItem {
  slug: string;
  title: string;
  date: string; // ISO date
  outlet?: string;
  format: MediaFormat;
  description: string;
  url: string;
  language: Locale;
  relatedThemeSlug?: string;
  category: "news" | "media"; // internal milestone vs. external press
}

export interface ResearchArea {
  slug: string;
  title: string;
  shortDescription: string;
  keyQuestions: string[];
  relatedPublicationSlugs: string[];
  relatedTalkSlugs: string[];
  relatedProjectSlugs: string[];
  imageAlt?: string;
}

export interface CommunityProject {
  slug: string;
  title: string;
  partner: string;
  description: string;
  role: string;
  outputs: string[]; // e.g. "Community report (Spanish)", "Bilingual workshop series"
  year: string;
}

export interface Affiliation {
  name: string;
  type: "research-group" | "professional-association" | "academic-center" | "community-organization" | "initiative";
  url?: string;
}

export interface ProfileLink {
  label: string;
  href: string;
  enabled: boolean;
}
