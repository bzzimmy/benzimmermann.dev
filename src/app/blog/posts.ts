export type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "algolia-docsearch-admin-keys",
    title: "I Found 39 Algolia Admin Keys Exposed Across Open Source Documentation Sites",
    date: "2026-03-10",
    tags: ["secrets", "algolia", "disclosure"],
  },
  {
    slug: "home-depot-leaked-token",
    title: "How a Single Leaked Token Exposed Home Depot's Internal Infrastructure for a Year",
    date: "2025-12-12",
    tags: ["secrets", "github", "disclosure"],
  },
];
