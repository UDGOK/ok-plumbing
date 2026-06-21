import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OKPlumb — Tulsa's Trusted Plumber";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#EFEEEA",
          color: "#222B2F",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#B08D43",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Tulsa&apos;s Trusted Plumber
        </div>
        <div style={{ fontSize: 96, fontWeight: 500, lineHeight: 1.05 }}>
          Quiet pipes,
          <br />
          honest work.
        </div>
        <div style={{ marginTop: 32, fontSize: 28, color: "#4A575C" }}>
          okplumb.com · 24/7 Emergency · (918) 851-8203
        </div>
      </div>
    ),
    { ...size },
  );
}
