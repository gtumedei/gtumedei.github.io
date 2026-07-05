import ContentCollections from "@content-collections/vinxi"
import { defineConfig } from "@solidjs/start/config"
import Tailwind from "@tailwindcss/vite"
import Icons from "unplugin-icons/vite"
import ContentIcons from "./src/lib/content-icons/plugin"

export default defineConfig({
  server: {
    prerender: {
      routes: ["/", "/contact", "/minigames", "/projects", "/tech"],
    },
  },
  vite: {
    envPrefix: "PUBLIC_",
    plugins: [ContentIcons(), Icons({ compiler: "solid" }), Tailwind(), ContentCollections()],
  },
})
