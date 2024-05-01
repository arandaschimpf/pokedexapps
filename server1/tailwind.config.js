// En tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,ts,astro}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// En postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
