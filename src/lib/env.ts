import { isServer } from "solid-js/web"
import { z } from "zod"

export const PrivateEnvSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_CHAT_ID: z.string().min(1),
  CV_URL: z.string().min(1),
  S3_URL: z.string().min(1),
})

export const PublicEnvSchema = z.object({
  PUBLIC_BASE_URL: z.string().url(),
})

const parsedPrivateEnv = PrivateEnvSchema.safeParse(isServer ? process.env : {})

// Skip error checking on the client
if (isServer && parsedPrivateEnv.success === false) {
  throw new Error(`Invalid environment variables\n${z.prettifyError(parsedPrivateEnv.error)}`)
}

const privateEnv = (parsedPrivateEnv as z.ZodSafeParseSuccess<z.infer<typeof PrivateEnvSchema>>)
  .data

const parsedPublicEnv = PublicEnvSchema.safeParse(import.meta.env)

if (parsedPublicEnv.success === false) {
  throw new Error(`Invalid environment variables\n${z.prettifyError(parsedPublicEnv.error)}`)
}

const publicEnv = parsedPublicEnv.data

const env = {
  private: privateEnv,
  public: publicEnv,
}

export default env
