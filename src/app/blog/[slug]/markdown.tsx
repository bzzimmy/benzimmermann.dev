import fs from "node:fs";
import path from "node:path";
import { MarkdownAsync, type Components } from "react-markdown";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const publicDir = path.join(process.cwd(), "public");

function Img({ src, alt }: { src?: unknown; alt?: string }) {
  if (typeof src === "string" && src.startsWith("/") && src.endsWith(".svg")) {
    const svg = fs.readFileSync(path.join(publicDir, src), "utf8");
    return (
      <span
        role="img"
        aria-label={alt}
        className="figure"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={typeof src === "string" ? src : undefined} alt={alt} />;
}

function A({ href, children }: { href?: string; children?: React.ReactNode }) {
  const external = !!href && /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}

const components: Components = { img: Img, a: A };

export function Markdown({ children }: { children: string }) {
  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        [
          rehypePrettyCode,
          {
            theme: { light: "min-light", dark: "min-dark" },
            keepBackground: false,
          },
        ],
      ]}
      components={components}
    >
      {children}
    </MarkdownAsync>
  );
}
