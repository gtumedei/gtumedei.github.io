import { RouteSectionProps } from "@solidjs/router"
import Footer from "~/components/layout/footer"
import Header from "~/components/layout/header"
import Wallpaper from "~/components/layout/wallpaper"

const BaseLayout = (props: RouteSectionProps) => {
  return (
    <>
      <Wallpaper />
      <div class="container grow sm:border-x border-transparent mx-auto">
        <Header />
        <main class="grow flex flex-col pt-14 md:px-6 lg:px-10 xl:px-14">{props.children}</main>
        <Footer />
      </div>
    </>
  )
}

export default BaseLayout
