import { Switch as ArkToggle, type SwitchRootProps as ToggleRootProps } from "@ark-ui/solid"
import { Show, children, splitProps, type ParentComponent } from "solid-js"
import { tv, type VariantProps } from "tailwind-variants"
import cn from "~/lib/cn"

type ToggleVariantProps = VariantProps<typeof toggle>

export const toggle = tv({
  slots: {
    root: "flex gap-3",
    label: "text-sm font-medium text-on-base data-[disabled]:text-on-base/50",
    control:
      "shrink-0 h-5 w-8 flex justify-center items-center rounded-full border border-on-base/20 shadow-xs data-[state=checked]:bg-accent data-[state=indeterminate]:bg-accent data-[state=checked]:border-transparent data-[state=indeterminate]:border-transparent data-disabled:!bg-on-base/20 data-disabled:border-transparent data-disabled:shadow-none data-focus:ring ring-on-base/10 data-[state=checked]:ring-accent/20 transition-all",
    thumb:
      "h-3.5 w-3.5 rounded-full bg-on-base/50 data-[state=checked]:bg-on-neutral data-disabled:!bg-base-200 -translate-x-1.5 data-[state=checked]:translate-x-1.5 transition-all",
  },
  variants: {},
})

export const Toggle: ParentComponent<
  ToggleRootProps & ToggleVariantProps & { controlClass?: string; labelClass?: string }
> = (props) => {
  const [localProps, toggleProps] = splitProps(props, [
    "class",
    "controlClass",
    "labelClass",
    "children",
  ])
  const getChildren = children(() => localProps.children)
  const { root, control, label, thumb } = toggle()

  return (
    <ArkToggle.Root {...toggleProps} class={cn(root(), localProps.class)}>
      <ArkToggle.HiddenInput />
      <ArkToggle.Control class={cn(control(), localProps.controlClass)}>
        <ArkToggle.Thumb class={thumb()} />
      </ArkToggle.Control>
      <Show when={getChildren()}>
        <ArkToggle.Label class={cn(label(), localProps.labelClass)}>
          {getChildren()}
        </ArkToggle.Label>
      </Show>
    </ArkToggle.Root>
  )
}
