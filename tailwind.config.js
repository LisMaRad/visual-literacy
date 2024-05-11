/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#5D15FF',
      'white': '#FFFFFF',
      'black': '#000000',
      'accent': '#FFBA00',
    },
    fontFamily: {
      sans: 'Helvetica, sans-serif',
    },
    fontSize: {
      'h1': '8.125rem',
      'h2': '8rem',
      'h3': '5rem',
      'p': '3rem',
      'button': '2.5rem',
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        'full': '100px',
      }
    }
  },
}