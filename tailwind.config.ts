import { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const toSingleLine = (string: string) => string.replaceAll("\n", " ").replace(/\s+/g, " ").trim()

const apply = (classes: TemplateStringsArray) => ({
  [`@apply ${toSingleLine(classes[0])}`]: {},
})

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  corePlugins: {
    textOpacity: false,
  },
  theme: {
    fontFamily: {
      serif: ["'DM Serif Display'", "serif"],
      mono: ["'Fira Code'", "mono"],
    },

    extend: {
      colors: {
        // White and black with opacity
        white: {
          100: "var(--color-white-100)",
          70: "var(--color-white-70)",
          50: "var(--color-white-50)",
          12: "var(--color-white-12)",
          8: "var(--color-white-8)",
        },

        black: {
          80: "var(--color-black-80)",
          54: "var(--color-black-54)",
          38: "var(--color-black-38)",
          12: "var(--color-black-12)",
          8: "var(--color-black-8)",
        },

        // Dynamic primary colors based on theme
        primary: {
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          DEFAULT: "var(--color-primary)",
          focus: "var(--color-primary-focus)",
        },

        accent: {
          DEFAULT: "var(--color-accent)",
          20: "var(--color-accent-20)",
          10: "var(--color-accent-10)",
        },

        // Dynamic neutral colors based on theme
        neutral: {
          DEFAULT: "var(--color-neutral-100)",
          100: "var(--color-neutral-100)",
          70: "var(--color-neutral-70)",
          40: "var(--color-neutral-40)",
          12: "var(--color-neutral-12)",
          8: "var(--color-neutral-8)",
        },

        // The current theme's neutral colors, but inverted
        inverted: {
          primary: {
            DEFAULT: "var(--color-inverted-primary)",
            focus: "var(--color-inverted-primary-focus)",
          },

          neutral: {
            DEFAULT: "var(--color-inverted-neutral-100)",
            100: "var(--color-inverted-neutral-100)",
            70: "var(--color-inverted-neutral-70)",
            40: "var(--color-inverted-neutral-40)",
            12: "var(--color-inverted-neutral-12)",
            8: "var(--color-inverted-neutral-8)",
          },
        },
      },

      borderColor: {
        DEFAULT: "var(--color-neutral-8)",
      },

      transitionDuration: {
        DEFAULT: "400ms",
      },

      fontSize: {
        "12xl": ["12rem", "1"],
      },

      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [
    plugin(({ addComponents, addUtilities }) => {
      addComponents({
        // Links
        ".link": apply`text-accent hover:underline focus:outline-accent`,

        // Buttons
        ".btn": {
          ...apply`px-8 py-3 rounded-lg outline-none inline-flex justify-center items-center gap-3 border border-transparent text-sm font-bold text-neutral bg-primary fill-neutral-100 transition-all`,
          "&:disabled": {
            ...apply`!shadow-none cursor-not-allowed`,
            "&:not(.loading)": apply`opacity-40`,
          },
          ".icon": apply`text-base`,
        },
        ".btn-accent": {
          ...apply`text-inverted-neutral bg-accent hover:shadow-xl hover:shadow-accent-20 focus:shadow-xl focus:shadow-accent-20 active:shadow-lg active:shadow-accent-20`,
          "&:not(.loading):disabled": apply`bg-inverted-primary`,
        },
        ".btn-outline": apply`border-neutral-8 text-accent bg-transparent hover:bg-accent-10 hover:border-accent focus:bg-accent-10 focus:border-accent active:bg-accent-20 active:border-accent`,
        ".btn-transparent": apply`bg-transparent hover:bg-neutral-8 focus:bg-neutral-8 active:bg-neutral-12`,
        ".btn-icon": {
          ...apply`p-3 bg-transparent`,
          "&:not(:disabled)": apply`hover:bg-accent-10 hover:text-accent hover:fill-accent focus:bg-accent-10 focus:text-accent focus:fill-accent active:bg-accent-20 active:text-accent active:fill-accent`,
        },

        // Form elements
        ".fieldset": {
          ...apply`relative flex flex-col`,
          ".label": apply`text-sm font-bold ml-1 mb-1`,
          "& > .icon": apply`absolute bottom-[7px] left-[7px] bg-primary-focus h-9 w-9 p-2 rounded-lg pointer-events-none transition-colors`,
          "&:hover, &:focus-within": {
            "& > .icon": apply`bg-accent-10 text-accent`,
          },
          ".icon + .input, .icon + .textarea": apply`pl-14`,
        },
        ".input, .textarea": apply`bg-transparent rounded-xl px-4 py-3 outline-none border hover:border-accent focus:border-accent transition-all resize-none`,

        // Typography
        ".section-heading": apply`text-4xl font-bold tracking-wider`,
        ".section-subheading": apply`text-xl font-bold tracking-wider`,

        // Cards
        ".card": apply`rounded-xl border overflow-hidden`,

        // Badges
        ".badge": apply`text-xs font-bold uppercase tracking-wide text-inverted-neutral bg-accent rounded-full px-3 py-1`,
      })

      addUtilities({
        // Absolute positioning
        ".absolute-center": apply`absolute transform top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2`,
        ".absolute-center-x": apply`absolute transform left-[50%] -translate-x-1/2`,
        ".absolute-center-y": apply`absolute transform top-[50%] -translate-y-1/2`,

        // Fixed positioning
        ".fixed-center": apply`fixed transform top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2`,
        ".fixed-center-x": apply`fixed transform left-[50%] -translate-x-1/2`,
        ".fixed-center-y": apply`fixed transform top-[50%] -translate-y-1/2`,

        // Motion base classes
        ".motion-1, .motion-2, .motion-3, .motion-4, .motion-5": {
          opacity: "0",
        },
      })
    }),
  ],
} satisfies Config
