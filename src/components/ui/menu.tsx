import { Menu as ArkMenu } from "@ark-ui/solid"
import { tv } from "tailwind-variants/lite"
import { createStyleContext } from "~/lib/style-context"

export const menu = tv({
  defaultVariants: { size: "md" },
  slots: {
    trigger: "",
    contextTrigger: "",
    triggerItem:
      "w-full flex items-center rounded-lg text-sm text-on-base data-highlighted:bg-on-base/5 data-disabled:text-on-base/30 not-data-disabled:cursor-pointer transition-colors",
    positioner: "",
    content:
      "bg-base-100 dark:bg-base-200 rounded-2xl p-1.5 border border-on-base/10 shadow-lg shadow-black/5 outline-none cursor-default data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    item: "w-full flex items-center rounded-lg text-sm text-on-base data-highlighted:bg-on-base/5 data-disabled:text-on-base/30 not-data-disabled:cursor-pointer transition-colors",
    separator: "border-on-base/10 -mx-1 my-1",
    itemGroup: "",
    itemGroupLabel: "text-xs text-on-base/50 font-medium",
  },
  variants: {
    size: {
      sm: {
        triggerItem: "gap-2.5 px-2.5 py-1.5",
        item: "gap-2.5 px-2.5 py-1.5",
        itemGroupLabel: "px-2.5 py-1.5",
      },
      md: {
        triggerItem: "gap-3 px-3 py-2",
        item: "gap-3 px-3 py-2",
        itemGroupLabel: "px-3 py-2",
      },
    },
  },
})

const { withProvider, withContext, withPlainRecipe } = createStyleContext(menu)

export const Menu = Object.assign(withProvider(ArkMenu.Root), {
  Trigger: withPlainRecipe(ArkMenu.Trigger, "trigger"),
  ContextTrigger: withPlainRecipe(ArkMenu.ContextTrigger, "contextTrigger"),
  TriggerItem: withContext(ArkMenu.TriggerItem, "triggerItem"),
  Positioner: withPlainRecipe(ArkMenu.Positioner, "positioner"),
  Content: withPlainRecipe(ArkMenu.Content, "content"),
  Item: withContext(ArkMenu.Item, "item"),
  Separator: withPlainRecipe(ArkMenu.Separator, "separator"),
  ItemGroup: withPlainRecipe(ArkMenu.ItemGroup, "itemGroup"),
  ItemGroupLabel: withContext(ArkMenu.ItemGroupLabel, "itemGroupLabel"),
})
