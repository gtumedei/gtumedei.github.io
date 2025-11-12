import { APIHandler } from "@solidjs/start/server"
import { SitemapStream, streamToPromise } from "sitemap"
import env from "~/lib/env"

const routes = ["/contact", "/minigames", "/projects", "/tech"]

export const GET: APIHandler = async () => {
  const sitemap = new SitemapStream({ hostname: env.public.PUBLIC_BASE_URL })
  sitemap.write({ url: env.public.PUBLIC_BASE_URL, changefreq: "monthly" })
  routes.forEach((route) => sitemap.write({ url: route, changefreq: "monthly" }))
  sitemap.end()

  const buffer = await streamToPromise(sitemap)

  return new Response(buffer.toString(), {
    status: 200,
    headers: new Headers({ "Content-Type": "text/xml" }),
  })
}
