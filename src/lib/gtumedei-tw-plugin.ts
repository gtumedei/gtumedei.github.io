import plugin from "tailwindcss/plugin"

const toSingleLine = (string: string) => string.replaceAll("\n", " ").replace(/\s+/g, " ").trim()

export const apply = (classes: TemplateStringsArray) => ({
  [`@apply ${toSingleLine(classes[0]!)}`]: {},
})

const hexToRgbChannels = (hex: string) => {
  const expandedHex =
    hex.length == 4 ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex
  const r = parseInt(expandedHex.slice(1, 3), 16)
  const g = parseInt(expandedHex.slice(3, 5), 16)
  const b = parseInt(expandedHex.slice(5, 7), 16)
  return `${r} ${g} ${b}`
}

type ThemeColors = {
  base100: string
  base200: string
  base300: string
  onBase: string
  neutral: string
  onNeutral: string
  blueAccent: string
  orangeAccent: string
  tealAccent: string
  pinkAccent: string
  onAccent: string
  info: string
  onInfo: string
  success: string
  onSuccess: string
  warning: string
  onWarning: string
  error: string
  onError: string
}

type PluginOptions = {
  theme: {
    light: ThemeColors
    dark: ThemeColors
  }
}

const Gtumedei = ({ theme }: PluginOptions) =>
  plugin(
    ({ addBase, addUtilities }) => {
      addBase({
        ".theme-light": {
          "--color-accent-blue": hexToRgbChannels(theme.light.blueAccent),
          "--color-accent-orange": hexToRgbChannels(theme.light.orangeAccent),
          "--color-accent-teal": hexToRgbChannels(theme.light.tealAccent),
          "--color-accent-pink": hexToRgbChannels(theme.light.pinkAccent),
          "--color-on-accent": hexToRgbChannels(theme.light.onAccent),
          "--color-neutral": hexToRgbChannels(theme.light.neutral),
          "--color-on-neutral": hexToRgbChannels(theme.light.onNeutral),
          "--color-base-100": hexToRgbChannels(theme.light.base100),
          "--color-base-200": hexToRgbChannels(theme.light.base200),
          "--color-base-300": hexToRgbChannels(theme.light.base300),
          "--color-on-base": hexToRgbChannels(theme.light.onBase),
          "--color-info": hexToRgbChannels(theme.light.info),
          "--color-on-info": hexToRgbChannels(theme.light.onInfo),
          "--color-success": hexToRgbChannels(theme.light.success),
          "--color-on-success": hexToRgbChannels(theme.light.onSuccess),
          "--color-warning": hexToRgbChannels(theme.light.warning),
          "--color-on-warning": hexToRgbChannels(theme.light.onWarning),
          "--color-error": hexToRgbChannels(theme.light.error),
          "--color-on-error": hexToRgbChannels(theme.light.onError),
        },
        ".theme-dark": {
          "--color-accent-blue": hexToRgbChannels(theme.dark.blueAccent),
          "--color-accent-orange": hexToRgbChannels(theme.dark.orangeAccent),
          "--color-accent-teal": hexToRgbChannels(theme.dark.tealAccent),
          "--color-accent-pink": hexToRgbChannels(theme.dark.pinkAccent),
          "--color-on-accent": hexToRgbChannels(theme.dark.onAccent),
          "--color-neutral": hexToRgbChannels(theme.dark.neutral),
          "--color-on-neutral": hexToRgbChannels(theme.dark.onNeutral),
          "--color-base-100": hexToRgbChannels(theme.dark.base100),
          "--color-base-200": hexToRgbChannels(theme.dark.base200),
          "--color-base-300": hexToRgbChannels(theme.dark.base300),
          "--color-on-base": hexToRgbChannels(theme.dark.onBase),
          "--color-info": hexToRgbChannels(theme.dark.info),
          "--color-on-info": hexToRgbChannels(theme.dark.onInfo),
          "--color-success": hexToRgbChannels(theme.dark.success),
          "--color-on-success": hexToRgbChannels(theme.dark.onSuccess),
          "--color-warning": hexToRgbChannels(theme.dark.warning),
          "--color-on-warning": hexToRgbChannels(theme.dark.onWarning),
          "--color-error": hexToRgbChannels(theme.dark.error),
          "--color-on-error": hexToRgbChannels(theme.dark.onError),
        },
        html: apply`theme-light bg-base-100 text-on-base`,
        '[data-theme="dark"]': {
          ...apply`theme-dark`,
          "color-scheme": "dark",
        },
        "@media (prefers-color-scheme: dark)": {
          'html:not([data-theme="light"])': {
            ...apply`theme-dark`,
            "color-scheme": "dark",
          },
        },
        ":root, [data-accent='blue']": {
          "--color-accent": "var(--color-accent-blue)",
        },
        "[data-accent='orange']": {
          "--color-accent": "var(--color-accent-orange)",
        },
        "[data-accent='teal']": {
          "--color-accent": "var(--color-accent-teal)",
        },
        "[data-accent='pink']": {
          "--color-accent": "var(--color-accent-pink)",
        },
        ".theme-dark .prose, .theme-dark.prose": apply`prose-invert`,
        "*": apply`outline-offset-1 outline-accent/20`,
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
        // Hide scrollbar, but keep overflow auto
        ".no-scrollbars": {
          "scrollbar-width": "none", // Firefox
          "-ms-overflow-style": "none", // IE 10+
        },
        ".no-scrollbars::-webkit-scrollbar": {
          background: "transparent", // Chrome, Safari, Webkit
          height: "0px",
          width: "0px",
        },
        // Taller line height
        ".tall-lines": apply`[line-height:1.8em]`,
      })
    },
    {
      darkMode: [
        "variant",
        [
          `@media (prefers-color-scheme: dark) { &:not([data-theme="light"] *) }`,
          `&:is([data-theme="dark"] *)`,
        ],
      ],
      theme: {
        extend: {
          colors: {
            "blue-accent": "rgb(var(--color-accent-blue) / <alpha-value>)",
            "orange-accent": "rgb(var(--color-accent-orange) / <alpha-value>)",
            "teal-accent": "rgb(var(--color-accent-teal) / <alpha-value>)",
            "pink-accent": "rgb(var(--color-accent-pink) / <alpha-value>)",
            accent: "rgb(var(--color-accent) / <alpha-value>)",
            "on-accent": "rgb(var(--color-on-accent) / <alpha-value>)",
            neutral: "rgb(var(--color-neutral) / <alpha-value>)",
            "on-neutral": "rgb(var(--color-on-neutral) / <alpha-value>)",
            "base-100": "rgb(var(--color-base-100) / <alpha-value>)",
            "base-200": "rgb(var(--color-base-200) / <alpha-value>)",
            "base-300": "rgb(var(--color-base-300) / <alpha-value>)",
            "on-base": "rgb(var(--color-on-base) / <alpha-value>)",
            info: "rgb(var(--color-info) / <alpha-value>)",
            "on-info": "rgb(var(--color-on-info) / <alpha-value>)",
            success: "rgb(var(--color-success) / <alpha-value>)",
            "on-success": "rgb(var(--color-on-success) / <alpha-value>)",
            warning: "rgb(var(--color-warning) / <alpha-value>)",
            "on-warning": "rgb(var(--color-on-warning) / <alpha-value>)",
            error: "rgb(var(--color-error) / <alpha-value>)",
            "on-error": "rgb(var(--color-on-error) / <alpha-value>)",
          },
          animation: {
            "slide-down": "slideDown 250ms ease-out",
            "slide-up": "slideUp 200ms ease-out",
          },
          keyframes: {
            slideDown: {
              from: { height: "0" },
              to: { height: "var(--height)" },
            },
            slideUp: {
              from: { height: "var(--height)" },
              to: { height: "0" },
            },
          },
        },
      },
    }
  )

export default Gtumedei
