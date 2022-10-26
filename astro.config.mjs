import { defineConfig } from "astro/config"
import Solid from "@astrojs/solid-js"
import Icons from "unplugin-icons/vite"
import Tailwind from "@astrojs/tailwind"

export default defineConfig({
  integrations: [
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
