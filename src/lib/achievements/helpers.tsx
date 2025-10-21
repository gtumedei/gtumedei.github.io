import { onCleanup, onMount } from "solid-js"
import { useAchievements } from "~/lib/achievements"
import env from "~/lib/env"

const Visitor = () => {
  return <></>
}

const Cheater = () => {
  const { unlockAchievement } = useAchievements()

  onMount(() => {
    const konamiCode = [
      "arrowup",
      "arrowup",
      "arrowdown",
      "arrowdown",
      "arrowleft",
      "arrowright",
      "arrowleft",
      "arrowright",
      "b",
      "a",
    ]
    let konamiIndex = 0

    const konamiHandler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key == konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          unlockAchievement("CHEATER")
          konamiIndex = 0
          // TODO: do something
        }
      } else {
        konamiIndex = 0
      }
    }
    document.addEventListener("keydown", konamiHandler)
    onCleanup(() => document.removeEventListener("keydown", konamiHandler))
  })

  return <></>
}

const trophyArt = `
        ___________
       '._==_=_==_.'
       .-\\:      /-.
      | (|:.     |) |
       '-|:.     |-'
         \\::.    /
          '::. .'
            ) (
          _' - '_
         '"""""""'

 Congratulations, Inspector!
 Grab your achievement here:
${env.public.PUBLIC_BASE_URL}/inspector
`

const Inspector = () => {
  onMount(() => {
    console.log(trophyArt)
  })
  return <></>
}

const Helpers = {
  Visitor,
  Cheater,
  Inspector,
}

export default Helpers
