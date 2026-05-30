/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        game: ['"Press Start 2P"', 'cursive'],
        body: ['"Rajdhani"', 'sans-serif'],
      },
      colors: {
        quest: {
          gold: '#FFD700',
          silver: '#C0C0C0',
          bronze: '#CD7F32',
          xp: '#00FF88',
          hp: '#FF4455',
          mana: '#4488FF',
          dark: '#0D0D1A',
          darker: '#07070F',
          panel: '#12122A',
          border: '#2A2A5A',
          glow: '#6644FF',
        }
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'bounce-subtle': 'bounceSub 1s ease infinite',
        'xp-gain': 'xpGain 0.6s ease-out forwards',
        'check-pop': 'checkPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'streak-fire': 'streakFire 1s ease-in-out infinite alternate',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(102, 68, 255, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(102, 68, 255, 0.9), 0 0 60px rgba(102, 68, 255, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        bounceSub: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        xpGain: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scale(1.5)' },
        },
        checkPop: {
          '0%': { transform: 'scale(0) rotate(-45deg)', opacity: '0' },
          '60%': { transform: 'scale(1.3) rotate(5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        streakFire: {
          '0%': { textShadow: '0 0 10px #FF6600, 0 0 20px #FF3300' },
          '100%': { textShadow: '0 0 20px #FFAA00, 0 0 40px #FF6600, 0 0 60px #FF3300' },
        }
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(102,68,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(102,68,255,0.05) 1px, transparent 1px)',
        'hero-gradient': 'linear-gradient(135deg, #0D0D1A 0%, #1A1A3E 50%, #0D0D1A 100%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      }
    },
  },
  plugins: [],
}
