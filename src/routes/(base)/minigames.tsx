import { A } from "@solidjs/router"
import { button } from "~/components/ui/button"
import TablerArrowBackUp from "~icons/tabler/arrow-back-up"

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
          <div class="h-56 w-full bg-base-300 rounded-2xl mb-6 rotate-3 group-hover:-rotate-2 transition-transform duration-500"></div>
          <h2 class="text-lg font-medium group-hover:text-accent transition-colors mb-3">
            Color guesser
          </h2>
          <p class="text-sm text-on-base/70 tall-lines">
            Are you nerd enough to guess a color based on its RGB code? Let's find out! HSL is also
            available for the classy ones.
          </p>
        </A>
        <div class="md:grounded-3xl p-6">
          <div class="h-56 w-full bg-base-300 rounded-2xl mb-6 -rotate-1"></div>
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
