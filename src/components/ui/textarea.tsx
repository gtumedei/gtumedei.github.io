import { ark, type HTMLArkProps } from "@ark-ui/solid"
import { splitProps } from "solid-js"
import { cn } from "tailwind-variants"
import { tv, type VariantProps } from "tailwind-variants/lite"

export const textarea = tv({
  base: "rounded-5 border outline-none placeholder:text-on-base/40 disabled:bg-transparent disabled:text-on-base/30 transition-all",
  defaultVariants: { variant: "outline", theme: "accent", size: "md" },
  variants: {
    variant: {
      outline:
        "bg-base-200 text-on-base border-on-base/10 focus-visible:ring disabled:bg-neutral/3 disabled:border-neutral/3",
      ghost:
        "border-transparent bg-transparent text-on-base focus-visible:border-accent focus-visible:ring focus-visible:ring-accent/20 disabled:bg-on-base/10",
      unstyled: "border-transparent bg-transparent focus:border-transparent focus:ring-transparent",
    },
    theme: {
      accent: "",
      warning: "",
      error: "",
    },
    size: {
      xs: "min-h-16 text-sm px-2.5",
      sm: "min-h-24 text-sm px-3",
      md: "min-h-24 text-sm px-3.5",
      lg: "min-h-28 text-base px-4",
    },
  },
  compoundVariants: [
    {
      variant: "outline",
      theme: "accent",
      class: "hover:border-on-base/30 focus-visible:border-accent/70 focus-visible:ring-accent/20",
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
})

type TextareaProps = VariantProps<typeof textarea> & HTMLArkProps<"textarea">

export const Textarea = (props: TextareaProps) => {
  const [variantProps, textareaProps] = splitProps(props, ["class", "variant", "theme", "size"])
  return <ark.textarea class={cn(textarea(variantProps), variantProps.class)} {...textareaProps} />
}
