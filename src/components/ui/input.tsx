import { ark, type HTMLArkProps } from "@ark-ui/solid"
import { splitProps } from "solid-js"
import { tv, type VariantProps } from "tailwind-variants"
import cn from "~/lib/cn"

export const input = tv(
  {
    base: "py-0 rounded-lg border outline-none placeholder:text-on-base/40 disabled:bg-transparent disabled:text-on-base/30 transition-all",
    defaultVariants: { variant: "outline", theme: "accent", size: "md" },
    variants: {
      variant: {
        outline:
          "border-on-base/20 bg-transparent text-on-base disabled:bg-on-base/5 disabled:border-on-base/10",
        ghost:
          "border-transparent bg-transparent text-on-base focus-visible:border-accent focus-visible:ring focus-visible:ring-accent/20 disabled:bg-on-base/10",
        unstyled:
          "border-transparent bg-transparent focus:border-transparent focus:ring-transparent",
      },
      theme: {
        accent: "",
        warning: "",
        error: "",
      },
      size: {
        xs: "h-8 text-xs px-2 rounded-md",
        sm: "h-9 text-sm px-2.5 ",
        md: "h-10 text-sm px-3",
        lg: "h-11 text-base px-3.5",
        xl: "h-12 text-lg px-4",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        theme: "accent",
        class:
          "hover:border-accent/50 focus-visible:border-accent/70 focus-visible:ring focus-visible:ring-accent/20",
      },
      {
        variant: "outline",
        theme: "warning",
        class:
          "border-warning focus-visible:border-warning focus-visible:ring focus-visible:ring-warning/20",
      },
      {
        variant: "outline",
        theme: "error",
        class:
          "border-error focus-visible:border-error focus-visible:ring focus-visible:ring-error/20",
      },
    ],
  },
  { twMerge: false }
)

type InputProps = VariantProps<typeof input> & HTMLArkProps<"input">

export const Input = (props: InputProps) => {
  const [variantProps, classProp, inputProps] = splitProps(
    props,
    ["variant", "theme", "size"],
    ["class"]
  )
  return <ark.input class={cn(input(variantProps), classProp.class)} {...inputProps} />
}
