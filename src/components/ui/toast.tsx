import { Component, JSX } from "solid-js"
import { ExternalToast, Toaster as Sonner, toast as sonner } from "solid-sonner"
import { Button } from "~/components/ui/button"

type ToastOptions = { title: string; icon?: () => JSX.Element } & Pick<
  ExternalToast,
  "description" | "action" | "duration"
>

export const toast = (options: ToastOptions) => {
  const { icon, ...rest } = options
  sonner.custom((id) => <Toast id={id} {...options} />, rest)
}

const Toast: Component<{ id: string | number } & ToastOptions> = (props) => {
  return (
    <div class="w-full [@media(min-width:600px)]:w-(--width) bg-base-300 rounded-xl relative">
      <div class="bg-linear-to-br from-yellow-500/30 dark:from-yellow-200/30 to-orange-500/30 dark:to-orange-200/30 blur-md absolute inset-0 z-[-1]" />
      <div class="bg-linear-to-br from-yellow-500 dark:from-yellow-200 to-orange-500 dark:to-orange-200 rounded-xl p-px">
        <div class="bg-base-100/95 backdrop-blur-md flex p-4 gap-4 rounded-[11px]">
          {props.icon && (
            <div class="h-6 w-6 flex justify-center items-center text-amber-500 dark:text-amber-200 mb-auto">
              {props.icon()}
            </div>
          )}
          <div class="grow">
            <p class="text-xs leading-6 font-semibold text-on-base/70 cursor-default">
              {props.title}
            </p>
            {props.description && (
              <p class="text-sm font-semibold text-on-base mb-0.5 cursor-default">
                {props.description}
              </p>
            )}
          </div>
          {props.action && (
            <Button
              variant="subtle"
              size="xs"
              class="my-auto"
              onClick={(e) => {
                props.action?.onClick(e)
                sonner.dismiss(props.id)
              }}
            >
              {props.action.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export const Toaster = () => <Sonner class="dark:theme-dark" toastOptions={{ unstyled: true }} />
