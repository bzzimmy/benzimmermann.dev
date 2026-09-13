import type { Metadata } from "next";
import { BlurFade } from "@/components/ui/blur-fade";
import { disclosures } from "@/lib/work";
import { WorkList } from "./work-list";

export const metadata: Metadata = {
  title: "Work",
  description: "Security research and responsible disclosures.",
};

export default function Work() {
  return (
    <main className="order-2 pt-14 pb-16">
      <BlurFade duration={0.35} offset={0}>
        <h1 className="font-minecraft text-4xl">Work</h1>
        <p className="mt-3 text-[17px] text-foreground/60">
          Security research and responsible disclosures.
        </p>
        <WorkList items={disclosures} />
      </BlurFade>
    </main>
  );
}
