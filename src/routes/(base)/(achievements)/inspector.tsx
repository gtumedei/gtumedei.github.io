import { Meta } from "@solidjs/meta"
import { useNavigate } from "@solidjs/router"
import { onCleanup, onMount } from "solid-js"
import { useAchievements } from "~/lib/achievements"

const Inspector = () => {
  const navigate = useNavigate()
  const { unlockAchievement } = useAchievements()

  onMount(() => {
    navigate("/achievements", { replace: true })
    onCleanup(() => {
      setTimeout(() => unlockAchievement("INSPECTOR_GADGET"), 1000)
    })
  })

  return <Meta name="robots" content="noindex" />
}

export default Inspector
