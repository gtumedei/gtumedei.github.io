import type { Component } from "solid-js"
import AspectRatio from "~/components/ui/aspect-ratio"
import { GameLayout } from "~/components/ui/game"

const EmptyGame: Component = () => {
  return (
    <GameLayout
      mobileMenu={<>mobile</>}
      leftMenu={<>left</>}
      rightMenu={<>rightright</>}
    >
      <AspectRatio w={9} h={16}>
        <div class="h-full w-full bg-red-500 bg-opacity-50"></div>
      </AspectRatio>
    </GameLayout>
  )
}

export default EmptyGame
