import { Bot, GrammyError, HttpError } from "https://deno.land/x/grammy@v1.10.1/mod.ts"
import outdent from "https://deno.land/x/outdent@v0.8.0/mod.ts"
import { z } from "https://deno.land/x/zod@v3.17.10/mod.ts"
import { createFunction, SupabaseError } from "../_shared/functions.ts"

createFunction({
  input: z.object({
    name: z.string(),
    email: z.string().email(),
    subject: z.string(),
    message: z.string()
  }),
  handler: async (input) => {
    const message = outdent`
      Hello Sir,
      *${input.name}* ✉️[${input.email}](${input.email}) contacted you via the gtumedei.github.io form.


      *${input.subject}*

      ${input.message}
    `

    const bot = new Bot(Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "")

    try {
      await bot.api.sendMessage(Deno.env.get("TELEGRAM_CHAT_ID") ?? "", message, { parse_mode: "Markdown" })
      console.log("Message sent")
    } catch (e) {
      if (e instanceof GrammyError) console.error("Error in request:", e.description)
      else if (e instanceof HttpError) console.error("Could not contact Telegram:", e)
      else console.error("Unknown error:", e)
      throw new SupabaseError({
        status: 500,
        message: "Failed to send the message"
      })
    }
  }
}).serve()
