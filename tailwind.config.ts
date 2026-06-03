import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "leaf-fall": "leaf-fall 8s ease-in-out infinite",
        aurora: "aurora 12s ease-in-out infinite",
        scanlines: "scanlines 8s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "0.6",
            boxShadow: "0 0 10px rgba(99,102,241,0.3)",
          },
          "50%": {
            opacity: "1",
            boxShadow: "0 0 20px rgba(99,102,241,0.7)",
          },
        },
        "leaf-fall": {
          "0%": {
            transform: "translateY(-10%) rotate(0deg)",
            opacity: "0",
          },
          "10%": { opacity: "0.8" },
          "90%": { opacity: "0.6" },
          "100%": {
            transform: "translateY(110vh) rotate(360deg)",
            opacity: "0",
          },
        },
        aurora: {
          "0%, 100%": {
            transform: "translate(0%, 0%) scale(1)",
            opacity: "0.6",
          },
          "33%": {
            transform: "translate(5%, -5%) scale(1.1)",
            opacity: "0.8",
          },
          "66%": {
            transform: "translate(-5%, 5%) scale(0.9)",
            opacity: "0.7",
          },
        },
        scanlines: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
