import Link from "next/link";

const links = [
  { href: "/", label: "home" },
  { href: "/work", label: "work" },
  { href: "/blog", label: "blog" },
];

export function Nav({ className = "" }: { className?: string }) {
  return (
    <nav
      className={`flex items-center gap-4 text-base text-foreground/40 ${className}`}
    >
      {links.map(({ href, label }, i) => (
        <span key={href} className="contents">
          {i > 0 && (
            <span className="text-foreground/20" aria-hidden="true">
              •
            </span>
          )}
          <Link href={href} className="transition-colors hover:text-foreground">
            {label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
