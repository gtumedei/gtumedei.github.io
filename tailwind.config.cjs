/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  corePlugins: {
    textOpacity: false
  },
  theme: {
    fontFamily: {
      serif: ["'DM Serif Display'", "serif"],
      mono: ["'Fira Code'", "mono"]
    },

    extend: {
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

        // Dynamic primary colors based on theme
        primary: {
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)"
        },

        accent: {
          DEFAULT: "var(--color-accent)",
          20: "var(--color-accent-20)",
          10: "var(--color-accent-10)"
        },

        // Dynamic neutral colors based on theme
        neutral: {
          DEFAULT: "var(--color-neutral-100)",
          100: "var(--color-neutral-100)",
          70: "var(--color-neutral-70)",
          40: "var(--color-neutral-40)",
          12: "var(--color-neutral-12)",
          8: "var(--color-neutral-8)"
        },

        // The current theme's neutral colors, but inverted
        inverted: {
          primary: {
            DEFAULT: "var(--color-inverted-primary)",
            dark: "var(--color-inverted-primary-dark)"
          },

          neutral: {
            DEFAULT: "var(--color-inverted-neutral-100)",
            100: "var(--color-inverted-neutral-100)",
            70: "var(--color-inverted-neutral-70)",
            40: "var(--color-inverted-neutral-40)",
            12: "var(--color-inverted-neutral-12)",
            8: "var(--color-inverted-neutral-8)"
          }
        },
      },

      transitionDuration: {
        DEFAULT: "400ms"
      },

      fontSize: {
        "12xl": ["12rem", 1]
      },

      spacing: {
        18: "4.5rem"
      }
    }
  },
  plugins: []
}
