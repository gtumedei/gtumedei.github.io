import type { HTMLArkProps } from "@ark-ui/solid"
import type { Component } from "solid-js"
import { cn } from "tailwind-variants"

const KbdContainer: Component<HTMLArkProps<"div">> = (props) => {
  return <div {...props} class={cn("no-hover:hidden flex gap-0.5", props.class)} />
}

const KbdItem: Component<HTMLArkProps<"kbd"> & { variant?: "base" | "neutral" }> = (props) => {
  const variant = () => props.variant ?? "base"

  return (
    <kbd
      {...props}
      class={cn(
        "no-hover:hidden h-5 min-w-5 px-1 inline-flex justify-center items-center text-center text-xs rounded-md pointer-events-none",
        variant() == "base"
          ? "text-on-base/70 bg-on-base/10"
          : "text-on-neutral/70 bg-on-neutral/10",
        props.class,
      )}
    >
      {props.children}
    </kbd>
  )
}

export const Kbd = Object.assign(KbdContainer, { Item: KbdItem })
