import { FormConfig } from "@felte/core"
import { createForm as createFelteForm } from "@felte/solid"
import { validator } from "@felte/validator-zod"
import { createSignal } from "solid-js"
import { ZodType } from "zod"

const parseError = (e: unknown) => {
  if (e instanceof Error) {
    return e.message
  }
  return JSON.stringify(e)
}

export const createForm = <TSchemaOutput extends Record<string, unknown>, TSchemaInput>(
  config: FormConfig<TSchemaOutput> & { schema: ZodType<TSchemaOutput, TSchemaInput> }
) => {
  const { schema, onSubmit, ...rest } = config

  const [isSubmitting, setIsSubmitting] = createSignal(false)
  const [submitError, setSubmitError] = createSignal("")

  const form = createFelteForm<TSchemaOutput>({
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
