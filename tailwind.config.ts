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
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1B4B8C',
          foreground: '#FFFFFF',
        },
        cta: {
          DEFAULT: '#FF6B35',
          foreground: '#FFFFFF',
        },
        gray: {
          600: '#6B7280',
          400: '#9CA3AF',
          200: '#E5E7EB',
        },
        background: {
          DEFAULT: '#FFFFFF',
          alt: '#F9FAFB',
        },
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        default: '0 2px 8px rgba(0, 0, 0, 0.04)',
        hover: '0 8px 24px rgba(0, 0, 0, 0.08)',
        elevated: '0 12px 32px rgba(0, 0, 0, 0.12)',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-out',
      },
      lineHeight: {
        body: '1.6',
        heading: '1.3',
      },
    },
  },
  plugins: [],
};

export default config;
