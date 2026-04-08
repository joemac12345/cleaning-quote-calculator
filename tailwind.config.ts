import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /**
       * COLOR TOKENS
       * Change these values and they automatically apply across all components
       */
      colors: {
        // Primary brand color - used for headings, buttons, interactive elements
        primary: 'var(--color-primary, #48546A)',
        'primary-light': 'var(--color-primary-light, #5a6b7b)',
        'primary-dark': 'var(--color-primary-dark, #3a4052)',

        // Semantic colors
        success: 'var(--color-success, #10b981)',
        warning: 'var(--color-warning, #f59e0b)',
        error: 'var(--color-error, #ef4444)',
        info: 'var(--color-info, #3b82f6)',
      },

      /**
       * FONT FAMILIES
       * References CSS variables from globals.css
       */
      fontFamily: {
        poppins: ['var(--font-poppins)', 'system-ui', '-apple-system', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'system-ui', '-apple-system', 'sans-serif'],
      },

      /**
       * FONT WEIGHT PRESETS
       * H1, H2, H3 weight mappings defined here for consistency
       */
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      /**
       * SPACING TOKENS
       * Standard spacing scale for margins, padding, gaps
       */
      spacing: {
        'section': 'var(--spacing-section, 5rem)', // 80px (20 * 4)
        'section-lg': 'var(--spacing-section-lg, 6rem)', // 96px (24 * 4)
      },

      /**
       * CUSTOM UTILITIES & VARIANTS
       */
      borderRadius: {
        lg: '0.5rem', // 8px - consistent across all components
      },

      /**
       * OPACITY
       * Standard opacity values for hover and disabled states
       */
      opacity: {
        hover: '0.9',
        disabled: '0.5',
      },

      /**
       * BOX SHADOWS
       * Kept minimal - mostly use borders instead of shadows
       */
      boxShadow: {
        none: 'none',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },

      /**
       * LINE HEIGHT
       * Tight, consistent line height across headings and body
       */
      lineHeight: {
        tight: '1.2',
        normal: '1.5',
        relaxed: '1.75',
      },
    },
  },
  plugins: [],
};

export default config;
