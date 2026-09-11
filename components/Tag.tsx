export function Tag({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brisa" | "tierra";
}) {
  const tones = {
    neutral: "bg-ink/5 text-ink dark:bg-white/10 dark:text-ink-dark",
    brisa: "bg-brisa-50 text-brisa-700 dark:bg-brisa-900 dark:text-brisa-100",
    tierra: "bg-tierra-50 text-tierra-700 dark:bg-tierra-900 dark:text-tierra-100",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>
  );
}
