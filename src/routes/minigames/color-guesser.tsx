import { createEffect, createSignal, onCleanup } from "solid-js"
import { Transition } from "solid-transition-group"
import GameLayout from "~/components/game-layout"
import Meta from "~/components/meta"
import AspectRatio from "~/components/ui/aspect-ratio"
import { Button } from "~/components/ui/button"
import tooltip from "~/lib/directives/tooltip"
import { ColorGuesserBoard } from "~/minigames/color-guesser/board"
import { ColorGuesserGameProvider, useColorGuesserGame } from "~/minigames/color-guesser/core"
import { ColorGuesserDialogs } from "~/minigames/color-guesser/dialogs"
import TablerChartBar from "~icons/tabler/chart-bar"
import TablerFlameFilled from "~icons/tabler/flame-filled"
import TablerMenu from "~icons/tabler/menu"

const ColorGuesserGame = () => {
  return (
    <>
      <Meta
        title="Color Guesser"
        description="Are you nerd enough to guess a color based on its RGB code? Let's find out! HSL is also available for the classy ones."
      />
      <ColorGuesserGameProvider>
        <GameLayout
          mobileMenu={<MobileMenu />}
          leftDesktopMenu={<LeftMenu />}
          rightDesktopMenu={<RightMenu />}
        >
          <div class="relative h-full pt-6 pb-24 px-3">
            <AspectRatio w={1} h={1}>
              <ColorGuesserBoard />
            </AspectRatio>
            <ColorIndicator />
          </div>
          <ColorGuesserDialogs />
        </GameLayout>
      </ColorGuesserGameProvider>
    </>
  )
}

const MobileMenu = () => {
  const ctx = useColorGuesserGame()

  tooltip
  return (
    <header class="w-full flex items-center gap-3 p-3">
      <h1 class="font-heading tracking-normal text-xl mb-1 grow ml-3">Color Guesser</h1>
      <div class="flex gap-4">
        <Button
          variant="subtle"
          size="lg"
          shape="circle"
          onClick={() => ctx.ui.setDialogState("stats")}
          asChild={(props) => <button {...props()} use:tooltip={["Stats", "bottom"]} />}
        >
          <TablerChartBar />
        </Button>
        <Button
          variant="subtle"
          size="lg"
          shape="circle"
          onClick={() => ctx.ui.setDialogState("menu")}
          asChild={(props) => <button {...props()} use:tooltip={["Menu", "bottom"]} />}
        >
          <TablerMenu />
        </Button>
      </div>
    </header>
  )
}

const LeftMenu = () => {
  return (
    <header class="w-48 p-6">
      <div class="h-10">
        <h1 class="font-heading tracking-normal text-xl whitespace-nowrap">Color Guesser</h1>
      </div>
    </header>
  )
}

const RightMenu = () => {
  const ctx = useColorGuesserGame()

  tooltip
  return (
    <div class="w-48 flex justify-end gap-4 p-6">
      <Button
        variant="subtle"
        size="lg"
        shape="circle"
        onClick={() => ctx.ui.setDialogState("stats")}
        asChild={(props) => <button {...props()} use:tooltip={["Stats", "bottom"]} />}
      >
        <TablerChartBar />
      </Button>
      <Button
        variant="subtle"
        size="lg"
        shape="circle"
        onClick={() => ctx.ui.setDialogState("menu")}
        asChild={(props) => <button {...props()} use:tooltip={["Menu", "bottom"]} />}
      >
        <TablerMenu />
      </Button>
    </div>
  )
}

const ColorIndicator = () => {
  const ctx = useColorGuesserGame()

  return (
    <div class="absolute bottom-6 left-0 w-full flex">
      <div class="flex bg-base-200/90 px-6 py-2.5 rounded-full border border-on-base/10 shadow-md shadow-black/3 m-auto relative">
        <p class="text-on-base/70">
          Color code: <span class="text-on-base font-mono">{ctx.game.color}</span>
        </p>
        <StreakCounter />
      </div>
    </div>
  )
}

const StreakCounter = () => {
  const ctx = useColorGuesserGame()

  const [bump, setBump] = createSignal(false)
  let previousStreak = ctx.game.streak

  createEffect(() => {
    const currentStreak = ctx.game.streak
    if (currentStreak > previousStreak) {
      setBump(true)
      const timeout = setTimeout(() => setBump(false), 150)
      onCleanup(() => clearTimeout(timeout))
    }
    previousStreak = currentStreak
  })

  const animateScale = (el: Element, done: () => void) => {
    const animation = el.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
      { duration: 150, easing: "ease-out" },
    )
    animation.finished.then(done)
  }

  const animateFade = (el: Element, done: () => void) => {
    const animation = el.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 200,
      easing: "ease-out",
    })
    animation.finished.then(done)
  }

  return (
    <Transition onEnter={animateScale} onExit={animateFade}>
      {ctx.game.streak > 1 && (
        <div class="absolute top-3.5 right-0 translate-x-[calc(100%+1rem)]">
          <div class="w-10 h-10 flex relative">
            <TablerFlameFilled class="text-3xl text-red-400 darK:text-red-300/50 absolute-center-x -top-2.5 -z-1" />
            <div class="h-5 w-5 flex bg-base-100 rounded-full m-auto">
              <span
                class="text-sm font-semibold m-auto transition-transform duration-150"
                classList={{ "scale-125": bump(), "scale-100": !bump() }}
              >
                {ctx.game.streak}
              </span>
            </div>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default ColorGuesserGame
