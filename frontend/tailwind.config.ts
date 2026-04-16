import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#121212',
        gold: '#C8A165',
        pearl: '#F7F4EF',
        stone: '#8A8A8D',
        ivory: '#F4EFE7',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 24px 70px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
