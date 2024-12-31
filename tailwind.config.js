/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          900: '#0a0b1e',
          800: '#141537',
          700: '#1e1f50',
          600: '#282969',
          500: '#323382'
        },
        electric: {
          DEFAULT: '#00f0ff',
          50: '#e6fdff',
          100: '#ccfbff',
          200: '#99f8ff',
          300: '#66f4ff',
          400: '#33f2ff',
          500: '#00f0ff'
        },
        cyber: {
          white: '#f0f7ff'
        }
      },
      boxShadow: {
        neon: '0 0 15px rgba(0, 240, 255, 0.3)',
        'neon-hover': '0 0 20px rgba(0, 240, 255, 0.5)',
        'neon-focus': '0 0 25px rgba(0, 240, 255, 0.7)'
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(0, 240, 255, 0.5)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: []
};