import { redirect } from "@solidjs/router"
import env from "~/lib/env"

export const GET = async () => {
  return redirect(env.private.CV_URL)
}
