import type { Course } from "@/lib/types";

// SAMPLE CONTENT — replace with the candidate's actual teaching record.
export const courses: Course[] = [
  {
    slug: "intro-sociolinguistics-2025",
    title: "Introduction to Sociolinguistics",
    institution: "[University Name]",
    term: "Fall 2025",
    role: "instructor-of-record",
    description:
      "An undergraduate survey of language variation, language and identity, and language attitudes, with a unit on heritage and minoritized language varieties.",
    enrollment: 32,
    topics: ["Language variation", "Language and identity", "Language attitudes", "Field methods"],
    modality: "in-person",
    syllabusUrl: "#",
    language: "en",
  },
  {
    slug: "spanish-in-the-us-2024",
    title: "Spanish in the United States",
    institution: "[University Name]",
    term: "Spring 2024",
    role: "instructor-of-record",
    description:
      "Examines the history, structure, and social status of Spanish varieties spoken across the U.S., centering heritage speaker experiences.",
    enrollment: 24,
    topics: ["Heritage Spanish", "Contact linguistics", "Language policy"],
    modality: "in-person",
    syllabusUrl: "#",
    language: "en",
  },
  {
    slug: "research-methods-ta-2023",
    title: "Research Methods in Linguistics",
    institution: "[University Name]",
    term: "Fall 2023",
    role: "teaching-assistant",
    description:
      "Graduate-level introduction to qualitative and quantitative methods in linguistics, including sociolinguistic interview design.",
    topics: ["Interview methods", "Variationist analysis", "Research ethics"],
    modality: "hybrid",
    language: "en",
  },
  {
    slug: "raciolinguistics-designed-2026",
    title: "Raciolinguistics",
    institution: "[University Name]",
    term: "Spring 2026 (proposed)",
    role: "co-designer",
    description:
      "A newly designed upper-division seminar on the racialization of language, developed as part of the candidate's teaching portfolio.",
    topics: ["Raciolinguistic ideologies", "Language and race", "Case studies"],
    modality: "in-person",
    syllabusUrl: "#",
    language: "en",
  },
];
