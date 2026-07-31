import { Popover as ArkPopover } from "@ark-ui/solid"
import { tv } from "tailwind-variants/lite"
import { createStyleContext } from "~/lib/style-context"

export const popover = tv({
  slots: {
    trigger: "",
    indicator: "data-[state=open]:rotate-45 transition-transform",
    positioner: "",
    content: [
      "bg-base-100 dark:bg-base-200 flex flex-col gap-4 p-6 rounded-5 border border-neutral/10 shadow-lg shadow-black/5",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[placement=top]:origin-bottom data-[placement=top-start]:origin-bottom-left data-[placement=top-end]:origin-bottom-right",
      "data-[placement=bottom]:origin-top data-[placement=bottom-start]:origin-top-left data-[placement=bottom-end]:origin-top-right",
      "data-[placement=left]:origin-right data-[placement=left-start]:origin-top-right data-[placement=left-end]:origin-bottom-right",
      "data-[placement=right]:origin-left data-[placement=right-start]:origin-top-left data-[placement=right-end]:origin-bottom-left",
    ],
    title: "font-semibold",
    description: "text-sm text-on-base/70",
    closeTrigger: "",
  },
  variants: {},
})
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
