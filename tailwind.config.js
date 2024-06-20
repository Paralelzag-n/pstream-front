/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#9747FC",
        red: "#FC4747",
        white: "#FFFFFF",
        "darkest-blue": "rgb(8,11,16)",
        "dark-blue": "rgb(16,20,30)",
        "grayish-blue": "#5A698F",
        "semi-dark-blue": "#161D2F",
        unfocused: "#c8c8c8",
      },
      height: {
        slideshow: "65vh",
      },
      backgroundImage: {
        "black-to-transparent":
          "linear-gradient(to top, rgba(0,0,0, 0.8), transparent)",
        "black-to-transparent-horizontal":
          "linear-gradient(to right, rgba(0,0,0, 0.8), transparent)",
      },
    },
  },
  plugins: [],
};
