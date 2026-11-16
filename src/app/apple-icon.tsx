import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

/**
 * Apple Touch Icon for mobile home screen shortcuts.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF8E8",
          borderRadius: "36px",
          border: "8px solid #0D5C57",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 800,
            color: "#0D5C57",
            letterSpacing: "0.02em",
          }}
        >
          toko
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 34,
            fontWeight: 900,
            color: "#0D5C57",
            marginTop: 2,
          }}
        >
          <span>amen</span>
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: "9999px",
              backgroundColor: "#EA580C",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
