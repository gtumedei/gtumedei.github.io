import { createClient } from "@supabase/supabase-js"
import { Message } from "@/types"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string

const supabase = createClient(supabaseUrl, supabaseKey)

export const sendMessage = async (message: Message) =>
  await supabase.from<Message>("messages").insert(message, { returning: "minimal" })