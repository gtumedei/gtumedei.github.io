import { defineConfig } from "windicss/helpers"
import aspectRatio from "windicss/plugin/aspect-ratio"

export default defineConfig({
  darkMode: "class",
  theme: {

    fontFamily: {
      sans: ["Lato", "sans-serif"],
      mono: ["'Fira Code'", "mono"]
    },

    extend: {

      colors: {
        "light-primary": {
          DEFAULT: "var(--color-light-primary)",
          dark: "var(--color-light-primary-dark)"
        },
        "dark-primary": {
          DEFAULT: "var(--color-dark-primary)",
          dark: "var(--color-dark-primary-dark)"
        },

        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)"
        },
        accent: "var(--color-accent)",
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          faded: "var(--color-text-faded)",
          "inverted-primary": "var(--color-text-inverted-primary)",
          "inverted-secondary": "var(--color-text-inverted-secondary)",
          "inverted-faded": "var(--color-text-inverted-faded)",
          "primary-light": "var(--color-text-primary-light)",
          "secondary-light": "var(--color-text-secondary-light)",
          "faded-light": "var(--color-text-faded-light)",
          "primary-dark": "var(--color-text-primary-dark)",
          "secondary-dark": "var(--color-text-secondary-dark)",
          "faded-dark": "var(--color-text-faded-dark)",
        },

        // Remove
        "accent-blue": {
          light: "var(--color-accent-blue-light)",
          dark: "var(--color-accent-blue-dark)"
        },
        "accent-teal": {
          light: "var(--color-accent-teal-light)",
          dark: "var(--color-accent-teal-dark)"
        },
        "accent-orange": {
          light: "var(--color-accent-orange-light)",
          dark: "var(--color-accent-orange-dark)"
        },
        "accent-pink": {
          light: "var(--color-accent-pink-light)",
          dark: "var(--color-accent-pink-dark)"
        }
      },

      textColor: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        faded: "var(--color-text-faded)",
        "inverted-primary": "var(--color-text-inverted-primary)",
        "inverted-secondary": "var(--color-text-inverted-secondary)",
        "inverted-faded": "var(--color-text-inverted-faded)",
        "primary-light": "var(--color-text-primary-light)",
        "secondary-light": "var(--color-text-secondary-light)",
        "faded-light": "var(--color-text-faded-light)",
        "primary-dark": "var(--color-text-primary-dark)",
        "secondary-dark": "var(--color-text-secondary-dark)",
        "faded-dark": "var(--color-text-faded-dark)",
      },

      boxShadow: {
        btn: "0 1px 3px var(--color-accent)",
        "btn-hover": "0 4px 8px var(--color-accent)"
      }
    }
  },
  plugins: [
    aspectRatio
  ]
})
