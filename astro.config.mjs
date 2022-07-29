import { defineConfig } from "astro/config"
import Solid from "@astrojs/solid-js"
import Icons from "unplugin-icons/vite"
import WindiCSS from "vite-plugin-windicss"

export default defineConfig({
  integrations: [Solid()],
  vite: {
    plugins: [
      WindiCSS(),
      Icons({
        compiler: "solid",
        defaultClass: "icon"
      })
    ]
  }
})
