import { A } from "@solidjs/router"
import { HttpStatusCode } from "@solidjs/start"
import { button } from "~/components/ui/button"

const NotFoundPage = () => {
  return (
    <>
      <HttpStatusCode code={404} />
      <div class="text-center space-y-4 m-auto">
        <p class="text-lg tracking-wide font-mono font-bold text-on-base/50">404</p>
        <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-wider">Page not found</h1>
        <p class="text-on-base/70 text-balance">
          Sorry, but I couldn't find the page you are looking for.
        </p>
        <A href="/" class={button({ variant: "subtle" })}>
          Go back home
        </A>
      </div>
    </>
  )
}

export default NotFoundPage
