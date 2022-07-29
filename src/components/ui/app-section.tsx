import type { ParentComponent } from "solid-js"

const AppSection: ParentComponent<{ class?: string }> = (props) => (
  <section class={`w-full flex flex-col items-center ${props.class ? props.class : ""}`}>
    <div class="container flex-grow px-6 py-32">
      {props.children}
    </div>
  </section>
)

export default AppSection
