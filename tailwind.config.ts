import Forms from "@tailwindcss/forms"
import Typography from "@tailwindcss/typography"
import { Config } from "tailwindcss"
import Animate from "tailwindcss-animate"
import Gtumedei from "./src/lib/gtumedei-tw-plugin"
import colors from "tailwindcss/colors"

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      // TODO: remove unused fonts
      sans: ["'Outfit'", "sans-serif"],
      serif: ["'DM Serif Display'", "serif"],
      mono: ["'Fira Code'", "mono"],
    },
    extend: {
      fontSize: {
        "12xl": ["12rem", "1"],
      },
      spacing: {
        18: "4.5rem",
      },
      transitionDuration: {
        DEFAULT: "400ms",
      },
    },
  },
  plugins: [
    Forms,
    Typography,
    Animate,
    Gtumedei({
      theme: {
        light: {
          base100: colors.white,
          base200: colors.gray[50],
          base300: colors.gray[100],
          onBase: colors.gray[800],
          neutral: colors.gray[800],
          onNeutral: colors.white,
          blueAccent: colors.blue[500],
          orangeAccent: colors.orange[500],
          tealAccent: colors.teal[500],
          pinkAccent: colors.pink[500],
          onAccent: colors.white,
          info: colors.sky[500],
          onInfo: colors.white,
          success: colors.emerald[500],
          onSuccess: colors.white,
          warning: colors.amber[500],
          onWarning: colors.white,
          error: colors.rose[500],
          onError: colors.white,
        },
        dark: {
          base100: colors.neutral[900],
          base200: colors.neutral[800],
          base300: colors.neutral[700],
          onBase: colors.white,
          neutral: colors.gray[100],
          onNeutral: colors.gray[800],
          blueAccent: colors.blue[300],
          orangeAccent: colors.orange[300],
          tealAccent: colors.teal[300],
          pinkAccent: colors.pink[300],
          onAccent: colors.black,
          info: colors.sky[300],
          onInfo: colors.sky[800],
          success: colors.emerald[300],
          onSuccess: colors.emerald[800],
          warning: colors.amber[200],
          onWarning: colors.amber[800],
          error: colors.rose[300],
          onError: colors.rose[800],
        },
      },
    }),
  ],
} satisfies Config
