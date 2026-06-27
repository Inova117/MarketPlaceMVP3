/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Brand — refined indigo / violet
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Accent — warm amber / gold (CTAs, ratings, highlights)
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Semantic tokens (driven by CSS variables — dark mode ready)
        background: 'hsl(var(--background))',
        surface: 'hsl(var(--surface))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        success: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
          subtle: '#d1fae5',
        },
        warning: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
          subtle: '#fef3c7',
        },
        danger: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
          subtle: '#fee2e2',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(16 24 40 / 0.04)',
        soft: '0 2px 8px -2px rgb(16 24 40 / 0.06), 0 4px 16px -4px rgb(16 24 40 / 0.06)',
        card: '0 1px 3px 0 rgb(16 24 40 / 0.06), 0 8px 24px -12px rgb(16 24 40 / 0.10)',
        lifted: '0 12px 32px -8px rgb(16 24 40 / 0.16), 0 4px 12px -4px rgb(16 24 40 / 0.08)',
        glow: '0 10px 30px -8px rgb(79 70 229 / 0.45)',
        'glow-accent': '0 10px 30px -8px rgb(245 158 11 / 0.45)',
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #c026d3 100%)',
        'brand-gradient-soft':
          'linear-gradient(135deg, #eef2ff 0%, #faf5ff 50%, #fdf4ff 100%)',
        'mesh':
          'radial-gradient(at 0% 0%, rgb(99 102 241 / 0.12) 0px, transparent 50%), radial-gradient(at 100% 0%, rgb(192 38 211 / 0.10) 0px, transparent 50%), radial-gradient(at 50% 100%, rgb(245 158 11 / 0.08) 0px, transparent 50%)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '70%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
