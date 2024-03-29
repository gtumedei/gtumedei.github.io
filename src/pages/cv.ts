import { APIRoute } from "astro"
import { sendEvent } from "~/lib/server/analytics"
import { env } from "~/lib/server/env"

export const prerender = false

export const GET: APIRoute = async ({ request, redirect }) => {
  await sendEvent(request, {
    type: "pageview",
    data: {
      url: "/cv",
      referrer: "",
    },
  })
  return redirect(env.CV_URL)
}
