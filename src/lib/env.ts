import { isServer } from "solid-js/web"
import { SafeParseSuccess, z, ZodFormattedError } from "zod"

export const PrivateEnvSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_CHAT_ID: z.string().min(1),
})

export const PublicEnvSchema = z.object({
  PUBLIC_CV_URL: z.string().min(1),
})

const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
  Object.entries(errors)
    .map(([name, value]) =>
      value && "_errors" in value ? `${name}: ${value._errors.join(", ")}\n` : undefined
    )
    .filter(Boolean)

const parsedPrivateEnv = PrivateEnvSchema.safeParse(isServer ? process.env : {})

// Skip error checking on the client
if (isServer && parsedPrivateEnv.success === false) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(parsedPrivateEnv.error.format())
  )
  throw new Error("Invalid environment variables")
}

const privateEnv = (parsedPrivateEnv as SafeParseSuccess<z.infer<typeof PrivateEnvSchema>>).data

const parsedPublicEnv = PublicEnvSchema.safeParse(import.meta.env)

if (parsedPublicEnv.success === false) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(parsedPublicEnv.error.format())
  )
  throw new Error("Invalid environment variables")
}

const publicEnv = parsedPublicEnv.data

const env = {
  private: privateEnv,
  public: publicEnv,
}

export default env
