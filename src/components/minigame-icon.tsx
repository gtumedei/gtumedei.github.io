import { Component, ComponentProps, splitProps } from "solid-js"
import { cn } from "tailwind-variants"
import ContentIcon from "~/lib/content-icons"

const MinigameIcon: Component<ComponentProps<"div"> & { icon: string }> = (props) => {
  const [localProps, divProps] = splitProps(props, ["icon", "class"])

  return (
    <div
      {...divProps}
      class={cn(
        "size-16 flex justify-center items-center text-2xl text-accent bg-base-200 rounded-5 border border-on-base/5 group-hover:border-accent/30 group-active:border-accent/30 relative overflow-hidden isolate transition-colors",
        localProps.class,
      )}
    >
      <div class="group-hover:bg-accent/10 group-active:bg-accent/10 transition-colors absolute inset-0 -z-2" />
      <div class="mask-[url('/texture.svg')] mask-repeat mask-size-[8px] bg-on-base/5 absolute inset-0 -z-1" />
      <ContentIcon icon={localProps.icon} />
    </div>
  )
}

export default MinigameIcon
