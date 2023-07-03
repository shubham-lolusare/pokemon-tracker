/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      md: { max: "1250px" },
      sm: { max: "912px" },
      mobile: { max: "550px" },
      xs: { max: "300px" },
      tall: { raw: "(max-height: 740px)" },
    },
    extend: {
      animation: {
        loading: "loading 1s infinite linear",
        fadein: "fadein 1s linear",
      },
      keyframes: {
        loading: {
          "0%,100%": { transform: "rotate(-45deg)" },
          "50%": { transform: "rotate(45deg)" },
        },
        fadein: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.2" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
