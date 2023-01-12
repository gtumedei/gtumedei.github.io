import { defineConfig } from "astro/config"
import Sitemap from "@astrojs/sitemap"
import Solid from "@astrojs/solid-js"
import Icons from "unplugin-icons/vite"
import Tailwind from "@astrojs/tailwind"

export default defineConfig({
  site: "https://gtumedei.io",
  integrations: [
    Sitemap({
      filter: (page) => !page.includes("unreleased_")
    }),
    Solid(),
    Tailwind({
      config: {
        applyBaseStyles: false
      }
    })
  ],
  vite: {
    plugins: [
      Icons({
        compiler: "solid",
        defaultClass: "icon"
      })
    ]
  }
})
