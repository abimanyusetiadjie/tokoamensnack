import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/payload/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-red": "var(--brand-red)",
        "brand-red-dark": "var(--brand-red-dark)",
        "brand-orange": "var(--brand-orange)",
        "brand-orange-dark": "var(--brand-orange-dark)",
        "brand-dark": "var(--brand-dark)",
        "brand-soft": "var(--brand-soft)",
        "brand-slate": "var(--brand-slate)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        foreground: "var(--foreground)",
        background: "var(--background)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "var(--font-geist-sans)", "sans-serif"],
      },
      borderRadius: {
        brand: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
