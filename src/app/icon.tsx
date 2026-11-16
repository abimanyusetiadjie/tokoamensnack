import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

/**
 * Programmatic PNG favicon matching Toko Amen Snack (Sea Teal #0D5C57 + Grilled Orange #EA580C).
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D5C57",
          borderRadius: "8px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 16,
            fontWeight: 900,
            color: "#FFF8E8",
            letterSpacing: "-0.04em",
          }}
        >
          as
        </div>
        <div
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: 6,
            height: 6,
            borderRadius: "9999px",
            backgroundColor: "#EA580C",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
