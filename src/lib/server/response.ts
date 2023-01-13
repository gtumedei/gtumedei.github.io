export const createResponse = (body: any) => {
  return new Response(JSON.stringify(body))
}

export const createError = (status: number, statusText: string) => {
  return new Response(null, { status, statusText })
}
