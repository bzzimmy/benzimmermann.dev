import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import { BlurFade } from "@/components/ui/blur-fade";
import { Flow } from "@/components/ui/flow";
import { NavBar } from "./nav-bar";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const minecraft = localFont({
  variable: "--font-minecraft",
  src: "./fonts/Minecraft.otf",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://benzimmermann.dev"),
  title: { default: "Ben Zimmermann", template: "%s · Ben Zimmermann" },
  description: "Software engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${minecraft.variable} h-full antialiased`}
    >
      <body className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-6">
        <NavBar />
        {children}
        <footer className="order-3 mt-auto opacity-70">
          <BlurFade delay={0.4} duration={0.8} offset={0}>
            <Flow height={160} className="block" />
          </BlurFade>
        </footer>
      </body>
    </html>
  );
}
