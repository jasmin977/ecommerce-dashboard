/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      "heading1-bold": [
        "36px",
        {
          fontWeight: "700",
        },
      ],
      "heading1-semibold": [
        "36px",
        {
          fontWeight: "600",
        },
      ],
      "heading2-bold": [
        "30px",
        {
          fontWeight: "700",
        },
      ],
      "heading2-semibold": [
        "30px",
        {
          fontWeight: "600",
        },
      ],
      "heading3-bold": [
        "24px",
        {
          fontWeight: "700",
        },
      ],
      "heading4-medium": [
        "20px",
        {
          fontWeight: "500",
        },
      ],
      "body-bold": [
        "18px",
        {
          fontWeight: "700",
        },
      ],
      "body-semibold": [
        "18px",
        {
          fontWeight: "600",
        },
      ],
      "body-medium": [
        "18px",
        {
          fontWeight: "500",
        },
      ],
      "body-normal": [
        "18px",
        {
          fontWeight: "400",
        },
      ],
      "body1-bold": [
        "18px",
        {
          fontWeight: "700",
        },
      ],
      "base-regular": [
        "16px",
        {
          fontWeight: "400",
        },
      ],
      "base-medium": [
        "16px",
        {
          fontWeight: "500",
        },
      ],
      "base-semibold": [
        "16px",
        {
          fontWeight: "600",
        },
      ],
      "base1-semibold": [
        "16px",
        {
          fontWeight: "600",
        },
      ],
      "small-regular": [
        "14px",
        {
          fontWeight: "400",
        },
      ],
      "small-medium": [
        "14px",
        {
          fontWeight: "500",
        },
      ],
      "small-semibold": [
        "14px",
        {
          fontWeight: "600",
        },
      ],
      "subtle-medium": [
        "12px",
        {
          lineHeight: "16px",
          fontWeight: "500",
        },
      ],
      "subtle-semibold": [
        "12px",
        {
          lineHeight: "16px",
          fontWeight: "600",
        },
      ],
      "tiny-medium": [
        "10px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
      "x-small-semibold": [
        "7px",
        {
          lineHeight: "9.318px",
          fontWeight: "600",
        },
      ],
    },
    extend: {
      colors: {
        primary: "#2B3445",
        secondary: "#5C5C7B",

        blue: "#4E97FD",
        "logout-btn": "#FF5A5A",
        "navbar-menu": "rgba(16, 16, 18, 0.6)",
        "dark-1": "#071739",
        "dark-2": "#112143",
        "dark-3": "#1B2B4D",
        "dark-4": "#132B53",
        "dark-5": "#253557",
        "light-1": "#F8F8F8",
        "light-2": "#FFFFFF",
        "light-3": "#F1F1F1",
        "light-4": "#5C5C7B",
        "gray-1": "#697C89",
        "primary-hover": "rgba(43, 52, 60, 0.7)",
        glassmorphism: "rgba(16, 16, 18, 0.80)",
        //////////////////////
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "count-badge": "0px 0px 6px 2px rgba(219, 188, 159, 0.30)",
        "groups-sidebar": "-30px 0px 60px 0px rgba(28, 28, 31, 0.50)",
      },
      screens: {
        xs: "400px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
