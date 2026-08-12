/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      // Preset Relume замінює всю шкалу maxWidth власною (xxs…xxl), через що
      // стандартні класи Tailwind max-w-2xl…max-w-7xl не генеруються взагалі
      // і мовчки нічого не роблять — а їх у проєкті 67 штук. Повертаємо саме
      // відсутні значення: ті, що вже є в preset (xs, sm, md, lg, xl, xxl),
      // лишаються зі значеннями Relume, щоб не зсунути наявну верстку.
      maxWidth: {
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      },
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