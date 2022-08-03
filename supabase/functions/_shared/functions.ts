import { serve } from "https://deno.land/std@0.131.0/http/server.ts"

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

type Reply<T> = { status: number, data?: T }

export const createFunction = <T>(handler: (req: Request) => Reply<T> | Promise<Reply<T>>) =>
  serve(async (req) => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })

    try {
      const { data, status } = await handler(req)
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status
      })
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: e instanceof SupabaseError ? e.status : 500
      })
    }
  })
