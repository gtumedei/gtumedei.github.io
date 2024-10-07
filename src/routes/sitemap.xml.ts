import { SitemapStream, streamToPromise } from "sitemap"

import { APIHandler } from "@solidjs/start/server"

const BASE_URL = "https://gtumedei.io"

const routes = ["/contact", "/minigames", "/projects", "/tech"]

export const GET: APIHandler = async () => {
  const sitemap = new SitemapStream({ hostname: BASE_URL })
  sitemap.write({ url: BASE_URL, changefreq: "monthly" })
  routes.forEach((route) => sitemap.write({ url: route, changefreq: "monthly" }))
  sitemap.end()

  const buffer = await streamToPromise(sitemap)

  return new Response(buffer.toString(), {
    status: 200,
    headers: new Headers({ "Content-Type": "text/xml" }),
  })
}
