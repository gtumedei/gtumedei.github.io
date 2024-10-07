import { Dialog as ArkDialog, ark } from "@ark-ui/solid"
import { tv } from "tailwind-variants"
import { button } from "~/components/ui/button"
import { createStyleContext } from "~/lib/style-context"

export const dialog = tv(
  {
    slots: {
      trigger: "",
      backdrop:
        "bg-on-base/50 dark:bg-base-200/50 backdrop-blur fixed top-0 left-0 z-50 h-screen w-screen data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      positioner: "flex px-4 py-12 fixed top-0 left-0 z-50 h-screen w-screen",
      content:
        "bg-base-100 dark:bg-base-200 flex flex-col max-h-full overflow-y-auto gap-6 p-6 rounded-3xl border border-on-base/10 shadow-md shadow-black/5 m-auto relative outline-none data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      header: "flex flex-col gap-2",
      title: "text-lg font-semibold",
      description: "text-on-base/70",
      actions: "flex gap-2 justify-end",
      closeTrigger: "",
      x: [button({ variant: "ghost", shape: "square", size: "sm" }), "absolute top-3 right-3"],
    },
    variants: {},
  },
  { twMerge: false }
)
const { withProvider, withContext, withPlainRecipe } = createStyleContext(dialog)

export const Dialog = Object.assign(withProvider(ArkDialog.Root), {
  Trigger: withPlainRecipe(ArkDialog.Trigger, "trigger"),
  Backdrop: withContext(ArkDialog.Backdrop, "backdrop"),
  Positioner: withPlainRecipe(ArkDialog.Positioner, "positioner"),
  Content: withPlainRecipe(ArkDialog.Content, "content"),
  Header: withPlainRecipe(ark.div, "header"),
  Title: withPlainRecipe(ArkDialog.Title, "title"),
  Description: withPlainRecipe(ArkDialog.Description, "description"),
  Actions: withPlainRecipe(ark.div, "actions"),
  CloseTrigger: withPlainRecipe(ArkDialog.CloseTrigger, "closeTrigger"),
  X: withPlainRecipe(ArkDialog.CloseTrigger, "x"),
})
