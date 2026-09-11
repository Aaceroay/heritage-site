import type { Config } from "tailwindcss";

// Design system: warm neutral background, two accent colors.
// "brisa" (breeze/blue-teal) evokes crossing borders & multilingual exchange;
// "tierra" (terracotta) evokes warmth, community, and Spanish-speaking regions.
// Chosen deliberately to avoid flags/national colors while staying warm & human.
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FAF7F2",
          dark: "#15161A",
        },
        ink: {
          DEFAULT: "#1E1B16",
          dark: "#EDEAE3",
        },
        brisa: {
          50: "#EFF6F6",
          100: "#D7E9EA",
          300: "#8FC2C6",
          500: "#2F7E85",
          600: "#256469",
          700: "#1C4C50",
          900: "#102A2D",
        },
        tierra: {
          50: "#FBF1EA",
          100: "#F3DBC9",
          300: "#E0A97C",
          500: "#C1703A",
          600: "#A05A2C",
          700: "#7A4522",
          900: "#452811",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "72ch",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: "72ch",
          },
        },
      }),
    },
  },
  plugins: [],
};

export default config;
