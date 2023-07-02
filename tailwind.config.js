/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        'primary-blue': "#023047",
        'list-background': "#fffa"
      },
    },
  },
  plugins: [
    require('autoprefixer')
  ],
}
