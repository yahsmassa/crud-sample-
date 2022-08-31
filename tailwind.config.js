module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [/bg-/, /to-/, /from-/, /text-/],
  theme: {
    extend: {
      //https://tailwindcss.com/docs/font-family#customizing-your-theme
      fontFamily: {
        myfont: ["Arial Black,Noto Sans Myanmar, Muna , Roboto Condensed"],
      },
    },
  },
  plugins: [],
};
