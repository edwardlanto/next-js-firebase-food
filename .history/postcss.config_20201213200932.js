module.exports = {
  purge: {
    content: ['./src/**/*.html'],

    // These options are passed through directly to PurgeCSS
    options: {
      safelist: ['bg-red-500', 'px-4'],
    }
  },
  plugins: ['tailwindcss', 'postcss-preset-env'],
};
