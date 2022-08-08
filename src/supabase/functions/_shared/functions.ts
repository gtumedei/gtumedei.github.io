import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { z } from "https://deno.land/x/zod@v3.17.10/mod.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey",
}

export class SupabaseError extends Error {
  status: number

  constructor({ status, message }: { status: number, message: string }) {
    super(message)
    this.status = status
  }
}

export const createFunction = <
  Schema extends z.ZodTypeAny = z.ZodVoid,
  Input extends z.infer<Schema> = void,
  Return = void
>({ input, handler }: {
  input?: Schema
  handler: (input: Input) => Return
}) => ({
  schema: input,
  handler,
  serve: () => serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })

    // Parse input
    let parsedInput: Input
    try {
      const body = await req.json()
      parsedInput = (input ?? z.void()).parse(body)
    } catch {
      throw new SupabaseError({ status: 400, message: "Invalid body." })
    }

    // Call handler
    try {
      const ret = await handler(parsedInput)
      return new Response(JSON.stringify(ret ?? ""), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      })
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: e instanceof SupabaseError ? e.status : 500
      })
    }
  })
})

type SupabaseFunction = ReturnType<typeof createFunction>

export type inferArgs<Fn extends SupabaseFunction> = Parameters<Fn["handler"]>[number]
export type inferRet<Fn extends SupabaseFunction> = Awaited<ReturnType<Fn["handler"]>>
