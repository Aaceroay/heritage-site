export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className="max-w-prose">
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-tierra-600 dark:text-tierra-300">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="font-serif text-2xl font-semibold text-ink dark:text-ink-dark sm:text-3xl">{title}</Tag>
      {description ? <p className="mt-3 text-base text-ink/70 dark:text-ink-dark/70">{description}</p> : null}
    </div>
  );
}
