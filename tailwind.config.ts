import type { Config } from "tailwindcss";

export const colours = {
  primary: {
    DEFAULT: "#feee00",
    light: "#fffd5d",
    dark: "#fcd116",
  },
  secondary: {
    DEFAULT: "#df00ff",
  },
  accent: {
    DEFAULT: "#5bc0eb",
  },
  midnight: {
    DEFAULT: "#1A2138",
    light: "#2E3450",
  },
  tangerine: {
    DEFAULT: "#FF9F1C",
    dark: "#D67D15",
  },
  alabaster: {
    DEFAULT: "#EAEAEA",
  },
  concrete: {
    DEFAULT: "#cdcdcd",
  },
  feedback: {
    red: "#E63946",
    green: "#2ECC71",
    yellow: "#F7C948",
  },
  honeydew: {
    DEFAULT: "#fde300",
    dark: "#f5ca00",
  },
  sky: {
    DEFAULT: "#66b2ff",
    dark: "#5191e1",
  },
  photo: {
    DEFAULT: "#9cd1d9",
  },
  cerulean: {
    DEFAULT: "#236192",
    light: "#6090b5",
  },
  berkeley: {
    DEFAULT: "#102a44",
    light: "#40567a",
  },
  error: {
    DEFAULT: "#ff0000",
  },
  coral: {
    DEFAULT: "#ff6f61",
    dark: "#e56155",
  },
  charcoal: {
    DEFAULT: "#36454f",
  },
  white: {
    DEFAULT: "#fff",
  },
  black: {
    DEFAULT: "#000",
    light: "#757575",
  },
  fb: {
    DEFAULT: "#1877f2",
  },
  twitch: {
    DEFAULT: "#6441a5",
  },
  x: {
    DEFAULT: "#1f3050",
  },
  google: {
    DEFAULT: "#4285f4",
  },
  outlook: {
    DEFAULT: "#1974ce",
  },
}


export default {
  important: '#parent',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./comps/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: colours,
    },
  },
  plugins: [],
} satisfies Config;
