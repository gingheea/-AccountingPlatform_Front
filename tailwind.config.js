/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Raleway", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          madison: "#0F3A66",
          madisonDark: "#0C2E51",
          gothic: "#7A8FA3",
          tan: "#CFAF7B",
          pampas: "#F7F5F2",
          white: "#FFFFFF",
          ink: "#0A0906",
          muted: "#535250",
          border: "#DADAD9",
          soft: "#E7EBEF",
        },
      },
      boxShadow: {
        soft: "0 12px 32px rgba(15, 58, 102, 0.08)",
        card: "0 18px 45px rgba(15, 58, 102, 0.10)",
      },
      borderRadius: {
        card: "1.25rem",
        button: "0.875rem",
      },
    },
  },
};