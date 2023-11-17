/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '276px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'header': '#0D0D0D',
      'body': '#1A1A1A',
      'containerlogin': '#262626',     
      'todocard': '#2d2d2d',
      'texttodo': '#fff',
      'detail': '#00a873',
      'inputs': '#121214' 
    },
    
    borderRadius: {
      sm: '0.2rem'
    }
  },
  plugins: [],
}

