import { ark, type HTMLArkProps } from "@ark-ui/solid"
import { splitProps } from "solid-js"
import { tv, type VariantProps } from "tailwind-variants"

export const textarea = tv(
  {
    base: "rounded-lg border outline-none placeholder:text-on-base/40 disabled:bg-transparent disabled:text-on-base/30 transition-all",
    defaultVariants: { variant: "outline", theme: "accent", size: "md" },
    variants: {
      variant: {
        outline:
          "bg-transparent text-on-base focus-visible:ring disabled:bg-on-base/5 disabled:border-on-base/10",
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
        xs: "min-h-16 text-xs px-2 rounded-md",
        sm: "min-h-24 text-sm px-2.5",
        md: "min-h-24 text-sm px-3",
        lg: "min-h-28 text-base px-3.5",
        xl: "min-h-32 text-lg px-4",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        theme: "accent",
        class:
          "border-on-base/20 hover:border-accent/50 focus-visible:border-accent/70 focus-visible:ring-accent/20",
      },
      {
        variant: "outline",
        theme: "warning",
        class: "border-warning focus-visible:border-warning focus-visible:ring-warning/20",
      },
      {
        variant: "outline",
        theme: "error",
        class: "border-error focus-visible:border-error focus-visible:ring-error/20",
      },
    ],
  },
  { twMerge: false }
)

type TextareaProps = VariantProps<typeof textarea> & HTMLArkProps<"textarea">

export const Textarea = (props: TextareaProps) => {
  const [variantProps, textareaProps] = splitProps(props, ["class", "variant", "theme", "size"])
  return <ark.textarea class={textarea(variantProps)} {...textareaProps} />
}
