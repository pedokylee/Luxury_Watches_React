/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.jsx",
    "./resources/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '0.875rem',
        'lg': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'normal': '0.025em',
        'wide': '0.1em',
        'widest': '0.15em',
      },
    },
  },
  plugins: [],
}

