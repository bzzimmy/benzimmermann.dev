import { ImageResponse } from "next/og";
import { background, contentType, fonts, foreground, size } from "@/lib/og";

export const alt = "Ben Zimmermann";
export { size, contentType };

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background,
        color: foreground,
      }}
    >
      <div style={{ fontFamily: "Minecraft", fontSize: 104, lineHeight: 1 }}>
        Ben Zimmermann
      </div>
      <div
        style={{
          marginTop: 40,
          fontFamily: "Bricolage Grotesque",
          fontSize: 36,
          lineHeight: 1.4,
          opacity: 0.6,
        }}
      >
        Security researcher and bug bounty hunter focused on leaked credentials
        and responsible disclosure.
      </div>
    </div>,
    { ...size, fonts: await fonts() },
  );
}
