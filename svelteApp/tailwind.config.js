/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/lib/*",
    // "./src/*/.{js,ts,jsx,tsx,svelte}",
    "./src/**/*.{js,ts,jsx,tsx,svelte}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

