import { A, useLocation } from "@solidjs/router"
import { For } from "solid-js"
import TablerCopyright from "~icons/tabler/copyright"

const Footer = () => {
  const location = useLocation()

  const mainPages = [
    { href: "/projects", label: "Projects" },
    { href: "/tech", label: "Tech" },
    { href: "/minigames", label: "Minigames" },
    { href: "/contact", label: "Contact" },
  ]
  const otherPages = [
    { href: "/components", label: "Components" },
    { href: "/achievements", label: "Achievements" },
  ]

  return (
    <footer class="text-sm flex max-sm:flex-col justify-between max-sm:items-center gap-6 px-6 md:px-12 lg:px-16 xl:px-20 py-12 border-t border-on-base/10">
      <nav class="flex">
        <ul class="font-medium flex flex-wrap max-sm:justify-center -mx-2">
          <For each={location.pathname == "/" ? otherPages : [...mainPages, ...otherPages]}>
            {(item) => (
              <li>
                <A
                  href={item.href}
                  class="inline-flex leading-7 hover:text-accent px-2 rounded-full focus-ring transition-all"
                >
                  {item.label}
                </A>
              </li>
            )}
          </For>
        </ul>
      </nav>
      <p class="text-on-base/50 max-sm:text-center inline-flex items-center">
        <TablerCopyright class="text-sm mr-1.5" /> 2021 - {new Date().getFullYear()} Gianni Tumedei
      </p>
    </footer>
  )
}

export default Footer
