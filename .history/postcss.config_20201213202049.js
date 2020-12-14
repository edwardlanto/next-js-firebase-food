module.exports = {
  purge: [
    "./pages/**/*.vue", 
    "./components/**/*.vue", 
    "./plugins/**/*.vue",
    "./static/**/*.vue",
    "./store/**/*.vue"
  ],
  theme: {},
  variants: {},
  plugins: ['tailwindcss', 'postcss-preset-env'],
};

module.exports = {
  purge: {
    content: ['./src/**/*.html'],

    // These options are passed through directly to PurgeCSS
    options: {
      safelist: ['bg-red-500', 'px-4'],
    }
  },

};
