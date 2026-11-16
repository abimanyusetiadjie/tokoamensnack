import { ImageResponse } from "next/og";

export const alt =
  "Toko Amen Snack Sungailiat — Pusat Oleh-Oleh & Camilan Khas Bangka Terlengkap";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Dynamic OpenGraph social share card (WhatsApp, Instagram, Google Share preview).
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFF8E8",
          padding: "56px 72px",
        }}
      >
        {/* Top Wordmark + Sisparnas Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#0D5C57",
                  lineHeight: 1,
                }}
              >
                toko
              </span>
              <span
                style={{
                  fontSize: 44,
                  fontWeight: 900,
                  color: "#0D5C57",
                  lineHeight: 1,
                }}
              >
                amen snack
              </span>
            </div>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "9999px",
                backgroundColor: "#EA580C",
                display: "flex",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              backgroundColor: "#0D5C57",
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
              fontSize: 64,
              fontWeight: 900,
              color: "#111827",
              lineHeight: 1.12,
            }}
          >
            Pusat Oleh-Oleh & Camilan Khas Bangka Terlengkap
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#374151",
              lineHeight: 1.4,
            }}
          >
            Kemplang Pasir Cap AMEN | Getas Cap Obor | Kemplang Panggang JJ | Kecap Asin Cap SS | Kopi Curah Bangka
          </div>
        </div>

        {/* Bottom Store Footer Band */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#0B3B38",
            color: "#FFFFFF",
            padding: "20px 32px",
            borderRadius: "20px",
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
            WA: 0813-6872-2622 | Shopee: amensnack
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
