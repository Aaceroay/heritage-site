"use client";

import { useMemo, useState } from "react";
import type { Publication } from "@/lib/types";
import { PublicationCard } from "./PublicationCard";

interface Labels {
  filterByYear: string;
  filterByType: string;
  filterByTheme: string;
  peerReviewedOnly: string;
  openAccessOnly: string;
  singleAuthored: string;
  coAuthored: string;
  all: string;
  abstract: string;
  doi: string;
  noResults: string;
}

export function PublicationsFilter({
  publications,
  themeOptions,
  labels,
}: {
  publications: Publication[];
  themeOptions: { slug: string; title: string }[];
  labels: Labels;
}) {
  const [year, setYear] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [theme, setTheme] = useState<string>("all");
  const [peerReviewedOnly, setPeerReviewedOnly] = useState(false);
  const [openAccessOnly, setOpenAccessOnly] = useState(false);
  const [authorship, setAuthorship] = useState<"all" | "single" | "co">("all");

  const years = useMemo(
    () => Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a),
    [publications]
  );
  const types = useMemo(() => Array.from(new Set(publications.map((p) => p.type))), [publications]);

  const filtered = publications.filter((p) => {
    if (year !== "all" && String(p.year) !== year) return false;
    if (type !== "all" && p.type !== type) return false;
    if (theme !== "all" && !p.themes.includes(theme)) return false;
    if (peerReviewedOnly && !p.peerReviewed) return false;
    if (openAccessOnly && !p.openAccess) return false;
    if (authorship === "single" && p.authors.length > 1) return false;
    if (authorship === "co" && p.authors.length <= 1) return false;
    return true;
  });

  const selectClass =
    "rounded-md border border-ink/20 bg-white px-2.5 py-1.5 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brisa-600 dark:border-white/20 dark:bg-white/5 dark:text-ink-dark";
  const checkboxLabelClass = "flex items-center gap-2 text-sm text-ink dark:text-ink-dark";

  return (
    <div>
      <fieldset className="mb-8 flex flex-wrap items-end gap-4 rounded-lg border border-ink/10 p-4 dark:border-white/10">
        <legend className="sr-only">Filter publications</legend>

        <label className="flex flex-col gap-1 text-sm font-medium text-ink dark:text-ink-dark">
          {labels.filterByYear}
          <select className={selectClass} value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="all">{labels.all}</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-ink dark:text-ink-dark">
          {labels.filterByType}
          <select className={selectClass} value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">{labels.all}</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t.replace(/-/g, " ")}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-ink dark:text-ink-dark">
          {labels.filterByTheme}
          <select className={selectClass} value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="all">{labels.all}</option>
            {themeOptions.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-ink dark:text-ink-dark">
          Authorship
          <select
            className={selectClass}
            value={authorship}
            onChange={(e) => setAuthorship(e.target.value as "all" | "single" | "co")}
          >
            <option value="all">{labels.all}</option>
            <option value="single">{labels.singleAuthored}</option>
            <option value="co">{labels.coAuthored}</option>
          </select>
        </label>

        <label className={checkboxLabelClass}>
          <input type="checkbox" checked={peerReviewedOnly} onChange={(e) => setPeerReviewedOnly(e.target.checked)} />
          {labels.peerReviewedOnly}
        </label>

        <label className={checkboxLabelClass}>
          <input type="checkbox" checked={openAccessOnly} onChange={(e) => setOpenAccessOnly(e.target.checked)} />
          {labels.openAccessOnly}
        </label>
      </fieldset>

      <div role="status" aria-live="polite" className="mb-4 text-sm text-ink/60 dark:text-ink-dark/60">
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink/70 dark:text-ink-dark/70">{labels.noResults}</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((pub) => (
            <li key={pub.slug}>
              <PublicationCard pub={pub} abstractLabel={labels.abstract} doiLabel={labels.doi} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
