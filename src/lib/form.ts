import { FormConfig } from "@felte/core"
import { createForm as createFelteForm } from "@felte/solid"
import { validator } from "@felte/validator-zod"
import { createSignal } from "solid-js"
import { ZodSchema } from "zod"

const parseError = (e: unknown) => {
  if (e instanceof Error) {
    return e.message
  }
  return JSON.stringify(e)
}

export const createForm = <TSchema extends Record<string, unknown>>(
  config: FormConfig<TSchema> & { schema: ZodSchema<TSchema> }
) => {
  const { schema, onSubmit, ...rest } = config

  const [isSubmitting, setIsSubmitting] = createSignal(false)
  const [submitError, setSubmitError] = createSignal("")

  const form = createFelteForm<TSchema>({
    extend: validator({ schema }),
    onSubmit: async (values, ctx) => {
      if (isSubmitting()) return
      try {
        setIsSubmitting(true)
        await onSubmit?.(values, ctx)
        setSubmitError("")
      } catch (e) {
        console.error(e)
        setSubmitError(parseError(e))
      } finally {
        setIsSubmitting(false)
      }
    },
    ...(rest as any),
  })

  return {
    ...form,
    isSubmitting,
    submitError,
  }
}
