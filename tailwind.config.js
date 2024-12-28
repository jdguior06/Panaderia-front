import forms from '@tailwindcss/forms';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Menlo', 'monospace'],
        cursive: ['Brush Script MT', 'cursive'],
      },
      colors: {
        primary: '#FF5733', // Color primario
        button: '#1677FF',   // Color de botones
      },
    },
  },
  plugins: [
    forms,
  ],
}