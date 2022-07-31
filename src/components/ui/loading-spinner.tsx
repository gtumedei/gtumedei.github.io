import type { Component } from "solid-js"

const LoadingSpinner: Component<{ inverted?: boolean }> = (props) => {
  return (
    <>
      <div class={`spinner h-5 w-5 rounded-full ${props.inverted ? "bg-inverted-typography-base" : "bg-typography-base"}`} />

      <style>{`
        .spinner {
          animation: scaleout 1.0s infinite ease-in-out;
        }

        @keyframes scaleout {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1.0);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

export default LoadingSpinner
