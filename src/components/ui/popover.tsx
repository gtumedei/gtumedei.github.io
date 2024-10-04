import { Popover as ArkPopover } from "@ark-ui/solid"
import { tv } from "tailwind-variants"
import { createStyleContext } from "~/lib/style-context"

export const popover = tv(
  {
    slots: {
      trigger: "",
      indicator: "data-[state=open]:rotate-45 transition-transform",
      positioner: "",
      content:
        "bg-base-100 dark:bg-base-200 flex flex-col gap-4 p-6 rounded-2xl border border-neutral/10 shadow-md shadow-black/5 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      title: "font-semibold",
      description: "text-sm text-on-base/70",
      closeTrigger: "",
    },
    variants: {},
  },
  { twMerge: false }
)
const { withPlainRecipe } = createStyleContext(popover)

export const Popover = Object.assign(withPlainRecipe(ArkPopover.Root), {
  CloseTrigger: withPlainRecipe(ArkPopover.CloseTrigger, "closeTrigger"),
  Content: withPlainRecipe(ArkPopover.Content, "content"),
  Description: withPlainRecipe(ArkPopover.Description, "description"),
  Indicator: withPlainRecipe(ArkPopover.Indicator, "indicator"),
  Positioner: withPlainRecipe(ArkPopover.Positioner, "positioner"),
  Title: withPlainRecipe(ArkPopover.Title, "title"),
  Trigger: withPlainRecipe(ArkPopover.Trigger, "trigger"),
})
