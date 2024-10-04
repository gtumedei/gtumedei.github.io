import { action, cache } from "@solidjs/router"
import { ZodType, ZodTypeDef } from "zod"

/**
 * Wrap a function in Solid Router's `cache` and validate its payload with Zod.\
 * `safeQuery` can throw, so errors in data fetching can be caught by error boundaries.
 */
export const safeQuery = <TSchema, TInputSchema, TOutput>(
  querySchema: ZodType<TSchema, ZodTypeDef, TInputSchema>,
  queryFn: (payload: TSchema) => TOutput | Promise<TOutput>,
  queryKey: string
) =>
  cache(async (rawPayload: TSchema) => {
    const validatedPayload = querySchema.parse(rawPayload)
    const res = await queryFn(validatedPayload)
    return res
  }, queryKey)

/**
 * Wrap a function in Solid Router's `action` and validate its payload with Zod.\
 * `safeAction` cannot throw. It returns any error as value.
 */
export const safeAction = <TSchema, TInputSchema, TOutput>(
  actionSchema: ZodType<TSchema, ZodTypeDef, TInputSchema>,
  actionFn: (payload: TSchema) => TOutput | Promise<TOutput>
) =>
  action(async (rawPayload: TSchema) => {
    try {
      const validatedPayload = actionSchema.parse(rawPayload)
      const res = await actionFn(validatedPayload)
      return { data: res, error: null }
    } catch (e) {
      console.error(e)
      return { data: null, error: e }
    }
  })
