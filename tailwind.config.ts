import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#41aff4', // phần trên cùng 
          light: '#4b5cef',   // nút tìm kiếm 
          dark: '#4d00f3',   // nút tìm kiếm sau khi di chuột vào
          50: '#a8bbf1',
          100: '#c4cdf1',
        },
        'accent-red': '#2100f5', // hover nút
        accent: {
          red: '#ff3f3f',  // mấy chữ nhỏ như 
          orange: '#f48907',
          pink: '#b6e9ff',
          coral: '#c8d2ff',
        },
        text: {
          dark: '#333333', // màu chữ
          gray: '#666666',
        },
        background: {
          light: '#d9e4fa',     // Light pastel pink for light mode
          white: '#FFFFFF',
          pink: '#cad5f3',      // Slightly lighter pink
        },
        // Dark mode specific colors
        dark: {
          bg: '#0f172a',        // slate-900
          card: '#1e293b',      // slate-800
          border: '#334155',    // slate-700
          text: '#f1f5f9',      // slate-100
          muted: '#94a3b8',     // slate-400
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '1.5rem',
          xl: '2rem',
        },
      },
      // Animation for dark mode transition
      transitionProperty: {
        'colors-shadow': 'color, background-color, border-color, box-shadow',
      },
    },
  },
  plugins: [],
}
export default config
