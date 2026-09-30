import fs from "node:fs";
import path from "node:path";
import { MarkdownAsync, type Components } from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import { CodeBlock } from "./code-block";

const publicDir = path.join(process.cwd(), "public");

// Images live inside <p>, so figures are built from spans to stay valid HTML.
function Img({
  src,
  alt,
  title,
}: {
  src?: unknown;
  alt?: string;
  title?: string;
}) {
  const url = typeof src === "string" ? src : undefined;
  const media =
    url?.startsWith("/") && url.endsWith(".svg") ? (
      <span
        role="img"
        aria-label={alt}
        className="block"
        dangerouslySetInnerHTML={{
          __html: fs.readFileSync(path.join(publicDir, url), "utf8"),
        }}
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt={alt} />
    );

  return (
    <span className="figure">
      {media}
      {title && <span className="caption">{title}</span>}
    </span>
  );
}

type WithNode<T extends React.ElementType> = React.ComponentProps<T> & {
  node?: unknown;
};

// react-markdown passes the hast `node` as a prop; keep it off the DOM.
function withoutNode<T extends { node?: unknown }>(props: T) {
  const rest = { ...props };
  delete rest.node;
  return rest as Omit<T, "node">;
}

function Table(props: WithNode<"table">) {
  return (
    <div className="table-wrap">
      <table {...withoutNode(props)} />
    </div>
  );
}

function Pre(props: WithNode<"pre">) {
  return <CodeBlock {...withoutNode(props)} />;
}

function A(props: WithNode<"a">) {
  const { href } = props;
  const external = !!href && /^https?:\/\//.test(href);
  return (
    <a
      {...withoutNode(props)}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    />
  );
}

const components: Components = {
  img: Img,
  a: A,
  table: Table,
  pre: Pre,
};

export function Markdown({ children }: { children: string }) {
  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm, remarkSmartypants]}
      rehypePlugins={[
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: { className: ["anchor"] },
            test: ["h2", "h3"],
          },
        ],
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
