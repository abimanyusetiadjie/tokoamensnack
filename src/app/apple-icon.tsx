import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
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
 * Apple Touch Icon for mobile home screen shortcuts using the official AMEN SNACK logo.
 */
export default function AppleIcon() {
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
          borderRadius: "36px",
          border: "8px solid #2E3677",
          padding: "18px",
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
