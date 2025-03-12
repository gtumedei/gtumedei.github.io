import { ParentComponent } from "solid-js"

const PageHeadingIcon: ParentComponent = (props) => {
  return (
    <div class="inline-flex rounded-full border border-on-base/5 p-3 relative mb-3 -mt-3 -translate-x-3">
      <div class="inline-flex bg-base-200/50 rounded-full border border-on-base/10 p-3">
        <div class="h-12 w-12 inline-flex justify-center items-center bg-base-200 text-accent text-lg rounded-full border border-on-base/20 p-3">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default PageHeadingIcon
