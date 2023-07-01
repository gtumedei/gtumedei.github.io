import type { Component } from "solid-js"
import { css } from "vite-plugin-inline-css-modules"

const LoadingSpinner: Component<{ inverted?: boolean }> = (props) => {
  return (
    <div
      class={`
      ${style.spinner} h-5 w-5 rounded-full border-2 border-b-transparent
      ${props.inverted ? "border-inverted-content" : "border-content"}
    `}
    />
  )
}

const style = css`
  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default LoadingSpinner
