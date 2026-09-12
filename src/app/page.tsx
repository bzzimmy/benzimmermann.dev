import { AuroraText } from "@/components/ui/aurora-text";
import { Nav } from "./nav";

const mono = [
  "var(--foreground)",
  "color-mix(in oklab, var(--foreground) 35%, var(--background))",
  "var(--foreground)",
  "color-mix(in oklab, var(--foreground) 60%, var(--background))",
];

export default function Home() {
  return (
    <main className="flex h-dvh flex-col items-center overflow-hidden pt-[22vh] text-center">
      <h1 className="font-serif text-6xl leading-none tracking-tight sm:text-[84px]">
        <AuroraText colors={mono} speed={0.6}>
          Ben <em>Zimmermann</em>
        </AuroraText>
      </h1>
      <p className="mt-5 text-[17px] text-foreground/60">
        Software engineer.
      </p>
      <Nav className="mt-10" />
    </main>
  );
}
