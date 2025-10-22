import { useNavigate } from "@solidjs/router"
import { onCleanup, onMount } from "solid-js"
import { useAchievements } from "~/lib/achievements"

const Inspector = () => {
  const navigate = useNavigate()
  const { unlockAchievement } = useAchievements()

  onMount(() => {
    navigate("/achievements")
    onCleanup(() => {
      setTimeout(() => unlockAchievement("DOMINATION"), 1000)
    })
  })

  return <></>
}

export default Inspector
