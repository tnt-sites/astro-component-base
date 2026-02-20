/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "600px",
      md: "830px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      white: "#fff",
      primary: "#ED7465",
      secondary: "#2A2F33",
      "blue-light": "#1088C4",
    },
    extend: {
      fontFamily: {
        system: ["system-ui"],
        outfit: ["Outfit Variable"],
      },
    },
    plugins: [],
  },
};
