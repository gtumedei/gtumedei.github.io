import { env } from "./env"

export const ANALYTICS_URL = "https://stats.gtumedei.io"
export const WEBSITE_ID = "2fe7a931-c5a9-40c8-86cf-06922bf44149"

type AnalyticsEvent = {
  type: "pageview"
  data: {
    url: string
    referrer: string
  }
} | {
  type: "event"
  data: {
    url: string
    event_name: string
  }
}

/** Collect analytics data server-side. */
export const sendEvent = async (request: Request, event: AnalyticsEvent) => {
  const defaultPayload = {
    website: WEBSITE_ID,
    hostname: env.MODE == "production" ? "gtumedei.io" : "localhost",
    language: "en-US",
    screen: "1920x1080"
  }

  const res = await fetch(`${ANALYTICS_URL}/api/send`, {
    method: "POST",
    headers: {
      "User-Agent": request.headers.get("User-Agent") ?? ""
    },
    body: JSON.stringify({
      payload: { ...defaultPayload, ...event.data },
      type: event.type
    })
  })
  console.log(res.ok)
}
