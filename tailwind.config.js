/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: { max: '374px' }, 
      sm: '640px',        
      md: '768px',         
      lg: '1024px',         
      xl: '1280px',        
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        'Almarai': ['Almarai', 'sans-serif'],
        'Rubik': ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}