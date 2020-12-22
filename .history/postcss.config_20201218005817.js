// tailwind.config.js
module.exports = {
  purge: [
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.tsx',
    './src/**/*.ts',
  ],
  plugins: ['tailwindcss', 'postcss-preset-env']
}