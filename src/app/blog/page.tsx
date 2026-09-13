import type { Metadata } from "next";
import { BlurFade } from "@/components/ui/blur-fade";
import { getPosts } from "@/lib/blog";
import { BlogList } from "./blog-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on security research and disclosure.",
};

export default function Blog() {
  return (
    <main className="order-2 pt-14 pb-16">
      <BlurFade duration={0.35} offset={0}>
        <h1 className="font-minecraft text-4xl">Blog</h1>
        <p className="mt-3 text-[17px] text-foreground/60">
          Notes on security research and disclosure.
        </p>
        <BlogList posts={getPosts()} />
      </BlurFade>
    </main>
  );
}
