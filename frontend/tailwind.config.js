/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      "pirmary":"0141414",
      "blue":"#3575E2",
      "black":"#000",
       "wht":"#FFFFFF",
       "gray":" #808080",
       "red":"#FF0000",
       "dark-blue":"#00008b",
       'custom-blue': '#1E40AF',
       'custom-gray': '#6B7280',
       'custom-yellow': '#FBBF24',
       'custom-pink': '#EC4899',
       'custom-blue-dark': '#1D4ED8',
       'custom-gray-light': '#F3F4F6',
       'custom-gray-dark': '#374151',
       'custom-white': '#FFFFFF',
    }
  },
  plugins: [],
}
