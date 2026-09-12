"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "home" },
  { href: "/work", label: "work" },
  { href: "/blog", label: "blog" },
];

export function Nav({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  return (
    <nav className={`flex gap-5 text-sm ${className}`}>
      {links.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`transition-colors hover:text-foreground ${
              active ? "text-foreground" : "text-foreground/40"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
