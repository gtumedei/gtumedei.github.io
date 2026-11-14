import { Component, Show } from "solid-js"
import { Dynamic } from "solid-js/web"
import { contentIcons } from "~/lib/content-icons/generated"

const ContentIcon: Component<{ icon: string }> = (props) => {
  return (
    <Show when={props.icon.startsWith("~icons")} fallback={<div innerHTML={props.icon} />}>
      <Dynamic component={contentIcons[props.icon]} />
    </Show>
  )
}

export default ContentIcon
