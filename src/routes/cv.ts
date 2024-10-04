import { json } from "@solidjs/router"

export const GET = async () => {
  return json({ message: "cv" })
}
