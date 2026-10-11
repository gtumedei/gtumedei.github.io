import { RouteSectionProps } from "@solidjs/router"
import Background from "~/components/layout/background"
import Footer from "~/components/layout/footer"
import Header from "~/components/layout/header"

const BaseLayout = (props: RouteSectionProps) => {
  return (
    <>
      <Background />
      <div class="container grow sm:border-x border-transparent mx-auto">
        <Header />
        <main class="grow flex flex-col pt-14 md:px-6 lg:px-10 xl:px-14">{props.children}</main>
        <Footer />
      </div>
    </>
  )
}

export default BaseLayout
