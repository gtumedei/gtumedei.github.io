import { parseEnv, z } from "znv"

export const env = parseEnv(import.meta.env, {
  CV_URL: z.string().min(1),
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_CHAT_ID: z.string().min(1)
})
