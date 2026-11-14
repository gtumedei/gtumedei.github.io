import { ark, type HTMLArkProps } from "@ark-ui/solid"
import { splitProps } from "solid-js"
import { cn } from "tailwind-variants"
import { tv, type VariantProps } from "tailwind-variants/lite"

export const button = tv({
  base: "inline-flex justify-center items-center gap-2 border font-medium transition-all outline-none focus-visible:ring [&:not(:disabled,[data-disabled])]:cursor-pointer",
  defaultVariants: {
    variant: "base",
    size: "md",
    shape: "rounded",
    raised: false,
  },
  variants: {
    variant: {
      base: "bg-base-200 active:bg-base-200/80! border border-on-base/10 hover:border-on-base/30 active:border-on-base/20 focus-visible:border-on-base/20 focus-visible:ring-on-base/10 [&:where(:disabled,[data-disabled])]:text-neutral/40! [&:where(:disabled,[data-disabled])]:bg-neutral/3! [&:where(:disabled,[data-disabled])]:border-neutral/3!",
      neutral:
        "bg-neutral text-on-neutral border-on-neutral/10 hover:bg-neutral/90 active:bg-neutral/80 focus-visible:border-transparent focus-visible:ring-neutral/20 [&:where(:disabled,[data-disabled])]:bg-neutral/20! [&:where(:disabled,[data-disabled])]:text-on-base/50! [&:where(:disabled,[data-disabled])]:border-on-base/5!",
      destructive:
        "bg-error text-on-error border-on-error/10 hover:bg-error/90 active:bg-error/80 focus-visible:border-transparent focus-visible:ring-error/20 [&:where(:disabled,[data-disabled])]:bg-neutral/20! [&:where(:disabled,[data-disabled])]:text-on-base/50! [&:where(:disabled,[data-disabled])]:border-on-base/5!",
      subtle:
        "bg-neutral/5 text-neutral border-transparent hover:bg-accent/15 hover:text-accent active:bg-accent/10 active:text-accent focus-visible:border-accent/70 focus-visible:ring-accent/20 [&:where(:disabled,[data-disabled])]:text-neutral/40! [&:where(:disabled,[data-disabled])]:bg-neutral/3!",
      ghost:
        "border-transparent bg-transparent text-on-base hover:bg-neutral/5 active:bg-neutral/3 focus-visible:border-on-base/20 focus-visible:ring-on-base/10 [&:where(:disabled,[data-disabled])]:bg-transparent! [&:where(:disabled,[data-disabled])]:text-on-base/50!",
    },
    size: {
      xs: "h-8 text-sm px-2 rounded-2",
      sm: "h-9 text-sm px-3 rounded-2",
      md: "h-10 text-sm px-4 rounded-2.5",
      lg: "h-11 text-base px-5 rounded-2.5",
      xl: "h-12 text-base px-6 rounded-2.5",
    },
    shape: {
      rectangle: "",
      rounded: "rounded-full!",
      square: "px-0! aspect-square",
      circle: "px-0! aspect-square rounded-full!",
    },
    raised: {
      true: "shadow-md shadow-black/3 [&:where(:disabled,[data-disabled])]:shadow-none",
    },
  },
})

type ButtonProps = VariantProps<typeof button> & HTMLArkProps<"button">

export const Button = (props: ButtonProps) => {
  const [variantProps, classProp, buttonProps] = splitProps(
    props,
    ["variant", "size", "shape", "raised"],
    ["class"],
  )
  return <ark.button class={cn(button(variantProps), classProp.class)} {...buttonProps} />
}
