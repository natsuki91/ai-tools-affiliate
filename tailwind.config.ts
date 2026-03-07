import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        secondary: "#8B5CF6",
        accent: "#06B6D4",
        background: "#0F0F0F",
        surface: "#1A1A2E",
        card: "#16213E",
        "text-primary": "#F8FAFC",
        "text-secondary": "#94A3B8",
        border: "#2D2D44",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
