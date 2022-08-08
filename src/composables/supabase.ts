import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey, { shouldThrowOnError: true })

export type Message = {
  name: string
  email: string
  subject: string
  message: string
}

export const sendMessage = async (message: Message) => {
  const { data, error } = await supabase.functions.invoke("send-message", { body: JSON.stringify(message) })
  const e = error ?? data?.error
  if (e) throw e
}
