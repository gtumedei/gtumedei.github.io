import { APIRoute } from "astro"
import { env } from "~/lib/server/env"

export const get: APIRoute = ({ redirect }) => redirect(env.CV_URL)
