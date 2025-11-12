import { redirect } from "@solidjs/router"
import { APIHandler } from "@solidjs/start/server"
import env from "~/lib/env"

export const GET: APIHandler = async (e) => {
  return redirect(`${env.private.S3_URL}/${e.params.path}`)
}
