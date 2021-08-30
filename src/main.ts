import "vue-global-api"
import { ViteSSG } from "vite-ssg"
import generatedRoutes from "virtual:generated-pages"
import { setupLayouts } from "virtual:generated-layouts"
import App from "@/App.vue"

// windicss layers
import "virtual:windi-base.css"
import "virtual:windi-components.css"
// Custom styles here
import "./styles/main.postcss"
// windicss utilities should be the last style import
import "virtual:windi-utilities.css"
// windicss devtools support (dev only)
import "virtual:windi-devtools"

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    Object.values(import.meta.globEager("./modules/*.ts")).map(i => i.install?.(ctx))
  }
)
