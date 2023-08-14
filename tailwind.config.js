/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/index.html'],
  purge: [
    './src/pages/**/*.{js,jsx,ts,tsx}', // Add the folder(s) for other components here
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
     
      // Add your custom theme configurations here, if any
    },
  },
  plugins: [
    // Add your custom plugins here, if any
  ],
};