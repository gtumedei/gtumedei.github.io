// Basically copied from Solid Primitives (https://github.com/solidjs-community/solid-primitives/blob/main/packages/context/src/index.ts).
// This version is identical to theirs, but the useContext function return is asserted to be non nullable.

import { createComponent, createContext, JSX, useContext } from "solid-js"

type ContextProviderProps = {
  children?: JSX.Element
} & Record<string, unknown>

type ContextProvider<T extends ContextProviderProps> = (
  props: { children: JSX.Element } & T
) => JSX.Element

export function create<T, P extends ContextProviderProps>(
  factoryFn: (props: P) => T,
  defaults: T
): [provider: ContextProvider<P>, useContext: () => T]
export function create<T, P extends ContextProviderProps>(
  factoryFn: (props: P) => T
): [provider: ContextProvider<P>, useContext: () => T]
export function create<T, P extends ContextProviderProps>(
  factoryFn: (props: P) => T,
  defaults?: T
): [provider: ContextProvider<P>, useContext: () => T] {
  const ctx = createContext(defaults)
  return [
    (props) => {
      return createComponent(ctx.Provider, {
        value: factoryFn(props),
        get children() {
          return props.children
        },
      })
    },
    () => useContext(ctx)!,
  ]
}
