import { createContext, ParentComponent, useContext } from "solid-js"
import { createColorGuesser } from "./core"

type Ctx = ReturnType<typeof createColorGuesser>

const ColorGuesserCtx = createContext<Ctx>()

export const ColorGuesserGameProvider: ParentComponent = (props) => {
  return (
    <ColorGuesserCtx.Provider value={createColorGuesser()}>
      {props.children}
    </ColorGuesserCtx.Provider>
  )
}

export const useColorGuesserGame = () => useContext(ColorGuesserCtx)!
