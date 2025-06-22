/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.2 },
        },
      },
      animation: {
        twinkle: 'twinkle 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};