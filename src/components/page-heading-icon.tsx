import { ComponentProps, ParentComponent, splitProps } from "solid-js"
import cn from "~/lib/cn"

const PageHeadingIcon: ParentComponent<ComponentProps<"div">> = (props) => {
  const [localProps, divProps] = splitProps(props, ["children", "class"])

  return (
    <div
      {...divProps}
      class={cn(
        "inline-flex rounded-full border border-base-300/70 p-3 relative mb-3 -mt-3 -ml-3",
        localProps.class
      )}
    >
      <div class="inline-flex bg-base-200/50 rounded-full border border-base-300 p-3">
        <div class="h-12 w-12 inline-flex justify-center items-center bg-base-300 text-accent text-lg rounded-full p-3">
          {localProps.children}
        </div>
      </div>
    </div>
  )
}

export default PageHeadingIcon
