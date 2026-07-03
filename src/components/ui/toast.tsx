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
    <div class="w-full [@media(min-width:600px)]:w-(--width) bg-base-100 rounded-5 relative">
      <div class="bg-accent/30 blur-md absolute inset-0 z-[-1]" />
      <div class="bg-accent/5 flex p-4 gap-4 rounded-5 border border-accent/50">
        {props.icon && (
          <div class="h-6 w-6 flex justify-center items-center text-accent mb-auto">
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
  )
}

export const Toaster = () => <Sonner class="dark:theme-dark" toastOptions={{ unstyled: true }} />
