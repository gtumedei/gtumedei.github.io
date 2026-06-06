import { ark, type HTMLArkProps } from "@ark-ui/solid"
import { splitProps } from "solid-js"
import { cn } from "tailwind-variants"
import { tv, type VariantProps } from "tailwind-variants/lite"

export const button = tv({
  base: "inline-flex justify-center items-center gap-2 rounded-lg border font-medium transition-all outline-none focus-visible:ring [&:not(:disabled,[data-disabled])]:cursor-pointer [&:where(:disabled,[data-disabled])]:shadow-none!",
  defaultVariants: { variant: "solid", theme: "neutral", size: "md", shape: "rectangle" },
  variants: {
    variant: {
      solid:
        "shadow-xs shadow-black/3 [&:where(:disabled,[data-disabled])]:bg-neutral/30! [&:where(:disabled,[data-disabled])]:text-on-base/50! [&:where(:disabled,[data-disabled])]:border-transparent!",
      subtle:
        "border-transparent bg-neutral/5 text-neutral hover:bg-accent/15 hover:text-accent active:bg-accent/10 active:text-accent focus-visible:border-neutral/15 focus-visible:ring-neutral/10 [&:where(:disabled,[data-disabled])]:text-neutral/40! [&:where(:disabled,[data-disabled])]:bg-neutral/3!",
      ghost:
        "border-transparent bg-transparent text-on-base hover:bg-on-base/5 active:bg-on-base/3 focus-visible:border-on-base/20 focus-visible:ring-on-base/10 [&:where(:disabled,[data-disabled])]:bg-transparent! [&:where(:disabled,[data-disabled])]:text-on-base/50!",
      raised:
        "bg-base-200 hover:bg-base-200! active:bg-base-200! rounded-full! border border-on-base/10 hover:border-on-base/20 shadow-md shadow-black/3 focus-visible:ring-on-base/10",
    },
    theme: {
      neutral: "",
      accent: "",
      info: "",
      success: "",
      warning: "",
      error: "",
    },
    size: {
      xs: "h-8 text-sm px-3 rounded-md",
      sm: "h-9 text-sm px-4",
      md: "h-10 text-sm px-5",
      lg: "h-11 text-base px-6",
      xl: "h-12 text-lg px-7",
    },
    shape: {
      rectangle: "",
      square: "px-0! aspect-square",
      circle: "px-0! aspect-square rounded-full!",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      theme: "neutral",
      class:
        "bg-neutral text-on-neutral border-on-neutral/10 hover:bg-neutral/90 active:bg-neutral/80 focus-visible:ring-neutral/20",
    },
    {
      variant: "solid",
      theme: "accent",
      class:
        "bg-accent text-on-accent border-on-accent/10 hover:bg-accent/90 active:bg-accent/80 focus-visible:ring-accent/20",
    },
    {
      variant: "solid",
      theme: "success",
      class:
        "bg-success text-on-success border-on-success/10 hover:bg-success/90 active:bg-success/80 focus-visible:ring-success/20",
    },
    {
      variant: "solid",
      theme: "warning",
      class:
        "bg-warning text-on-warning border-on-warning/10 hover:bg-warning/90 active:bg-warning/80 focus-visible:ring-warning/20",
    },
    {
      variant: "solid",
      theme: "error",
      class:
        "bg-error text-on-error border-on-error/10 hover:bg-error/90 active:bg-error/80 focus-visible:ring-error/20",
    },
  ],
})

type ButtonProps = VariantProps<typeof button> & HTMLArkProps<"button">

export const Button = (props: ButtonProps) => {
  const [variantProps, classProp, buttonProps] = splitProps(
    props,
    ["variant", "theme", "size", "shape"],
    ["class"],
  )
  return <ark.button class={cn(button(variantProps), classProp.class)} {...buttonProps} />
}
