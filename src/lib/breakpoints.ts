import { createBreakpoints as _createBreakpoints } from "@solid-primitives/media"

export const createBreakpoints = () =>
  _createBreakpoints({
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  })
