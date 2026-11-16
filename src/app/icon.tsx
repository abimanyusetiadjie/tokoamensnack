import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
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
 * Programmatic PNG favicon rendering the official AMEN SNACK emblem.
 */
export default function Icon() {
  const logoSrc = getLogoDataUri();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: "7px",
          border: "2px solid #2E3677",
          padding: "2px",
        }}
      >
        <img
          src={logoSrc}
          alt="AMEN SNACK"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
