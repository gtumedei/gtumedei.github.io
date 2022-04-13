import { ViteSSGContext } from "vite-ssg"

export type UserModule = (ctx: ViteSSGContext) => void

export type Featured = {
  name: string,
  type: string,
  description: string,
  image: string,
  url: string
}

export type Technology = {
  name: string
  icon: any
  colors: { text: string, hover: string }
  url: string
}

export type Stack = Technology[]

export type Message = {
  name: string
  email: string
  subject: string
  message: string
}