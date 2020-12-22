// tailwind.config.js
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.tsx',
    './src/**/*.ts',
  ],
  theme: {},
  variants: {},
  plugins: ['tailwindcss', 'postcss-preset-env']
}