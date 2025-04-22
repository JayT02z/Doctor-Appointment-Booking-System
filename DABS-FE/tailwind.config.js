/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#111827",
        card: "#ffffff",
        "card-foreground": "#111827",
        popover: "#ffffff",
        "popover-foreground": "#111827",
        primary: {
          DEFAULT: "#0ea5e9",
          foreground: "#ffffff",
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        secondary: {
          DEFAULT: "#f3f4f6",
          foreground: "#111827",
        },
        muted: {
          DEFAULT: "#f3f4f6",
          foreground: "#6b7280",
        },
        accent: {
          DEFAULT: "#f3f4f6",
          foreground: "#111827",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#0ea5e9",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};
