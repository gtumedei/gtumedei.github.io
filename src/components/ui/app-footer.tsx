import type { Component } from "solid-js"
import MdiCardsDiamondOutline from "~icons/mdi/cards-diamond-outline"

const AppFooter: Component = () => {
  return (
    <footer class="container max-w-4xl flex p-3 mt-12">
      <a href="/" class="btn icon m-auto" aria-label="Go Home">
        <MdiCardsDiamondOutline />
      </a>
    </footer>
  )
}

export default AppFooter
