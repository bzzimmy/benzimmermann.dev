import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { BlurFade } from "@/components/ui/blur-fade";
import { getPost, getPosts } from "@/lib/blog";
import { Markdown } from "./markdown";

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function readingTime(md: string) {
  const words = md
    .replace(/```[\s\S]*?```/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <main className="order-2 pt-14 pb-16">
      <BlurFade duration={0.35} offset={0}>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-foreground/60 transition-colors hover:text-foreground"
        >
          <FiArrowLeft aria-hidden className="size-3.5" />
          All posts
        </Link>
        <article className="mt-6">
          <header>
            <h1 className="text-[32px] leading-[1.1] font-medium tracking-tight text-balance sm:text-[40px]">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-foreground/50">
              <time dateTime={post.date}>
                {fmt.format(new Date(post.date))}
              </time>
              <span className="text-foreground/25" aria-hidden="true">
                •
              </span>
              <span>{readingTime(post.content)} min read</span>
              {post.tags.map((t) => (
                <span key={t} className="contents">
                  <span className="text-foreground/25" aria-hidden="true">
                    •
                  </span>
                  <span>{t}</span>
                </span>
              ))}
            </div>
          </header>
          <div className="prose mt-10">
            <Markdown>{post.content}</Markdown>
          </div>
        </article>
      </BlurFade>
    </main>
  );
}
