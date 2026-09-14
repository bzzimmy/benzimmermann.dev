import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";

export default function NotFound() {
  return (
    <main className="order-2 pt-14 pb-16">
      <BlurFade duration={0.35} offset={0}>
        <h1 className="font-minecraft text-4xl">404</h1>
        <p className="mt-3 text-[17px] text-foreground/60">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm text-foreground/40 underline decoration-foreground/30 underline-offset-[5px] transition-colors hover:text-foreground hover:decoration-foreground"
        >
          Back home
        </Link>
      </BlurFade>
    </main>
  );
}
