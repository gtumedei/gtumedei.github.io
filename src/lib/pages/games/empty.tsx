import GameLayout from "~/lib/layout/game-layout"
import AspectRatio from "~/lib/ui/aspect-ratio"

const EmptyGame = () => {
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
