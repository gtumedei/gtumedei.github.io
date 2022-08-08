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
    const chatMessage = encodeURIComponent(outdent`
      Hello Sir,
      *${input.name}* ✉️[${input.email}](mailto:${input.email}) contacted you via the gtumedei.github.io form.


      *${input.subject}*

      ${input.message}
    `)

    const res = await fetch(`https://api.telegram.org/bot${Deno.env.get("TELEGRAM_BOT_TOKEN")}/sendMessage?parse_mode=Markdown&chat_id=572114402&text=${chatMessage}`)
    if (!res.ok) {
      throw new SupabaseError({
        status: res.status,
        message: await res.json()
      })
    }
  }
}).serve()
