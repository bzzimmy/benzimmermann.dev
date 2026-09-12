import { BlurFade } from "@/components/ui/blur-fade";
import { BlogList } from "./blog-list";
import { posts } from "./posts";

export default function Blog() {
  return (
    <main className="order-2 pt-14 pb-16">
      <BlurFade duration={0.35} offset={0}>
        <h1 className="font-serif text-5xl tracking-tight">Blog</h1>
        <p className="mt-3 text-[17px] text-foreground/60">
          Notes on security research and disclosure.
        </p>
        <BlogList posts={posts} />
      </BlurFade>
    </main>
  );
}
