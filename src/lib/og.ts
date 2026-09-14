import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const background = "#0e0e11";
export const foreground = "#ededed";

async function googleFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`,
  ).then((r) => r.text());
  const url = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/,
  )?.[1];
  if (!url) throw new Error(`Failed to load font: ${family}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export async function fonts() {
  const [minecraft, bricolage] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/Minecraft.otf")),
    googleFont("Bricolage Grotesque", 500),
  ]);
  return [
    { name: "Minecraft", data: minecraft, weight: 400 as const },
    { name: "Bricolage Grotesque", data: bricolage, weight: 500 as const },
  ];
}
