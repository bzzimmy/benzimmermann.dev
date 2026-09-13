"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
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
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();
  const items = ["", ...options];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const show = () => {
    setActive(Math.max(0, items.indexOf(value)));
    setOpen(true);
  };

  const pick = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => (i + 1) % items.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => (i - 1 + items.length) % items.length);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(items.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        pick(items[active]);
        break;
      case "Escape":
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={root} className="relative flex items-center gap-2 text-sm">
      <span className="text-foreground/40">{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        className="inline-flex items-center gap-1 rounded-md text-foreground outline-none transition-colors hover:text-foreground/70 focus-visible:ring-2 focus-visible:ring-foreground/30"
      >
        {value || all}
        <FiChevronDown
          size={14}
          className={`text-foreground/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 z-10 mt-2 min-w-[10rem] origin-top-left overflow-hidden rounded-lg border border-foreground/10 bg-background p-1 shadow-lg shadow-black/5"
          >
            {items.map((o, i) => {
              const selected = o === value;
              return (
                <li
                  key={o}
                  role="option"
                  aria-selected={selected}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => pick(o)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-md px-2.5 py-1.5 whitespace-nowrap transition-colors ${
                    i === active ? "bg-foreground/[0.06] text-foreground" : "text-foreground/60"
                  }`}
                >
                  {o || all}
                  {selected && <FiCheck size={14} className="text-foreground/50" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
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
