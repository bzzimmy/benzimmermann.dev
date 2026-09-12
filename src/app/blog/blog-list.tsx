"use client";

import Link from "next/link";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import type { PostMeta } from "@/lib/blog";

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function Filter({
  label,
  value,
  options,
  all,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  all: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-foreground/40">{label}</span>
      <span className="relative inline-flex items-center">
        <span className="invisible pr-5 whitespace-nowrap">{value || all}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full min-w-0 appearance-none bg-transparent pr-5 text-foreground outline-none"
        >
          <option value="">{all}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <FiChevronDown
          size={14}
          className="pointer-events-none absolute right-0 text-foreground/40"
        />
      </span>
    </label>
  );
}

export function BlogList({ posts }: { posts: PostMeta[] }) {
  const [tag, setTag] = useState("");
  const [year, setYear] = useState("");

  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const tags = [...new Set(sorted.flatMap((p) => p.tags))].sort();
  const allYears = [...new Set(sorted.map((p) => p.date.slice(0, 4)))];

  const filtered = sorted.filter(
    (p) =>
      (!tag || p.tags.includes(tag)) && (!year || p.date.startsWith(year)),
  );
  const years = [...new Set(filtered.map((p) => p.date.slice(0, 4)))];

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        <Filter label="Tag" value={tag} options={tags} all="All tags" onChange={setTag} />
        <Filter label="Year" value={year} options={allYears} all="All years" onChange={setYear} />
      </div>

      {years.length === 0 && (
        <p className="mt-10 text-sm text-foreground/40">Nothing here.</p>
      )}

      {years.map((y) => (
        <section key={y} className="mt-10">
          <h2 className="text-xs font-medium tracking-wide text-foreground/40">{y}</h2>
          <ul className="mt-2 divide-y divide-foreground/10">
            {filtered
              .filter((p) => p.date.startsWith(y))
              .map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col gap-1.5 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <div className="min-w-0">
                      <h3 className="text-[16px] leading-snug text-foreground transition-colors group-hover:text-foreground/70">
                        {p.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-x-2.5 text-xs text-foreground/40">
                        {p.tags.map((t) => (
                          <span key={t}>#{t}</span>
                        ))}
                      </div>
                    </div>
                    <time
                      dateTime={p.date}
                      className="shrink-0 text-sm text-foreground/40 sm:text-right"
                    >
                      {fmt.format(new Date(p.date))}
                    </time>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </>
  );
}
