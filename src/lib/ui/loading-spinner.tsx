import type { Component } from "solid-js"
import cn from "~/lib/cn"

const LoadingSpinner: Component<{ inverted?: boolean }> = (props) => {
  return (
    <div
      class={cn(
        "h-5 w-5 rounded-full border-2 !border-b-transparent animate-spin",
        props.inverted ? "border-inverted-content" : "border-content"
      )}
    />
  )
}

export default LoadingSpinner
