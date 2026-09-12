import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";

const base = "https://benzimmermann.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base },
    { url: `${base}/work` },
    { url: `${base}/blog` },
    ...getPosts().map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
    })),
  ];
}
