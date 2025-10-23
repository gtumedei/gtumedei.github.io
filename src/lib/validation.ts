import { z, ZodType } from "zod"

/**
 * Validate a payload against a Zod Schema.
 * @returns The validated payload
 * @throws `Error | ValidationError`
 */
export const validated = <TSchemaOutput, TSchemaInput>(
  payload: unknown,
  schema: ZodType<TSchemaOutput, TSchemaInput>
): TSchemaOutput => {
  const res = schema.safeParse(payload)
  if (res.error) throw new ValidationError(res.error)
  return res.data
}

export class ValidationError extends Error {
  issues: z.core.$ZodIssue[]

  constructor(zodError: z.ZodError) {
    super()
    this.message = z.prettifyError(zodError)
    this.issues = zodError.issues
  }
}
