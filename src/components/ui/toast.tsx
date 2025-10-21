import { Toaster as Sonner } from "solid-sonner"
import { button } from "~/components/ui/button"

export { toast } from "solid-sonner"

export const Toaster = () => (
  <Sonner
    class="dark:theme-dark"
    toastOptions={{
      unstyled: true,
      classes: {
        toast:
          "w-full [@media(min-width:600px)]:w-[var(--width)] bg-base-100 flex p-4 gap-4 rounded-xl border border-on-base/10 shadow-lg [&_[data-content]]:flex [&_[data-content]]:flex-col [&_[data-content]]:justify-center [&_[data-content]]:gap-0 [&_[data-icon]]:!h-8 [&_[data-icon]]:!w-5 [&_[data-icon]]:!ml-1 [&_[data-icon]]:!mr-0 [&_[data-icon]]:mt-0 [&_[data-icon]]:mb-auto",
        title: "text-sm font-semibold my-1.5",
        description: "text-xs text-on-base/70 text-sm text-on-base/70 mb-0.5",
        actionButton: button({
          variant: "subtle",
          size: "xs",
          class: "shrink-0 my-auto !transition-colors",
        }),
        default: "[&_[data-icon]]:text-accent",
        info: "[&_[data-icon]]:text-info",
        success: "[&_[data-icon]]:text-success",
        warning: "[&_[data-icon]]:text-warning",
        error: "[&_[data-icon]]:text-error",
      },
    }}
  />
)
