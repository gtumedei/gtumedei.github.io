import contentCollections from "@content-collections/vite"
import { solidStart } from "@solidjs/start/config"
import tailwind from "@tailwindcss/vite"
import { nitro } from "nitro/vite"
import icons from "unplugin-icons/vite"
import { defineConfig } from "vite"
import contentIcons from "./src/lib/content-icons/plugin"

export default defineConfig({
  plugins: [
    solidStart({ devOverlay: false }),
    nitro(),
    contentIcons(),
    icons({ compiler: "solid" }),
    tailwind(),
    contentCollections(),
  ],
  nitro: {
    prerender: {
      routes: ["/", "/achievements", "/components", "/contact", "/minigames", "/projects", "/tech"],
    },
  },
  envPrefix: "PUBLIC_",
})
