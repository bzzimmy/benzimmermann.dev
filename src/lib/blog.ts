import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
};

export type Post = PostMeta & { content: string };

const dir = path.join(process.cwd(), "content/blog");

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

function parse(file: string): Post {
  const slug = path.basename(file, ".md");
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const { title, date, summary, tags = [], draft = false } = data;

  if (typeof title !== "string") throw new Error(`${slug}: missing title`);
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date))
    throw new Error(`${slug}: date must be YYYY-MM-DD`);
  if (typeof summary !== "string") throw new Error(`${slug}: missing summary`);
  if (!isStringArray(tags)) throw new Error(`${slug}: tags must be strings`);
  if (typeof draft !== "boolean")
    throw new Error(`${slug}: draft must be boolean`);

  return { slug, title, date, summary, tags, draft, content };
}

const visible = (p: PostMeta) =>
  !p.draft || process.env.NODE_ENV !== "production";

export function getPosts(): PostMeta[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(path.join(dir, f)))
    .filter(visible)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ slug, title, date, summary, tags, draft }) => ({
      slug,
      title,
      date,
      summary,
      tags,
      draft,
    }));
}

export function getPost(slug: string): Post | null {
  const file = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const post = parse(file);
  return visible(post) ? post : null;
}
