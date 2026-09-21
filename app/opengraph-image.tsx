import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Loop Lord — Full Stack Developer | BITSANDBYTESDUDE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const robot = await readFile(path.join(process.cwd(), "public", "robot.jpg"));
  const robotSrc = `data:image/jpeg;base64,${robot.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#080808",
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(59,130,246,0.28), transparent 46%), radial-gradient(circle at 88% 88%, rgba(6,182,212,0.22), transparent 42%)",
          fontFamily: "sans-serif",
          padding: 64,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#67E8F9",
              fontSize: 24,
              letterSpacing: 6,
            }}
          >
            BITSANDBYTESDUDE
          </div>
          <div
            style={{
              fontSize: 118,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: -4,
              marginTop: 18,
              lineHeight: 1,
            }}
          >
            LOOP LORD
          </div>
          <div style={{ fontSize: 40, color: "#CFCFCF", marginTop: 22 }}>
            Full Stack Developer
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              gap: 14,
            }}
          >
            {["Web Apps", "AI Tools", "SaaS", "Experiences"].map((chip) => (
              <div
                key={chip}
                style={{
                  display: "flex",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.18)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "#EDEDEF",
                  fontSize: 22,
                  padding: "10px 22px",
                }}
              >
                {chip}
              </div>
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={robotSrc}
          alt=""
          width={370}
          height={370}
          style={{
            borderRadius: 40,
            border: "1px solid rgba(255,255,255,0.14)",
            objectFit: "cover",
            boxShadow: "0 0 80px rgba(59,130,246,0.45)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
