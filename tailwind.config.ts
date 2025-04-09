import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-vibe": "linear-gradient(to right, var(--tw-gradient-stops))",
        "gradient-pro": "linear-gradient(to right, from-amber-500 to-orange-500)",
        "gradient-premium": "linear-gradient(to right, from-green-500 to-blue-500)",
        "gradient-plus": "linear-gradient(to right, from-purple-500 to-teal-500)",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      scale: {
        "102": "1.02",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        pro: {
          primary: "#f59e0b",
          secondary: "#d97706",
          light: "#fcd34d",
          dark: "#92400e",
          accent: "#fb923c",
          "bg-dark": "#7c2d12",
          "bg-light": "#fdba74"
        },
        premium: {
          primary: "#10b981",
          secondary: "#0ea5e9",
          light: "#a7f3d0",
          dark: "#065f46",
          accent: "#38bdf8",
          "bg-dark": "#0c4a6e",
          "bg-light": "#bae6fd"
        },
        plus: {
          primary: "#8b5cf6",
          secondary: "#14b8a6",
          light: "#c4b5fd",
          dark: "#5b21b6",
          accent: "#5eead4",
          "bg-dark": "#0f766e",
          "bg-light": "#d8b4fe"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-gradient": {
          "0%, 100%": { 
            backgroundPosition: "0% 50%",
            backgroundSize: "200% 200%",
          },
          "50%": { 
            backgroundPosition: "100% 50%",
            backgroundSize: "200% 200%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-gradient": "pulse-gradient 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
