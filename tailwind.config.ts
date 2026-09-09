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
        display: ["'Bebas Neue'", "Impact", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        sticker: "0 6px 0 #0A0A0C",
        "sticker-sm": "0 3px 0 #0A0A0C",
        "sticker-gold": "0 4px 0 #B88010",
        "sticker-orange": "0 4px 0 #D1450A",
      },
      backgroundImage: {
        "halftone-dots": "radial-gradient(circle, rgba(10, 10, 12, 0.85) 1.5px, transparent 1.5px)",
        "halftone-dots-gold": "radial-gradient(circle, rgba(232, 169, 39, 0.3) 1.5px, transparent 1.5px)",
      },
    },
  },
  plugins: [],
};
export default config;
