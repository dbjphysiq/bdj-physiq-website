import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/content";

// The preview image shown when the site is shared on LinkedIn, Slack, email or X.
export const alt = "DBJ PhysIQ Technologies: physics-informed AI for industry and institutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path d="M12 82V16h35c18 0 31 12 31 30S65 76 47 76H31v6H12Zm19-25h16c7 0 12-4 12-11s-5-11-12-11H31v22Z" fill="#F2F6FB"/><path d="M52 16h-5c18 0 31 12 31 30 0 9-4 17-10 22l14 14-13 13-16-16c-2 .5-4 1-6 1H31V61h16c7 0 12-4 12-11s-5-11-12-11h5V16Z" fill="#4C93E6"/><circle cx="47" cy="46" r="5" fill="#EDA100"/></svg>`,
  ).toString("base64");

export default async function OpengraphImage() {
  const s = await getSiteSettings();
  const rings = [90, 170, 250, 330, 410, 490];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden",
          background: "linear-gradient(180deg, #071226 0%, #050d1a 100%)", color: "#ffffff", fontFamily: "sans-serif",
        }}
      >
        {/* Wave rings from a source upper right */}
        {rings.map((r, i) => (
          <div key={r}
            style={{
              position: "absolute", left: 1010 - r, top: 170 - r, width: r * 2, height: r * 2, borderRadius: r,
              border: `2px solid rgba(139,185,242,${(0.34 - i * 0.05).toFixed(2)})`,
            }} />
        ))}
        <div style={{ position: "absolute", left: 1000, top: 160, width: 20, height: 20, borderRadius: 10, background: "#eda100", boxShadow: "0 0 40px 10px rgba(237,161,0,0.45)" }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MARK} width={56} height={56} alt="" />
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>DBJ PhysIQ</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
            <div style={{ fontSize: 22, color: "#eda100", letterSpacing: 3, textTransform: "uppercase" }}>
              Physics-informed AI · Data engineering · AI governance
            </div>
            <div style={{ marginTop: 22, fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }}>
              {s.heroHeadline}
            </div>
          </div>

          <div style={{ display: "flex", gap: 36, fontSize: 22, color: "#c9d4e3" }}>
            <span>Peer-reviewed methods</span>
            <span style={{ color: "#4c6a91" }}>·</span>
            <span>Fixed-price pilots</span>
            <span style={{ color: "#4c6a91" }}>·</span>
            <span>dbjphysiq.com</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
