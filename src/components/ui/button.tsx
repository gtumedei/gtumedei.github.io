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
        solid: "shadow-sm",
        outline:
          "border-on-base/20 bg-transparent text-on-base shadow-sm hover:bg-on-base/5 focus-visible:ring-on-base/10 [&:where(:disabled,[data-disabled])]:!border-on-base/10 [&:where(:disabled,[data-disabled])]:!bg-transparent [&:where(:disabled,[data-disabled])]:!text-on-base/50",
        subtle: "[&:where(:disabled,[data-disabled])]:!bg-neutral/5",
        ghost:
          "border-transparent bg-transparent text-on-base hover:bg-on-base/5 focus-visible:border-on-base/20 focus-visible:ring-on-base/10 [&:where(:disabled,[data-disabled])]:!bg-transparent [&:where(:disabled,[data-disabled])]:!text-on-base/50",
        link: "border-transparent !h-min !px-0",
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
        theme: "neutral",
        class:
          "bg-neutral border-transparent text-on-neutral hover:bg-neutral/90 focus-visible:ring-neutral/20 [&:where(:disabled,[data-disabled])]:!bg-neutral/20 [&:where(:disabled,[data-disabled])]:!text-on-base/50",
      },
      {
        variant: "solid",
        theme: "accent",
        class:
          "bg-accent border-transparent text-on-accent hover:bg-accent/90 focus-visible:ring-accent/20 [&:where(:disabled,[data-disabled])]:!bg-accent/30 [&:where(:disabled,[data-disabled])]:!text-on-base/50",
      },
      {
        variant: "solid",
        theme: "info",
        class:
          "bg-info border-transparent text-on-info hover:bg-info/90 focus-visible:ring-info/20 [&:where(:disabled,[data-disabled])]:!bg-info/30 [&:where(:disabled,[data-disabled])]:!text-on-base/50",
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
        variant: "subtle",
        theme: "neutral",
        class:
          "border-transparent bg-neutral/10 text-neutral hover:bg-neutral/15 focus-visible:border-neutral/15 focus-visible:ring-neutral/10 [&:where(:disabled,[data-disabled])]:!text-neutral/50",
      },
      {
        variant: "subtle",
        theme: "accent",
        class:
          "border-transparent bg-accent/15 text-accent hover:bg-accent/20 focus-visible:border-accent/15 focus-visible:ring-accent/10 [&:where(:disabled,[data-disabled])]:!text-accent/50",
      },
      {
        variant: "subtle",
        theme: "info",
        class:
          "border-transparent bg-info/15 text-info hover:bg-info/20 focus-visible:border-info/15 focus-visible:ring-info/10 [&:where(:disabled,[data-disabled])]:!text-info/50",
      },
      {
        variant: "subtle",
        theme: "success",
        class:
          "border-transparent bg-success/15 text-success hover:bg-success/20 focus-visible:border-success/15 focus-visible:ring-success/10 [&:where(:disabled,[data-disabled])]:!text-success/50",
      },
      {
        variant: "subtle",
        theme: "warning",
        class:
          "border-transparent bg-warning/15 text-warning hover:bg-warning/20 focus-visible:border-warning/15 focus-visible:ring-warning/10 [&:where(:disabled,[data-disabled])]:!text-warning/50",
      },
      {
        variant: "subtle",
        theme: "error",
        class:
          "border-transparent bg-error/15 text-error hover:bg-error/20 focus-visible:border-error/15 focus-visible:ring-error/10 [&:where(:disabled,[data-disabled])]:!text-error/50",
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
      {
        variant: "link",
        theme: "info",
        class:
          "text-info hover:text-info/80 focus-visible:border-info/20 focus-visible:ring-info/10 [&:where(:disabled,[data-disabled])]:!bg-transparent [&:where(:disabled,[data-disabled])]:!text-info/50",
      },
      {
        variant: "link",
        theme: "success",
        class:
          "text-success hover:text-success/80 focus-visible:border-success/20 focus-visible:ring-success/10 [&:where(:disabled,[data-disabled])]:!bg-transparent [&:where(:disabled,[data-disabled])]:!text-success/50",
      },
      {
        variant: "link",
        theme: "warning",
        class:
          "text-warning hover:text-warning/80 focus-visible:border-warning/20 focus-visible:ring-warning/10 [&:where(:disabled,[data-disabled])]:!bg-transparent [&:where(:disabled,[data-disabled])]:!text-warning/50",
      },
      {
        variant: "link",
        theme: "error",
        class:
          "text-error hover:text-error/80 focus-visible:border-error/20 focus-visible:ring-error/10 [&:where(:disabled,[data-disabled])]:!bg-transparent [&:where(:disabled,[data-disabled])]:!text-error/50",
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
