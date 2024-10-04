import {
  createContext,
  splitProps,
  useContext,
  type ComponentProps,
  type ValidComponent,
} from "solid-js"
import { Dynamic } from "solid-js/web"
import cn from "~/lib/cn"

type Recipe = {
  (props: Record<string, unknown>): Record<string, CallableFunction>
  variantKeys: string[]
}

type PolymorphicProps<T extends ValidComponent, P = ComponentProps<T>> = {
  [K in keyof P]: P[K]
}

type Slot<R extends Recipe> = keyof ReturnType<R>
type SlotRecipe<R extends Recipe> = Record<Slot<R>, CallableFunction>
type VariantProps<R extends Recipe> = Parameters<R>[0]

export const createStyleContext = <R extends Recipe>(recipe: R) => {
  const StyleContext = createContext<SlotRecipe<R> | null>(null)

  /** Wrap the root component with this function to provide his children with access to the component's variants. */
  const withProvider = <T extends ValidComponent>(Component: T, slot?: string) => {
    const StyledComponent = (props: PolymorphicProps<T> & VariantProps<R>) => {
      const [variantProps, componentProps] = splitProps(props, [
        "class",
        ...recipe.variantKeys,
      ]) as unknown as [VariantProps<R>, PolymorphicProps<T>]
      const styles = recipe(variantProps) as SlotRecipe<R>

      return (
        <StyleContext.Provider value={styles}>
          <Dynamic
            component={Component}
            {...componentProps}
            class={cn(styles?.[slot ?? ""]?.(), props.class)}
          />
        </StyleContext.Provider>
      )
    }
    return StyledComponent
  }

  /** Wrap a component with this function to get access to the root component's variants. */
  const withContext = <T extends ValidComponent>(Component: T, slot?: string): T => {
    if (!slot) return Component
    const StyledComponent = (props: PolymorphicProps<T>) => {
      const styles = useContext(StyleContext)
      return (
        <Dynamic component={Component} {...props} class={cn(styles?.[slot]?.(), props.class)} />
      )
    }
    return StyledComponent as T
  }

  /**
   * Wrap a component with this function to get access to the recipe, without variants.
   *
   * This is recommended when the root component's variants don't modify the child component in any way.
   */
  const withPlainRecipe = <T extends ValidComponent>(Component: T, slot?: string): T => {
    if (!slot) return Component
    const StyledComponent = (props: PolymorphicProps<T>) => (
      <Dynamic component={Component} {...props} class={cn(recipe({})?.[slot]?.(), props.class)} />
    )
    return StyledComponent as T
  }

  return {
    withProvider,
    withContext,
    withPlainRecipe,
  }
}
