import { defineConfig } from "@solidjs/start/config"
import Icons from "unplugin-icons/vite"
import Tailwind from "@tailwindcss/vite"

export default defineConfig({
  server: {
    prerender: {
      routes: ["/", "/contact", "/minigames", "/projects", "/tech"],
    },
  },
  vite: {
    envPrefix: "PUBLIC_",
    plugins: [Icons({ compiler: "solid" }), Tailwind()],
  },
})
