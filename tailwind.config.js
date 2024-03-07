/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
      },
      colors: {
        primary: "#994279",
        onPrimary: "#F5ECF2",
        primaryContainer: "#2C1323",
        onPrimaryContainer: "#E0C6D7",
        secondary: "#117E45",
        onSecondary: "#E7F2EC",
        secondaryContainer: "#03140B",
        onSecondaryContainer: "#B8D8C7",
        tertiary: "#0E05A1",
        onTertiary: "#F3F2FA",
        tertiaryContainer: "#030014",
        onTertiaryContainer: "#DBD9F1",
        background: "#FDFBFC",
        error: "#FF4040",
        success: "#117E45",
        gray: { DEFAULT: "#999798", light: "#E9E8E9", dark: "#4D494C" },
      },
      animation: {
        slidein: "slidein 0.3s ease-in-out",
      },
      keyframes: {
        slidein: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
};
