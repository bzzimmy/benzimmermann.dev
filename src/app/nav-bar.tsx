"use client";

import { motion, MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Nav } from "./nav";
import { Socials } from "./socials";
import { markVisited } from "./visited";

export function NavBar() {
  const home = usePathname() === "/";
  useEffect(markVisited, []);
  return (
    <MotionConfig reducedMotion="user">
      <BlurFade
        delay={home ? 0.3 : 0}
        duration={0.3}
        offset={0}
        className={home ? "order-2 mt-12 self-center" : "order-1 pt-16 self-start"}
      >
        <motion.div
          layout
          transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center gap-4 ${home ? "-ml-[4px]" : ""}`}
        >
          <Nav />
          <span className="h-4 w-px bg-foreground/15" />
          <Socials />
        </motion.div>
      </BlurFade>
    </MotionConfig>
  );
}
