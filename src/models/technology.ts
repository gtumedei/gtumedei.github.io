export default interface Technology {
  name: string
  icon: any
  colors: { text: string, hover: string }
  url: string
}

export type Stack = Technology[]