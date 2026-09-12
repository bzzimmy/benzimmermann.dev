import { BlurFade } from "@/components/ui/blur-fade";

export default function Work() {
  return (
    <main className="order-2 pt-14 pb-16">
      <BlurFade duration={0.35} offset={0}>
        <h1 className="font-serif text-5xl tracking-tight">Work</h1>
        <p className="mt-4 text-foreground/60">Coming soon.</p>
      </BlurFade>
    </main>
  );
}
