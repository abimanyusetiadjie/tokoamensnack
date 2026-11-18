import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Toko Amen Snack Sungailiat — Pusat Oleh-Oleh & Camilan Khas Bangka Terlengkap";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function getLogoDataUri(): string {
  const logoPath = path.join(
    process.cwd(),
    "public",
    "images",
    "logo-amen-snack.png"
  );
  const base64 = fs.readFileSync(logoPath).toString("base64");
  return `data:image/png;base64,${base64}`;
}

/**
 * Dynamic OpenGraph social share card (WhatsApp, Instagram, Google Share preview).
 */
export default function OpenGraphImage() {
  const logoSrc = getLogoDataUri();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F8FAFC",
          padding: "52px 72px",
        }}
      >
        {/* Top Official Logo + Sisparnas Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img
              src={logoSrc}
              alt="Logo AMEN SNACK"
              style={{
                width: 82,
                height: 90,
                objectFit: "contain",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  color: "#2E3677",
                  lineHeight: 1.05,
                }}
              >
                TOKO AMEN SNACK
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#E93433",
                  marginTop: 4,
                  letterSpacing: "0.04em",
                }}
              >
                OLEH-OLEH KHAS BANGKA • SUNGAILIAT
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              backgroundColor: "#2E3677",
              color: "#FFFFFF",
              fontSize: 20,
              fontWeight: 700,
              padding: "12px 24px",
              borderRadius: "9999px",
            }}
          >
            Sisparnas Kemenpar | Rating 4.5/5 Google Maps
          </div>
        </div>

        {/* Center Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 900,
              color: "#0F172A",
              lineHeight: 1.12,
            }}
          >
            Pusat Oleh-Oleh & Camilan Khas Bangka Terlengkap
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 27,
              color: "#475569",
              lineHeight: 1.4,
            }}
          >
            Getas Bangka AMS | Kericu Telor Cumi AMS | Terasi AMS | Kemplang Panggang JJ | Kopi Curah Bangka
          </div>
        </div>

        {/* Bottom Store Footer Band */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#1C224F",
            color: "#FFFFFF",
            padding: "20px 32px",
            borderRadius: "20px",
            borderBottom: "6px solid #E93433",
          }}
        >
          <div style={{ display: "flex", fontSize: 22, fontWeight: 600 }}>
            Jl. Muhidin No.106, Sungailiat, Kabupaten Bangka
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 800,
              color: "#FDE047",
            }}
          >
            WA: 0813-6872-2622 | @toko.amensnack
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
