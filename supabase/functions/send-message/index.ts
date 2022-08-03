import outdent from "https://deno.land/x/outdent@v0.8.0/mod.ts"
import { createFunction, SupabaseError } from "../_shared/functions.ts"

createFunction(async (req) => {
  let data: { name: string, email: string, subject: string, message: string }
  try {
    const { name, email, subject, message } = await req.json()
    data = { name, email, subject, message }
  } catch {
    throw new SupabaseError({ status: 400, message: "Invalid body." })
  }

  const chatMessage = encodeURIComponent(outdent`
    Hello Sir,
    someone contacted you via the gtumedei.github.io form.

    ---

    Sender: *${data.name} (${data.email})*
    Subject: *${data.subject}*

    ---

    ${data.message}
  `)

  const res = await fetch(`https://api.telegram.org/bot${Deno.env.get("TELEGRAM_BOT_TOKEN")}/sendMessage?parse_mode=Markdown&chat_id=572114402&text=${chatMessage}`)

  return { status: res.status, data: "" }
})
