"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiChevronDown } from "react-icons/fi";
import type { Disclosure } from "@/lib/work";

function Reference({ link, linkText }: Pick<Disclosure, "link" | "linkText">) {
  if (!link || !linkText) return null;
  const cls =
    "text-foreground/60 underline decoration-foreground/30 underline-offset-[5px] transition-colors hover:text-foreground hover:decoration-foreground";
  if (link.startsWith("/")) {
    return (
      <Link href={link} className={cls}>
        {linkText}
      </Link>
    );
  }
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={cls}>
      {linkText}
    </a>
  );
}

function Dot() {
  return (
    <span className="text-foreground/20" aria-hidden="true">
      •
    </span>
  );
}

function Item({ item }: { item: Disclosure }) {
  return (
    <li className="py-5">
      <h3 className="text-[17px] leading-snug">{item.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-foreground/60">
        {item.description}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-foreground/40">
        <span>{item.date}</span>
        <Dot />
        <span>{item.company}</span>
        <Dot />
        <span className="tabular-nums">{item.outcome}</span>
        {item.link && item.linkText && (
          <>
            <Dot />
            <Reference link={item.link} linkText={item.linkText} />
          </>
        )}
      </div>
    </li>
  );
}

const SHOWN = 3;

export function WorkList({ items }: { items: Disclosure[] }) {
  const [open, setOpen] = useState(false);
  const featured = items.slice(0, SHOWN);
  const more = items.slice(SHOWN);

  return (
    <>
      <ul className="mt-8 divide-y divide-foreground/10">
        {featured.map((item) => (
          <Item key={`${item.company}-${item.title}`} item={item} />
        ))}
      </ul>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="more"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="divide-y divide-foreground/10 border-t border-foreground/10">
              {more.map((item) => (
                <Item key={`${item.company}-${item.title}`} item={item} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-6 inline-flex items-center gap-1 rounded-md text-sm text-foreground/40 transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/30"
      >
        {open ? "Show less" : `Show ${more.length} more`}
        <FiChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
    </>
  );
}
