import { A, useLocation } from "@solidjs/router"
import { pages } from "content-collections"
import { For } from "solid-js"
import { cn } from "tailwind-variants"
import TablerCopyright from "~icons/tabler/copyright"

const Footer = () => {
  const allPages = pages.items.filter((it) => it.showInFooter)

  const location = useLocation()

  return (
    <footer class="text-sm flex max-sm:flex-col justify-between max-sm:items-center gap-6 px-6 md:px-12 lg:px-16 xl:px-20 py-12 border-t border-on-base/10">
      {location.pathname != "/" && (
        <nav class="flex">
          <ul class="font-medium flex flex-wrap max-sm:justify-center -mx-2">
            <For each={allPages}>
              {(item) => (
                <li>
                  <A
                    href={item.path}
                    class="inline-flex leading-7 hover:text-accent px-2 rounded-full focus-ring transition-all"
                  >
                    {item.title}
                  </A>
                </li>
              )}
            </For>
          </ul>
        </nav>
      )}
      <p
        class={cn(
          "text-on-base/50 max-sm:text-center inline-flex items-center",
          location.pathname == "/" && "mx-auto",
        )}
      >
        <TablerCopyright class="text-sm mr-1.5" /> 2021 - {new Date().getFullYear()} Gianni Tumedei
      </p>
    </footer>
  )
}

export default Footer
