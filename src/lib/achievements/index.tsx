import { useLocation, useNavigate } from "@solidjs/router"
import { createSignal, onMount, ParentComponent } from "solid-js"
import { toast, Toaster } from "~/components/ui/toast"
import achievements, { Achievement } from "~/lib/content/achievements"
import { create } from "~/lib/context"
import TablerTrophy from "~icons/tabler/trophy"
import JSConfetti from "js-confetti"
import { useThemeColors } from "~/lib/theme/colors"
import Helpers from "~/lib/achievements/helpers"

const LOCAL_STORAGE_ACHIEVEMENTS_KEY = "gtumedei-io-achievements"

const [_AchievementsProvider, useAchievements] = create(() => {
  const [completedAchievements, _setCompletedAchievements] = createSignal<Achievement[]>([])
  const setCompletedAchievements = (value: Achievement[]) => {
    _setCompletedAchievements(value)
    localStorage.setItem(LOCAL_STORAGE_ACHIEVEMENTS_KEY, JSON.stringify(value))
  }

  let confetti: JSConfetti | null = null

  onMount(() => {
    _setCompletedAchievements(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACHIEVEMENTS_KEY) ?? "[]")
    )

    confetti = new JSConfetti()
  })

  const location = useLocation()
  const navigate = useNavigate()
  const themeColors = useThemeColors()

  const unlockAchievement = (slug: Achievement) => {
    const achievement = Object.entries(achievements).find(([s]) => s == slug)?.[1]
    if (!achievement) return

    const currentAchievements = completedAchievements()
    if (currentAchievements.includes(slug)) return

    setCompletedAchievements([...currentAchievements, slug])
    toast("Achievement unlocked", {
      icon: <TablerTrophy />,
      description: achievement.name,
      action:
        location.pathname != "/achievements"
          ? {
              label: "See all",
              onClick: () => {
                navigate("/achievements")
              },
            }
          : undefined,
    })
    confetti?.addConfettiAtPosition({
      confettiColors: [
        themeColors.blueAccent,
        themeColors.orangeAccent,
        themeColors.tealAccent,
        themeColors.pinkAccent,
      ],
      confettiNumber: 400,
      // Set the dispatch position based on the toast position
      confettiDispatchPosition: {
        x: window.innerWidth >= 600 ? window.innerWidth - 210 : window.innerWidth / 2,
        y: window.innerHeight - 72,
      },
    })
  }

  const resetAchievements = () => setCompletedAchievements([])

  return {
    completedAchievements,
    unlockAchievement,
    resetAchievements,
  }
})

export const AchievementsProvider: ParentComponent = (props) => {
  return (
    <_AchievementsProvider>
      {props.children}

      <Helpers.Visitor />
      <Helpers.Cheater />
      <Helpers.Inspector />

      <Toaster />
    </_AchievementsProvider>
  )
}

export { useAchievements }
