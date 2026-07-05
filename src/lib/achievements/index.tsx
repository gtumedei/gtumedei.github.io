import { useLocation, useNavigate } from "@solidjs/router"
import { achievements, Achievements } from "content-collections"
import JSConfetti from "js-confetti"
import { createSignal, onMount, ParentComponent } from "solid-js"
import { toast, Toaster } from "~/components/ui/toast"
import AchievementHelpers from "~/lib/achievements/helpers"
import { AchievementsProgressProvider, useAchievementsProgress } from "~/lib/achievements/progress"
import ContentIcon from "~/lib/content-icons"
import { create } from "~/lib/context"
import { useThemeColors } from "~/lib/theme/colors"

const LOCAL_STORAGE_ACHIEVEMENTS_KEY = "gtumedei-io-achievements"

export type Achievement = Achievements["items"][number]

const [_AchievementsProvider, useAchievements] = create(() => {
  const [completedAchievements, _setCompletedAchievements] = createSignal<string[]>([])
  const setCompletedAchievements = (value: string[]) => {
    _setCompletedAchievements(value)
    localStorage.setItem(LOCAL_STORAGE_ACHIEVEMENTS_KEY, JSON.stringify(value))
  }

  let confetti: JSConfetti | null = null

  onMount(() => {
    _setCompletedAchievements(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACHIEVEMENTS_KEY) ?? "[]"),
    )

    confetti = new JSConfetti()
  })

  const location = useLocation()
  const navigate = useNavigate()
  const themeColors = useThemeColors()

  const unlockAchievement = (code: string) => {
    const achievement = achievements.items.find((a) => a.code == code)
    if (!achievement) return

    const currentAchievements = completedAchievements()
    if (currentAchievements.includes(code)) return

    setCompletedAchievements([...currentAchievements, code])
    toast({
      icon: () => <ContentIcon icon={achievement.icon} />,
      title: "Achievement unlocked",
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
      duration: 8000,
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

  const { resetProgress } = useAchievementsProgress()

  const resetAchievements = () => {
    setCompletedAchievements([])
    resetProgress()
    unlockAchievement("ACHIEVEMENTCEPTION")
  }

  return {
    completedAchievements,
    unlockAchievement,
    resetAchievements,
  }
})

export const AchievementsProvider: ParentComponent = (props) => {
  return (
    <AchievementsProgressProvider>
      <_AchievementsProvider>
        {props.children}

        <AchievementHelpers.Visitor />
        <AchievementHelpers.ReturningVisitor />
        <AchievementHelpers.SuperStar />
        <AchievementHelpers.CustomizationAddict />
        <AchievementHelpers.ModdingManiac />
        <AchievementHelpers.InspectorGadget />
        <AchievementHelpers.Cheater />

        <Toaster />
      </_AchievementsProvider>
    </AchievementsProgressProvider>
  )
}

export { useAchievements }
