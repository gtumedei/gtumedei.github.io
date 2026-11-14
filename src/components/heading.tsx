import { Component, ComponentProps, ParentComponent, splitProps, ValidComponent } from "solid-js"
import { Dynamic } from "solid-js/web"
import { cn } from "tailwind-variants"
import TablerLink from "~icons/tabler/link"

const HeadingRoot: ParentComponent<
  { slug: string; as?: ValidComponent } & ComponentProps<"div">
> = (props) => {
  const [localProps, divProps] = splitProps(props, ["slug", "as", "class", "children"])

  return (
    <div class={cn("inline-flex items-center gap-2 group", props.class)} {...divProps}>
      <Dynamic
        component={localProps.as ?? "h2"}
        id={localProps.slug}
        class="inline-block font-heading text-2xl scroll-m-12"
      >
        {localProps.children}
      </Dynamic>
      <HeadingAnchor slug={localProps.slug} />
    </div>
  )
}

const HeadingAnchor: Component<{ slug: string }> = (props) => {
  return (
    <a
      href={`#${props.slug}`}
      class="size-6 opacity-50 can-hover:opacity-0 can-hover:group-hover:opacity-50 hover:text-accent hover:opacity-100! translate-y-0.75 transition-all"
    >
      <TablerLink />
    </a>
  )
}

export const Heading = Object.assign(HeadingRoot, {
  Anchor: HeadingAnchor,
})
