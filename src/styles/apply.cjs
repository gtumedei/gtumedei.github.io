const toSingleLine = (string) => string.replaceAll("\n", " ").replace(/\s+/g, " ").trim()

module.exports = (classes) => ({
  [`@apply ${toSingleLine(classes[0])}`]: {},
})
