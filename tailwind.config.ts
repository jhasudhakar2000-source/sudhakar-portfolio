import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "deep-chocolate": "rgb(var(--color-deep-chocolate) / <alpha-value>)",
        "dark-chocolate": "rgb(var(--color-dark-chocolate) / <alpha-value>)",
        "mid-brown": "rgb(var(--color-mid-brown) / <alpha-value>)",
        "warm-cream": "rgb(var(--color-warm-cream) / <alpha-value>)",
        "light-cream": "rgb(var(--color-light-cream) / <alpha-value>)",
        "soft-beige": "rgb(var(--color-soft-beige) / <alpha-value>)",
        "dark-text": "rgb(var(--color-dark-text) / <alpha-value>)",
        "muted-text": "rgb(var(--color-muted-text) / <alpha-value>)",
        "muted-gold": "rgb(var(--color-muted-gold) / <alpha-value>)",
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        elevated: "rgb(var(--color-elevated) / <alpha-value>)",
        soft: "rgb(var(--color-soft) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "editorial-secondary": "rgb(var(--color-editorial-secondary) / <alpha-value>)",
        "ink-light": "rgb(var(--color-ink-light) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        sage: "rgb(var(--color-sage) / <alpha-value>)",
        "light-sage": "rgb(var(--color-light-sage) / <alpha-value>)",
        "soft-sage": "rgb(var(--color-soft-sage) / <alpha-value>)",
        "mid-sage": "rgb(var(--color-mid-sage) / <alpha-value>)",
        "deep-sage": "rgb(var(--color-deep-sage) / <alpha-value>)",
        "olive-sage": "rgb(var(--color-olive-sage) / <alpha-value>)",
        "deep-ink": "rgb(var(--color-deep-ink) / <alpha-value>)",
        "muted-ink": "rgb(var(--color-muted-ink) / <alpha-value>)",
        "light-text": "rgb(var(--color-light-text) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        script: ["var(--font-script)", "var(--font-display)", "sans-serif"],
      },
      spacing: {
        gutter: "clamp(1.25rem, 4vw, 4rem)",
      },
    },
  },
  plugins: [],
};

export default config;
