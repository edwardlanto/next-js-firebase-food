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