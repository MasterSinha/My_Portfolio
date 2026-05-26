/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:       '#030303',
        surface:  'rgba(255,255,255,0.04)',
        border:   'rgba(255,255,255,0.08)',
        accent:   '#6366f1',
        purple:   '#a855f7',
        cyan:     '#06b6d4',
        text:     '#e2e2e2',
        muted:    '#888888',
        green:    '#22c55e',
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        marquee:   'marquee 28s linear infinite',
        'marquee2':'marquee2 28s linear infinite',
        float:     'float 6s ease-in-out infinite',
        shimmer:   'shimmer 2.5s linear infinite',
        gradient:  'gradient 6s ease infinite',
        pulse2:    'pulse2 2s cubic-bezier(0.4,0,0.6,1) infinite',
        spin3d:    'spin3d 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%':   { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        gradient: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        pulse2: {
          '0%,100%': { opacity: 1 },
          '50%':     { opacity: 0.4 },
        },
        spin3d: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: { xs: '2px' },
      backgroundSize: { '200': '200% 200%' },
    },
  },
  plugins: [],
};
