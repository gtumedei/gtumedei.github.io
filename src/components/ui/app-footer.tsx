import type { Component } from "solid-js"
import MdiCopyright from "~icons/mdi/copyright"

const Footer: Component = () => {
  const year = new Date().getFullYear()
  return (
    <footer class="w-full flex flex-col items-center bg-primary-dark">
      <div class="container text-sm text-center py-11">
        <p class="inline-flex items-center"><MdiCopyright class="!text-sm mr-1" /> {year} · Gianni Tumedei</p>
      </div>
    </footer>
  )
}

export default Footer
