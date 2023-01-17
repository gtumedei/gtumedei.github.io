import { createContext, ParentComponent, useContext } from "solid-js"

export const create = <TContext,>(createValueFn: () => TContext) => {
  const context = createContext(undefined as unknown as TContext)

  const createCtx = () => {
    const value = createValueFn()

    const Provider: ParentComponent = (props) => (
      <context.Provider value={value}>
        {props.children}
      </context.Provider>
    )

    return [Provider, value] as const
  }

  const useCtx = () => useContext(context)

  return [createCtx, useCtx] as const
}
