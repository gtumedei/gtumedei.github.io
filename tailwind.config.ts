import { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const toSingleLine = (string: string) => string.replaceAll("\n", " ").replace(/\s+/g, " ").trim()

const apply = (classes: TemplateStringsArray) => ({
  [`@apply ${toSingleLine(classes[0]!)}`]: {},
})

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      serif: ["'DM Serif Display'", "serif"],
      mono: ["'Fira Code'", "mono"],
    },
    extend: {
      colors: {
        "base-100": "rgb(var(--color-base-100) / <alpha-value>)",
        "base-200": "rgb(var(--color-base-200) / <alpha-value>)",
        "on-base": "rgb(var(--color-on-base) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        // Same as above, but inverted (i.e. dark theme has a dark base color, but a light inverted color)
        "inverted-100": "rgb(var(--color-inverted-100) / <alpha-value>)",
        "inverted-200": "rgb(var(--color-inverted-200) / <alpha-value>)",
        "on-inverted": "rgb(var(--color-on-inverted) / <alpha-value>)",
      },
      borderColor: {
        DEFAULT: "rgb(var(--color-on-base) / 0.1)",
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
    plugin(({ addBase, addComponents, addUtilities }) => {
      addBase({
        ":root": {
          "--color-neutral-100": "255 255 255",
          "--color-neutral-200": "247 247 247",
          "--color-neutral-700": "48 48 48",
          "--color-neutral-800": "38 38 38",
          "--color-blue-200": "79 195 247",
          "--color-blue-500": "0 145 234",
          "--color-orange-200": "239 154 154",
          "--color-orange-500": "255 138 101",
          "--color-teal-200": "100 255 218",
          "--color-teal-500": "0 191 165",
          "--color-pink-200": "249 168 212",
          "--color-pink-500": "236 64 122",
          "--color-black": "0 0 0",
          "--color-white": "255 255 255",
        },
        ".base-light": {
          "--color-base-100": "var(--color-neutral-100)",
          "--color-base-200": "var(--color-neutral-200)",
          "--color-on-base": "var(--color-black)",
          "--color-inverted-100": "var(--color-neutral-800)",
          "--color-inverted-200": "var(--color-neutral-700)",
          "--color-on-inverted": "var(--color-white)",
          "--color-blue": "var(--color-blue-500)",
          "--color-orange": "var(--color-orange-500)",
          "--color-teal": "var(--color-teal-500)",
          "--color-pink": "var(--color-pink-500)",
        },
        ".base-dark": {
          "--color-base-100": "var(--color-neutral-800)",
          "--color-base-200": "var(--color-neutral-700)",
          "--color-on-base": "var(--color-white)",
          "--color-inverted-100": "var(--color-neutral-100)",
          "--color-inverted-200": "var(--color-neutral-200)",
          "--color-on-inverted": "var(--color-black)",
          "--color-blue": "var(--color-blue-200)",
          "--color-orange": "var(--color-orange-200)",
          "--color-teal": "var(--color-teal-200)",
          "--color-pink": "var(--color-pink-200)",
        },
        html: apply`base-light bg-base-100 text-on-base`,
        "@media (prefers-color-scheme: dark)": {
          "html:not([data-theme='light'])": {
            ...apply`base-dark`,
            "color-scheme": "dark",
          },
        },
        "[data-theme='light']": {
          ...apply`base-light`,
          "color-scheme": "light",
        },
        "[data-theme='dark']": {
          ...apply`base-dark`,
          "color-scheme": "dark",
        },
        "[data-accent='blue']": {
          "--color-accent": "var(--color-blue)",
        },
        "[data-accent='orange']": {
          "--color-accent": "var(--color-orange)",
        },
        "[data-accent='teal']": {
          "--color-accent": "var(--color-teal)",
        },
        "[data-accent='pink']": {
          "--color-accent": "var(--color-pink)",
        },
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
      addComponents({
        // Links
        ".link": apply`text-accent hover:underline focus:outline-accent`,

        // Buttons
        ".btn": {
          ...apply`px-8 py-3 rounded-lg outline-none inline-flex justify-center items-center gap-3 border border-transparent text-sm font-bold text-on-base bg-base-100 fill-on-base transition-all`,
          "&:disabled": {
            ...apply`!shadow-none cursor-not-allowed`,
            "&:not(.loading)": apply`opacity-40`,
          },
          ".icon": apply`text-base text-on-base`,
        },
        ".btn-accent": {
          ...apply`text-on-inverted bg-accent hover:shadow-xl hover:shadow-accent/20 focus:shadow-xl focus:shadow-accent/20 active:shadow-lg active:shadow-accent/20`,
          "&:not(.loading):disabled": apply`bg-inverted-100`,
          ".icon": apply`text-on-inverted`,
        },
        ".btn-outline": apply`border-on-base/10 text-accent bg-transparent hover:bg-accent/10 hover:border-accent focus:bg-accent/10 focus:border-accent active:bg-accent/20 active:border-accent`,
        ".btn-transparent": apply`bg-transparent hover:bg-on-base/10 focus:bg-on-base/10 active:bg-on-base/15`,
        ".btn-icon": {
          ...apply`p-3 bg-transparent`,
          "&:not(:disabled)": apply`hover:bg-accent/10 hover:text-accent hover:fill-accent focus:bg-accent/10 focus:text-accent focus:fill-accent active:bg-accent/20 active:text-accent active:fill-accent`,
          ".icon": apply`text-[revert] fill-[revert]`,
        },

        // Form elements
        ".fieldset": {
          ...apply`relative flex flex-col`,
          ".label": apply`text-sm font-bold ml-1 mb-1`,
          "& > .icon": apply`absolute bottom-[7px] left-[7px] bg-base-200 h-9 w-9 p-2 rounded-lg pointer-events-none transition-colors`,
          "&:hover, &:focus-within": {
            "& > .icon": apply`bg-accent/10 text-accent`,
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
        ".badge": apply`text-xs font-bold uppercase tracking-wide text-on-inverted bg-accent rounded-full px-3 py-1`,
      })
    }),
  ],
} satisfies Config
