import { A } from "@solidjs/router"
import { button } from "~/components/ui/button"
import TablerArrowBackUp from "~icons/tabler/arrow-back-up"
import TablerColorSwatch from "~icons/tabler/color-swatch"

const palette = [
  ["bg-red-600", "bg-red-500", "bg-red-400", "bg-red-300", "bg-red-200"],
  ["bg-orange-600", "bg-orange-500", "bg-orange-400", "bg-orange-300", "bg-orange-200"],
  ["bg-yellow-600", "bg-yellow-500", "bg-yellow-400", "bg-yellow-300", "bg-yellow-200"],
  ["bg-lime-600", "bg-lime-500", "bg-lime-400", "bg-lime-300", "bg-lime-200"],
  ["bg-green-600", "bg-green-500", "bg-green-400", "bg-green-300", "bg-green-200"],
  ["bg-teal-600", "bg-teal-500", "bg-teal-400", "bg-teal-300", "bg-teal-200"],
  ["bg-sky-600", "bg-sky-500", "bg-sky-400", "bg-sky-300", "bg-sky-200"],
  ["bg-blue-600", "bg-blue-500", "bg-blue-400", "bg-blue-300", "bg-blue-200"],
  ["bg-indigo-600", "bg-indigo-500", "bg-indigo-400", "bg-indigo-300", "bg-indigo-200"],
  ["bg-violet-600", "bg-violet-500", "bg-violet-400", "bg-violet-300", "bg-violet-200"],
  ["bg-purple-600", "bg-purple-500", "bg-purple-400", "bg-purple-300", "bg-purple-200"],
  ["bg-pink-600", "bg-pink-500", "bg-pink-400", "bg-pink-300", "bg-pink-200"],
]

const MinigamesPage = () => {
  return (
    <>
      <div class="lg:w-2/3 px-6">
        <A href="/" class={button({ variant: "raised", shape: "circle", class: "group" })}>
          <TablerArrowBackUp class="text-on-base/70 group-hover:text-on-base transition-colors" />
        </A>
        <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-wider mt-8 mb-6">
          Minigames
        </h1>
        <p class="text-on-base/70 tall-lines">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus accusamus, tempora quod
          placeat cumque in repellendus aut ea voluptas officia exercitationem voluptates impedit
          minima eaque fugiat quia, dignissimos perspiciatis harum?
        </p>
      </div>
      <div class="grid md:grid-cols-2 gap-y-6 py-20">
        <A
          href="/minigames/color-guesser"
          class="hover:bg-on-base/5 transition-colors duration-500 md:rounded-3xl p-6 group"
        >
          <div class="w-full aspect-[2/1] flex bg-base-200 group-hover:bg-on-base/5 rounded-2xl mb-6 rotate-3 group-hover:rotate-0 transition-all relative overflow-hidden">
            <div class="grid grid-cols-12 gap-2 p-2 w-max absolute-center opacity-70 transition-opacity">
              {palette.map((row) => (
                <div class="grid grid-rows-5 gap-2">
                  {row.map((color) => (
                    <div
                      class={`h-10 w-10 sm:h-12 sm:w-12 md:h-10 md:w-10 rounded-2xl ${color} group-hover:bg-accent transition-colors`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div class="h-52 w-52 bg-base-300 [mask-image:radial-gradient(circle,red,transparent_70%)] flex m-auto z-10">
              <TablerColorSwatch class="text-3xl m-auto" />
            </div>
          </div>
          <h2 class="text-lg font-medium group-hover:text-accent transition-colors mb-3">
            Color guesser
          </h2>
          <p class="text-sm text-on-base/70 tall-lines">
            Are you nerd enough to guess a color based on its RGB code? Let's find out! HSL is also
            available for the classy ones.
          </p>
        </A>
        <div class="md:grounded-3xl p-6">
          <div class="w-full aspect-[2/1] bg-base-300 rounded-2xl mb-6 -rotate-1"></div>
          <p class="text-sm text-on-base/70 tall-lines">
            More minigames might be coming soon! Or not, it really depends if I get inspired AND
            find the time to build them.
          </p>
        </div>
      </div>
    </>
  )
}

export default MinigamesPage
