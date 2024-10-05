import { ark, type HTMLArkProps } from "@ark-ui/solid"
import { splitProps } from "solid-js"
import { tv, type VariantProps } from "tailwind-variants"
import cn from "~/lib/cn"

export const button = tv(
  {
    base: "inline-flex justify-center items-center gap-2 rounded-lg border font-medium transition-all outline-none focus-visible:ring [&:where(:disabled,[data-disabled])]:!shadow-none",
    defaultVariants: { variant: "solid", theme: "neutral", size: "md", shape: "rectangle" },
    variants: {
      variant: {
        solid: "",
        outline:
          "border-on-base/20 bg-transparent text-on-base hover:bg-accent/10 hover:text-accent hover:border-accent/50 focus-visible:ring-on-base/10 [&:where(:disabled,[data-disabled])]:!border-on-base/10 [&:where(:disabled,[data-disabled])]:!bg-transparent [&:where(:disabled,[data-disabled])]:!text-on-base/50",
        subtle:
          "border-transparent bg-neutral/5 text-neutral hover:bg-accent/15 hover:text-accent focus-visible:border-neutral/15 focus-visible:ring-neutral/10 [&:where(:disabled,[data-disabled])]:!text-neutral/50 [&:where(:disabled,[data-disabled])]:!bg-neutral/5",
        ghost:
          "border-transparent bg-transparent text-on-base hover:bg-on-base/5 focus-visible:border-on-base/20 focus-visible:ring-on-base/10 [&:where(:disabled,[data-disabled])]:!bg-transparent [&:where(:disabled,[data-disabled])]:!text-on-base/50",
        link: "border-transparent !h-min !px-0",
        raised:
          "bg-base-100 dark:bg-base-200 rounded-full border border-on-base/10 shadow-md shadow-black/5",
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
        xs: "h-8 text-xs px-3 rounded-md",
        sm: "h-9 text-sm px-4",
        md: "h-10 text-sm px-5",
        lg: "h-11 text-base px-6",
        xl: "h-12 text-lg px-7",
      },
      shape: {
        rectangle: "",
        square: "!px-0 aspect-square",
        circle: "!px-0 aspect-square !rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        theme: "accent",
        class:
          "bg-accent border-transparent text-on-accent hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 focus:shadow-accent/30 active:shadow-md active:shadow-accent/30 focus-visible:ring-accent/20 [&:where(:disabled,[data-disabled])]:!bg-accent/30 [&:where(:disabled,[data-disabled])]:!text-on-base/50",
      },
      {
        variant: "solid",
        theme: "success",
        class:
          "bg-success border-transparent text-on-success hover:bg-success/90 focus-visible:ring-success/20 [&:where(:disabled,[data-disabled])]:!bg-success/30 [&:where(:disabled,[data-disabled])]:!text-on-base/50",
      },
      {
        variant: "solid",
        theme: "warning",
        class:
          "bg-warning border-transparent text-on-warning hover:bg-warning/90 focus-visible:ring-warning/20 [&:where(:disabled,[data-disabled])]:!bg-warning/30 [&:where(:disabled,[data-disabled])]:!text-on-base/50",
      },
      {
        variant: "solid",
        theme: "error",
        class:
          "bg-error border-transparent text-on-error hover:bg-error/90 focus-visible:ring-error/20 [&:where(:disabled,[data-disabled])]:!bg-error/30 [&:where(:disabled,[data-disabled])]:!text-on-base/50",
      },
      {
        variant: "link",
        theme: "neutral",
        class:
          "text-neutral hover:text-neutral/80 focus-visible:border-neutral/20 focus-visible:ring-neutral/10 [&:where(:disabled,[data-disabled])]:!bg-transparent [&:where(:disabled,[data-disabled])]:!text-neutral/50",
      },
      {
        variant: "link",
        theme: "accent",
        class:
          "text-accent hover:text-accent/80 focus-visible:border-accent/20 focus-visible:ring-accent/10 [&:where(:disabled,[data-disabled])]:!bg-transparent [&:where(:disabled,[data-disabled])]:!text-accent/50",
      },
    ],
  },
  { twMerge: false }
)

type ButtonProps = VariantProps<typeof button> & HTMLArkProps<"button">

export const Button = (props: ButtonProps) => {
  const [variantProps, classProp, buttonProps] = splitProps(
    props,
    ["variant", "theme", "size", "shape"],
    ["class"]
  )
  return <ark.button class={cn(button(variantProps), classProp.class)} {...buttonProps} />
}
