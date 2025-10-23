/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Inter'", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: {
          DEFAULT: "#f59e0b",
          dark: "#b45309",
          light: "#fcd34d",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          dark: "#6d28d9",
          light: "#c4b5fd",
        },
        ember: "#ff7a18",
        midnight: "#0b0a1a",
        "midnight-soft": "#151229",
      },
      boxShadow: {
        glow: "0 28px 60px -18px rgba(245, 158, 11, 0.55)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(140deg, rgba(255,122,24,0.85) 0%, rgba(245,158,11,0.55) 35%, rgba(139,92,246,0.55) 62%, rgba(12,10,26,0.95) 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,159,67,0.12), rgba(139,92,246,0.08))",
        "orb-gradient":
          "radial-gradient(circle at 30% 30%, rgba(255,196,86,0.9), rgba(245,158,11,0.3) 55%, rgba(12,10,26,0) 90%)",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
    },
  },
  plugins: [],
}
