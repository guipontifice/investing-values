/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans'],
        roboto: ['Roboto', 'serif'],
        playfair: ['Playfair Display', 'serif']
      },
      screens: {
        'xxs': { 'min': '0px', 'max': '374px' }, 
        'xs': { 'min': '375px', 'max': '639px' },
        'sm': { 'min': '640px', 'max': '767px' },
        // => @media (min-width: 640px and max-width: 767px) { ... }

        'md': { 'min': '768px', 'max': '1023px' },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        'lg': { 'min': '1024px', 'max': '1279px' },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }

        'xl': { 'min': '1280px', 'max': '1535px' },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }

        '2xl': { 'min': '1536px' },
        // => @media (min-width: 1536px) { ... }
      },
    },
    colors: {
      "white": "#ffffff",
      "gray": "#a6a6a6",
      "purple": "#17162E",
      "purple-shadow": "#100f20",
      "light-purple": "#201e3f",
      "light-gray": "#c9c9c9",
      "red": "#ff0f0f",
    },
  },

  plugins: [],
}
