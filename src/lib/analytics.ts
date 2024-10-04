export const ANALYTICS_URL = "https://stats.gtumedei.io"
export const WEBSITE_ID = "cc6e6286-12c8-4c13-abb1-19bcc83f6475"

type AnalyticsEvent =
  | {
      type: "pageview"
      data: {
        url: string
        referrer: string
      }
    }
  | {
      type: "event"
      data: {
        url: string
        event_name: string
      }
    }

/** Collect analytics data server-side. */
export const sendEvent = async (request: Request, event: AnalyticsEvent) => {
  if (import.meta.env.DEV) return

  const defaultPayload = {
    website: WEBSITE_ID,
    hostname: "gtumedei.io",
    language: "en-US",
    screen: "1920x1080",
  }

  await fetch(`${ANALYTICS_URL}/api/send`, {
    method: "POST",
    headers: {
      "User-Agent": request.headers.get("User-Agent") ?? "",
    },
    body: JSON.stringify({
      payload: { ...defaultPayload, ...event.data },
      type: event.type,
    }),
  })
}
