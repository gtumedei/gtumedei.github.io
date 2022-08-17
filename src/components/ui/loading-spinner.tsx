import type { Component } from "solid-js"

const LoadingSpinner: Component<{ inverted?: boolean }> = (props) => {
  return (
    <>
      <div class={`
        spinner h-5 w-5 rounded-full border-2 border-b-transparent
        ${props.inverted ? "border-inverted-typography-base" : "border-typography-base"}
      `}/>

      <style>{`
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
      `}</style>
    </>
  )
}

export default LoadingSpinner
