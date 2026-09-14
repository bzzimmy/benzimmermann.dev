import { ImageResponse } from "next/og";
import { getPost, getPosts } from "@/lib/blog";
import { background, contentType, fonts, foreground, size } from "@/lib/og";

export { size, contentType };

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);
  const title = post?.title ?? "Ben Zimmermann";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background,
        color: foreground,
      }}
    >
      <div style={{ fontFamily: "Minecraft", fontSize: 36, opacity: 0.5 }}>
        Ben Zimmermann
      </div>
      <div
        style={{
          fontFamily: "Bricolage Grotesque",
          fontSize: title.length > 60 ? 56 : 68,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "Bricolage Grotesque",
          fontSize: 28,
          opacity: 0.4,
        }}
      >
        {post ? fmt.format(new Date(post.date)) : "benzimmermann.dev"}
      </div>
    </div>,
    { ...size, fonts: await fonts() },
  );
}
