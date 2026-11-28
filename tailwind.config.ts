import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B1F4B",
          dark: "#0F122E",
          light: "#2A306E",
        },
        accent: {
          DEFAULT: "#FF7A00",
          hover: "#E56D00",
        },
        highlight: {
          DEFAULT: "#FFC400",
        },
        surface: {
          DEFAULT: "#F7F7F9",
        },
      },
      fontFamily: {
        sans: ['"Tajawal"', "Arial", "Helvetica", "sans-serif"],
        arabic: ['"Tajawal"', "Arial", "Helvetica", "sans-serif"],
        english: ['"Tajawal"', "Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        "glow-orange": "0 0 25px rgba(255, 122, 0, 0.45)",
        "glow-navy": "0 10px 40px rgba(27, 31, 75, 0.25)",
      },
      borderRadius: {
        circle: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;