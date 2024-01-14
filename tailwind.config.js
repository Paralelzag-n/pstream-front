/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#9747FC",
        red: "#FC4747",
        white: "#FFFFFF",
        "dark-blue": "#10141E",
        "grayish-blue": "#5A698F",
        "semi-dark-blue": "#161D2F",
      },
      height: {
        slideshow: '36rem'
      },
      backgroundImage: {
        'black-to-transparent': 'linear-gradient(to top, black, transparent)',
      },
    },
  },
  plugins: [],
};
