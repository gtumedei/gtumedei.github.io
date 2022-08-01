import { defineConfig } from "windicss/helpers"
import aspectRatioPlugin from "windicss/plugin/aspect-ratio"
import scrollSnapPlugin from "windicss/plugin/scroll-snap"

export default defineConfig({
  darkMode: "class",
  extract: {
    include: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
    exclude: ["node_modules", ".git"],
  },
  corePlugins: {
    textOpacity: false
  },
  theme: {

    fontFamily: {
      serif: ["'DM Serif Display'", "serif"],
      mono: ["'Fira Code'", "mono"]
    },

    extend: {

      cursor: {
        "zoom-in": "zoom-in",
        "zoom-out": "zoom-out"
      },

      textStrokeWidth: {
        md: "0.03em"
      },

      colors: {

        // White and black with opacity
        white: {
          100: "var(--color-white-100)",
          70: "var(--color-white-70)",
          50: "var(--color-white-50)",
          12: "var(--color-white-12)",
          8: "var(--color-white-8)"
        },
        black: {
          80: "var(--color-black-80)",
          54: "var(--color-black-54)",
          38: "var(--color-black-38)",
          12: "var(--color-black-12)",
          8: "var(--color-black-8)"
        },

        // Primary colors
        primary: {
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          // Dynamic primary colors based on theme
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)"
        },

        accent: {
          DEFAULT: "var(--color-accent)",
          20: "var(--color-accent-20)",
          10: "var(--color-accent-10)"
        },

        // Dynamic typography colors based on theme
        typography: {
          base: "var(--color-typography-base)",
          secondary: "var(--color-typography-secondary)",
          faded: "var(--color-typography-faded)",
          icon: "var(--color-typography-icon)",
          divider: "var(--color-typography-divider)",
          hover: "var(--color-typography-hover)"
        },

        // All of the current theme's colors, but inverted
        inverted: {

          primary: {
            DEFAULT: "var(--color-inverted-primary)",
            dark: "var(--color-inverted-primary-dark)"
          },

          typography: {
            base: "var(--color-inverted-typography-base)",
            secondary: "var(--color-inverted-typography-secondary)",
            faded: "var(--color-inverted-typography-faded)",
            icon: "var(--color-inverted-typography-icon)",
            divider: "var(--color-inverted-typography-divider)",
            hover: "var(--color-inverted-typography-hover)"
          }

        },

      },

      textColor: {

        // Dynamic text colors based on theme
        base: "var(--color-typography-base)",
        secondary: "var(--color-typography-secondary)",
        faded: "var(--color-typography-faded)",
        icon: "var(--color-typography-icon)",
        divider: "var(--color-typography-divider)",
        hover: "var(--color-typography-hover)",

        // Dynamic text colors based on theme, but inverted
        inverted: {
          base: "var(--color-inverted-typography-base)",
          secondary: "var(--color-inverted-typography-secondary)",
          faded: "var(--color-inverted-typography-faded)",
          icon: "var(--color-inverted-typography-icon)",
          divider: "var(--color-inverted-typography-divider)",
          hover: "var(--color-inverted-typography-hover)"
        }

      },

      transitionDuration: {
        DEFAULT: "400ms"
      }

    }
  },
  plugins: [aspectRatioPlugin, scrollSnapPlugin]
})
