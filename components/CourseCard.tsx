import type { Course } from "@/lib/types";
import { Tag } from "./Tag";

const roleLabels: Record<Course["role"], string> = {
  "instructor-of-record": "Instructor of record",
  "teaching-assistant": "Teaching assistant",
  "co-designer": "Course co-designer",
  "guest-lecturer": "Guest lecturer",
};

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="rounded-lg border border-ink/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-2 flex flex-wrap gap-2">
        <Tag tone="brisa">{roleLabels[course.role]}</Tag>
        <Tag>{course.term}</Tag>
        <Tag>{course.modality}</Tag>
      </div>
      <h3 className="font-serif text-lg font-semibold text-ink dark:text-ink-dark">{course.title}</h3>
      <p className="mt-1 text-sm text-ink/70 dark:text-ink-dark/70">{course.institution}</p>
      <p className="mt-3 text-sm text-ink/80 dark:text-ink-dark/80">{course.description}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Topics covered">
        {course.topics.map((topic) => (
          <li key={topic}>
            <Tag>{topic}</Tag>
          </li>
        ))}
      </ul>
      {course.syllabusUrl ? (
        <a
          href={course.syllabusUrl}
          className="mt-4 inline-block text-sm font-medium text-brisa-700 underline underline-offset-4 hover:text-brisa-900 dark:text-brisa-300"
        >
          Syllabus
        </a>
      ) : null}
    </article>
  );
}
