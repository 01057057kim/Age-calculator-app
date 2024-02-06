/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        'purple':'hsl(259, 100%, 65%)',
        'l-red' : 'hsl(0, 100%, 67%)',
        'o-white' : 'hsl(0, 0%, 94%)',
        'l-grey' : 'hsl(0, 0%, 86%)',
        's-grey' : 'hsl(0, 1%, 44%)',
        'o-black' : 'hsl(0, 0%, 8%)',
      },
      fontFamily:
      {
        'poppins' :'Poppins, sans-serif'
      }
    },
  },
  plugins: [],
}
