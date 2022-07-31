import "solid-js"

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      tooltip: [() => string, string]
      model: [() => string, (value: string) => void]
    }
  }
}
