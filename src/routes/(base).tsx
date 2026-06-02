import { RouteSectionProps } from "@solidjs/router"
import Footer from "~/components/layout/footer"
import Header from "~/components/layout/header"
import Wallpaper from "~/components/layout/wallpaper"

const BaseLayout = (props: RouteSectionProps) => {
  return (
    <>
      <div class="bg-base-200 dark:bg-black/40 fixed inset-y-0 left-0 w-[calc(100vw-var(--scrollbar-size))] -z-10">
        <div class="container h-full bg-base-100 sm:border-x border-on-base/10 dark:border-on-base/5 mx-auto" />
      </div>
      <div class="container grow sm:border-x border-transparent mx-auto">
        <Wallpaper />
        <Header />
        <main class="grow flex flex-col pt-14 md:px-6 lg:px-10 xl:px-14">{props.children}</main>
        <Footer />
      </div>
    </>
  )
}

export default BaseLayout
