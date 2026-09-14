import Link from "next/link";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { getPosts } from "@/lib/blog";
import { ReturnFade } from "./return-fade";

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const mono = [
  "var(--foreground)",
  "color-mix(in oklab, var(--foreground) 35%, var(--background))",
  "var(--foreground)",
  "color-mix(in oklab, var(--foreground) 60%, var(--background))",
];

export default function Home() {
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <ReturnFade className="order-1 pt-[8vh]">
        <h1 className="font-minecraft text-5xl leading-none sm:text-[64px]">
          <AuroraText colors={mono} speed={0.6}>
            Ben Zimmermann
          </AuroraText>
        </h1>
      </ReturnFade>
      <main className="order-3 flex flex-col items-start">
        <BlurFade delay={0.2} duration={0.45} offset={0}>
          <p className="mt-10 text-left text-[17px] leading-relaxed text-foreground/60 [&_a]:text-foreground/60 [&_a]:underline [&_a]:decoration-foreground/30 [&_a]:underline-offset-[5px] [&_a:hover]:text-foreground [&_a:hover]:decoration-foreground">
            Security researcher, bug bounty hunter, and high school student. I
            hunt leaked credentials, from a single GitHub token to{" "}
            <a
              href="https://trufflesecurity.com/blog/thousands-live-secrets-found-across-four-cloud-dev-environments"
              target="_blank"
              rel="noopener noreferrer"
            >
              thousands of live secrets
            </a>{" "}
            across millions of public projects. Into secret scanning, infra
            security, and anything that shouldn&apos;t be public but is.
          </p>
        </BlurFade>
      </main>
      {posts.length > 0 && (
        <BlurFade delay={0.23} duration={0.6} offset={0} className="order-3">
          <section className="mt-12 w-full">
            <h2 className="text-sm font-medium tracking-wide text-foreground/40 uppercase">
              Latest Posts
            </h2>
            <ul className="mt-3 divide-y divide-foreground/10">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group block py-3.5">
                    <h3 className="text-[17px] leading-snug text-foreground/60 transition-colors group-hover:text-foreground">
                      {p.title}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-2 text-sm text-foreground/40">
                      <time dateTime={p.date}>
                        {fmt.format(new Date(p.date))}
                      </time>
                      {p.tags.slice(0, 2).map((t) => (
                        <span key={t} className="contents">
                          <span
                            className="text-foreground/20"
                            aria-hidden="true"
                          >
                            •
                          </span>
                          <span>{t}</span>
                        </span>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className="mt-4 inline-block text-sm text-foreground/40 underline decoration-foreground/30 underline-offset-[5px] transition-colors hover:text-foreground hover:decoration-foreground"
            >
              View all posts
            </Link>
          </section>
        </BlurFade>
      )}
    </>
  );
}
