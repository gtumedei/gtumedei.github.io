import type { HTMLArkProps } from "@ark-ui/solid"
import { splitProps, type ParentComponent } from "solid-js"
import cn from "~/lib/cn"

export const ProgressiveBlur: ParentComponent<
  HTMLArkProps<"div"> & {
    gradient?: boolean
    gradientClass?: string
  }
> = (props) => {
  const [gradientProps, divProps] = splitProps(props, ["gradient", "gradientClass"])
  return (
    <div
      {...divProps}
      class={cn("isolate absolute z-0 !pointer-events-none", props.class)}
      aria-hidden="true"
    >
      <div class="relative w-full h-full">
        {gradientProps.gradient && (
          <div
            class={cn(
              "absolute inset-0 bg-gradient-to-b from-base-100 to-transparent",
              props.gradientClass
            )}
          />
        )}
        <div
          class="absolute inset-0 backdrop-blur-[1px]"
          style="mask-image: linear-gradient(to top, transparent 0%, black 16.7%, black 33.3%, transparent 50%);"
        />
        <div
          class="absolute inset-0 backdrop-blur-[2px]"
          style="mask-image: linear-gradient(to top, transparent 16.7%, black 33.3%, black 50%, transparent 66.7%);"
        />
        <div
          class="absolute inset-0 backdrop-blur-[3px]"
          style="mask-image: linear-gradient(to top, transparent 33.3%, black 50%, black 66.7%, transparent 83.3%);"
        />
        <div
          class="absolute inset-0 backdrop-blur-[4px]"
          style="mask-image: linear-gradient(to top, transparent 50%, black 66.7%, black 83.3%, transparent 100%);"
        />
        <div
          class="absolute inset-0 backdrop-blur-[5px]"
          style="mask-image: linear-gradient(to top, transparent 66.7%, black 83.3%, black 100%);"
        />
        <div
          class="absolute inset-0 backdrop-blur-[6px]"
          style="mask-image: linear-gradient(to top, transparent 83.3%, black 100%);"
        />
      </div>
    </div>
  )
}
