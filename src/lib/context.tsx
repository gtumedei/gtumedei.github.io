import { createContext, useContext, type ParentComponent } from "solid-js"
import type { AnyFunction, inferArgs, inferReturn } from "~/lib/ts-utils"

export const create = <TFn extends AnyFunction, TContext = inferReturn<TFn>>(
  createValueFn: TFn
) => {
  const context = createContext(undefined as unknown as TContext)

  const createCtx = (...args: inferArgs<TFn>) => {
    const value: TContext = createValueFn(...args)
    const Provider: ParentComponent = (props) => (
      <context.Provider value={value}>{props.children}</context.Provider>
    )
    return [Provider, value] as const
  }

  const useCtx = () => useContext(context)

  return [createCtx, useCtx] as const
}
