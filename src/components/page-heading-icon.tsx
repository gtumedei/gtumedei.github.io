import { ComponentProps, ParentComponent, splitProps } from "solid-js"
import { cn } from "tailwind-variants"

const PageHeadingIcon: ParentComponent<ComponentProps<"div">> = (props) => {
  const [localProps, divProps] = splitProps(props, ["children", "class"])

  return (
    <div
      {...divProps}
      class={cn(
        "w-20 h-20 inline-flex bg-base-200/70 backdrop-blur-xs p-2 rounded-full border border-on-base/10 shadow shadow-black/3 mb-8",
        localProps.class
      )}
    >
      <div class="w-full h-full flex justify-center items-center bg-base-300 text-accent text-lg rounded-full">
        {localProps.children}
      </div>
    </div>
  )
}

export default PageHeadingIcon
