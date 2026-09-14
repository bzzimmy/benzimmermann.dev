import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { BlurFade } from "@/components/ui/blur-fade";
import { Blocks } from "@/components/ui/blocks";
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

const description =
  "Security researcher and bug bounty hunter focused on leaked credentials and responsible disclosure.";

export const metadata: Metadata = {
  metadataBase: new URL("https://benzimmermann.dev"),
  title: { default: "Ben Zimmermann", template: "%s · Ben Zimmermann" },
  description,
  openGraph: {
    type: "website",
    siteName: "Ben Zimmermann",
    title: "Ben Zimmermann",
    description,
    url: "https://benzimmermann.dev",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Ben Zimmermann",
    description,
  },
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
        <footer className="order-3 mt-auto pt-16 opacity-60">
          <BlurFade delay={0.4} duration={0.8} offset={0}>
            <Blocks className="block" />
          </BlurFade>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
