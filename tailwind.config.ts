import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          500: "#0284c7",
          600: "#0369a1",
          700: "#075985",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          orange: "#ea580c",
          amber: "#f59e0b",
          dark: "#0b0f17",
          cream: "#fafaf9",
          slate: "#0f172a",
        },
        brand: {
          orange: "#ea580c",
          "orange-dark": "#c2410c",
          "orange-light": "#ffedd5",
          dark: "#0b0f17",
          charcoal: "#111827",
          cream: "#fafaf9",
          surface: "#f4f4f3",
          border: "#e5e5e0",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 30px -5px rgba(234, 88, 12, 0.25), 0 0 15px -5px rgba(245, 158, 11, 0.2)",
        "glow-lg": "0 0 50px -10px rgba(234, 88, 12, 0.35), 0 0 25px -5px rgba(245, 158, 11, 0.3)",
        "glass": "0 8px 32px 0 rgba(15, 23, 42, 0.06)",
        "glass-elevated": "0 20px 40px -15px rgba(15, 23, 42, 0.12)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-warm": "radial-gradient(at 10% 20%, rgba(234, 88, 12, 0.08) 0px, transparent 50%), radial-gradient(at 90% 10%, rgba(245, 158, 11, 0.06) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(15, 23, 42, 0.04) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
