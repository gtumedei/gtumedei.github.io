import { type APIRoute } from "astro"
import { Bot, GrammyError, HttpError } from "grammy"
import { outdent } from "outdent"
import { z } from "zod"
import { env } from "~/lib/server/env"
import { createError, createResponse } from "~/lib/server/response"

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
})

export type ContactApiSchema = z.infer<typeof schema>

export const post: APIRoute = async ({ request }) => {
  // Validate body
  const res = schema.safeParse(await request.json())
  if (!res.success) return createError(400, "Bad request")
  const input = res.data

  // Compose message
  const message = outdent`
    Hello Sir,
    *${input.name}* ✉️[${input.email}](${input.email}) contacted you via the gtumedei.io form.


    *${input.subject}*

    ${input.message}
  `

  // Send message
  try {
    const bot = new Bot(env.TELEGRAM_BOT_TOKEN)
    await bot.api.sendMessage(env.TELEGRAM_CHAT_ID, message, { parse_mode: "Markdown" })
    console.log("Message sent")
    return createResponse({ message: "Message sent" })
  } catch (e) {
    if (e instanceof GrammyError) console.error("Error in request:", e.description)
    else if (e instanceof HttpError) console.error("Could not contact Telegram:", e)
    else console.error("Unknown error:", e)
    return createError(500, "Failed to send the message")
  }
}
