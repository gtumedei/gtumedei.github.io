// @ts-check

export const detectScrollbarSize = () => {
  // Create a temporary div
  const div = document.createElement("div")
  div.style.visibility = "hidden"
  div.style.overflow = "scroll"
  div.style.width = "100px"
  div.style.position = "absolute"
  document.body.appendChild(div)
  // Create inner div to measure
  const innerDiv = document.createElement("div")
  innerDiv.style.width = "100%"
  div.appendChild(innerDiv)
  // Calculate scrollbar width
  const scrollbarSize = Math.max(div.offsetWidth - innerDiv.offsetWidth, 4)
  // Remove temporary div
  document.body.removeChild(div)
  document.documentElement.style.setProperty("--scrollbar-size", `${scrollbarSize}px`)
}

export const detectScrollbarSizeFnString = `(${detectScrollbarSize})()`
