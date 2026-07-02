import { Component, ComponentProps } from "solid-js"
import { cn } from "tailwind-variants"

const PageAvatarRoot: Component<ComponentProps<"div">> = (props) => {
  return (
    <div
      {...props}
      class={cn(
        "w-20 h-20 inline-flex bg-base-200/90 group-data-wallpaper/html:bg-base-200/50 backdrop-blur-xs p-2 rounded-full border border-on-base/10 shadow shadow-black/3 transition-colors",
        props.class,
      )}
    >
      {props.children}
    </div>
  )
}

const PageAvatarIcon: Component<ComponentProps<"div">> = (props) => {
  return (
    <div
      {...props}
      class={cn(
        "w-full h-full flex justify-center items-center bg-base-300 text-accent text-lg rounded-full transition-colors",
        props.class,
      )}
    />
  )
}

const PageAvatar = Object.assign(PageAvatarRoot, {
  Icon: PageAvatarIcon,
})

export default PageAvatar
