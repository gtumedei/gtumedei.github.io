import { ark } from "@ark-ui/solid"
import { tv } from "tailwind-variants"
import { createStyleContext } from "~/lib/style-context"

export const formField = tv(
  {
    slots: {
      root: "flex flex-col gap-1.5",
      label: "text-sm font-medium ml-0.5",
      hint: "text-sm text-on-base/70",
    },
    variants: {},
  },
  { twMerge: false }
)

const { withPlainRecipe } = createStyleContext(formField)

export const FormField = Object.assign(withPlainRecipe(ark.label, "root"), {
  Label: withPlainRecipe(ark.div, "label"),
  Hint: withPlainRecipe(ark.div, "hint"),
})
