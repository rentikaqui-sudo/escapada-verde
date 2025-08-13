
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'verde-suave': '#7fb069',
        'verde-oscuro': '#588157',
        'tierra': '#a68a64',
        'crema': '#f4f1de',
        'blanco-calido': '#fefefe',
        'gris-suave': '#6c757d',
      },
      fontFamily: {
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      aspectRatio: {
        '2/3': '2 / 3',
        '3/2': '3 / 2',
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [],
}
export default config
