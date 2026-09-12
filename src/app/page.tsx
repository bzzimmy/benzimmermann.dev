import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { Nav } from "./nav";
import { Socials } from "./socials";

const mono = [
  "var(--foreground)",
  "color-mix(in oklab, var(--foreground) 35%, var(--background))",
  "var(--foreground)",
  "color-mix(in oklab, var(--foreground) 60%, var(--background))",
];

export default function Home() {
  return (
    <main className="flex h-dvh flex-col items-center overflow-hidden pt-[13vh]">
      <h1 className="font-serif text-6xl leading-none tracking-tight sm:text-[84px]">
        <AuroraText colors={mono} speed={0.6}>
          Ben <em>Zimmermann</em>
        </AuroraText>
      </h1>
      <BlurFade delay={0} duration={0.45} offset={0}>
        <p className="mt-8 max-w-lg text-left text-[17px] leading-relaxed text-foreground/60 [&_a]:text-foreground [&_a]:underline [&_a]:decoration-foreground/30 [&_a]:underline-offset-[5px] [&_a:hover]:decoration-foreground">
          Security researcher, bug bounty hunter, and high school student. I
          find leaked credentials in places they shouldn&apos;t be, from single
          exposed tokens to{" "}
          <a
            href="https://trufflesecurity.com/blog/thousands-live-secrets-found-across-four-cloud-dev-environments"
            target="_blank"
            rel="noopener noreferrer"
          >
            large-scale credential research
          </a>{" "}
          across millions of public projects.
        </p>
      </BlurFade>
      <BlurFade delay={0.3} duration={0.3} offset={0}>
        <div className="mt-16 -ml-[4px] flex items-center gap-4">
          <Nav />
          <span className="h-4 w-px bg-foreground/15" />
          <Socials />
        </div>
      </BlurFade>
    </main>
  );
}
