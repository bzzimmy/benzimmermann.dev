"use client";

import { useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { hasVisited } from "./visited";

export function ReturnFade({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [animate] = useState(hasVisited);
  if (!animate) return <div className={className}>{children}</div>;
  return (
    <BlurFade duration={0.45} offset={0} className={className}>
      {children}
    </BlurFade>
  );
}
