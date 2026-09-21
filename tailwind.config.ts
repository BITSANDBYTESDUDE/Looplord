import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050506",
        coal: "#0B0B0D",
        panel: "#111114",
        ink: "#EDEDEF",
        mute: "#A1A1AA",
        accent: {
          DEFAULT: "#3B82F6",
          cyan: "#06B6D4",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk Variable'", "'Space Grotesk'", "sans-serif"],
        sans: ["'Inter Variable'", "Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono Variable'", "'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(59, 130, 246, 0.5)",
        "glow-cyan": "0 0 40px -8px rgba(6, 182, 212, 0.5)",
        card: "0 20px 60px -20px rgba(0, 0, 0, 0.8)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.82)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(-8%, -4%) scale(1)" },
          "50%": { transform: "translate(8%, 6%) scale(1.15)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
        aurora: "aurora 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
