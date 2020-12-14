module.exports = {
  purge: false,

};

// tailwind.config.js
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    './src/**/*.tsx',
  ],
  theme: {},
  variants: {},
  plugins: ['tailwindcss', 'postcss-preset-env']
}