/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pale-yellow': '#FFF4B5',
        'mauve': '#B19CD9',
        'dark-orange': '#D96846',
        'off-white': '#FFFEF7',
        'deep-black': '#1A1A1A',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px rgba(26, 26, 26, 1)',
        'brutal-hover': '6px 6px 0px 0px rgba(26, 26, 26, 1)',
        'brutal-active': '2px 2px 0px 0px rgba(26, 26, 26, 1)',
        'brutal-lg': '8px 8px 0px 0px rgba(26, 26, 26, 0.2)',
        'brutal-xl': '12px 12px 0px 0px rgba(26, 26, 26, 0.15)',
        'brutal-mauve': '4px 4px 0px 0px rgba(177, 156, 217, 0.6)',
      },
      borderRadius: {
        'brutal': '12px',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
      keyframes: {
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'spin-thick': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'slide-up': 'slide-up 0.4s ease-out',
        'spin-thick': 'spin-thick 1s linear infinite',
      },
    },
  },
  plugins: [],
};
