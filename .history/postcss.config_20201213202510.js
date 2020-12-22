// tailwind.config.js
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './src/**/*.tsx',
    './src/**/*.ts',
  ],
  theme: {},
  variants: {},
  plugins: ['tailwindcss', 'postcss-preset-env']
}