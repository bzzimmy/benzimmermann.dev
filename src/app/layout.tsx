import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { BlurFade } from "@/components/ui/blur-fade";
import { Flow } from "@/components/ui/flow";
import { NavBar } from "./nav-bar";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
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
      className={`${jakarta.variable} ${instrumentSerif.variable} h-full antialiased`}
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
