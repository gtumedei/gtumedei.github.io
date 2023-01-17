import Node from "@astrojs/node"
import Sitemap from "@astrojs/sitemap"
import Solid from "@astrojs/solid-js"
import Tailwind from "@astrojs/tailwind"
import Vercel from "@astrojs/vercel/serverless"
import { defineConfig } from "astro/config"
import Icons from "unplugin-icons/vite"
import InlineCssModules from "vite-plugin-inline-css-modules"

const site = "https://gtumedei.io"

export default defineConfig({
  output: "server",
  adapter: process.env.ASTRO_ADAPTER == "node"
    ? Node({ mode: "standalone" })
    : Vercel(),
  site,
  integrations: [
    Sitemap({
      customPages: [
        `${site}`,
        `${site}/tech`,
        `${site}/contact`,
        `${site}/games`,
        `${site}/games/color-guesser`
      ]
    }),
    Solid(),
    Tailwind()
  ],
  vite: {
    plugins: [
      Icons({
        compiler: "solid",
        defaultClass: "icon"
      }),
      InlineCssModules()
    ]
  }
})
