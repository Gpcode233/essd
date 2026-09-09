import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        essd: {
          gold: "#E8A927",
          "gold-light": "#F5C754",
          "gold-dark": "#B88010",
          yellow: "#F7BE2F",
          orange: "#F25A19",
          "orange-dark": "#D1450A",
          "orange-light": "#FF783D",
          black: "#0A0A0C",
          charcoal: "#141418",
          dark: "#1E1E24",
          card: "#18181D",
          cream: "#FAF6EB",
          "cream-muted": "#E5DEC9",
          border: "#2A2A33",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Arial Black", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        script: ["var(--font-script)", "Brush Script MT", "cursive"],
      },
      boxShadow: {
        sticker: "0 8px 0 rgba(10, 10, 12, 0.9), 0 16px 24px rgba(0, 0, 0, 0.4)",
        "sticker-sm": "0 4px 0 rgba(10, 10, 12, 0.9)",
        "sticker-gold": "0 6px 0 #B88010, 0 12px 20px rgba(0, 0, 0, 0.3)",
        "sticker-orange": "0 6px 0 #D1450A, 0 12px 20px rgba(0, 0, 0, 0.3)",
        "glow-gold": "0 0 25px rgba(232, 169, 39, 0.4)",
        "glow-orange": "0 0 25px rgba(242, 90, 25, 0.4)",
      },
      backgroundImage: {
        "halftone-dots": "radial-gradient(circle, rgba(10, 10, 12, 0.85) 1.5px, transparent 1.5px)",
        "halftone-dots-gold": "radial-gradient(circle, rgba(232, 169, 39, 0.3) 1.5px, transparent 1.5px)",
        "checker-pattern": "linear-gradient(45deg, rgba(10,10,12,0.06) 25%, transparent 25%), linear-gradient(-45deg, rgba(10,10,12,0.06) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(10,10,12,0.06) 75%), linear-gradient(-45deg, transparent 75%, rgba(10,10,12,0.06) 75%)",
      },
    },
  },
  plugins: [],
};
export default config;
