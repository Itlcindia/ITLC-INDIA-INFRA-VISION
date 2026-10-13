/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#050C1E', // High-Contrast Deep Midnight Navy (Option B)
          void: '#030714',    // Oceanic Midnight Deep Base
          surface: '#0E1F47', // Elevated Frost Navy Surface
          card: '#0C1B3E',    // Luminous Frost Panel
        },
        titanium: {
          DEFAULT: '#0B1736',
          border: 'rgba(56, 189, 248, 0.35)',
          highlight: 'rgba(56, 189, 248, 0.55)',
        },
        brand: {
          amber: '#38BDF8', // Replaced yellow with Luminous Sky Blue
          gold: '#60A5FA',  // Replaced gold with Vibrant Electric Blue
          cyan: '#38BDF8',
          blue: '#2563EB',
          cobalt: '#1D4ED8',
          sky: '#38BDF8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Outfit', 'sans-serif'],
      },
      animation: {
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        'radar': 'radar 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'radar': {
          '75%, 100%': {
            transform: 'scale(2.5)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
}
