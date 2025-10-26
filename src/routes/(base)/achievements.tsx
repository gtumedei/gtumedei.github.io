import { Progress } from "@ark-ui/solid"
import { animate, stagger } from "motion"
import { Component, For, onMount } from "solid-js"
import { Portal } from "solid-js/web"
import KonamiJoypadPopover from "~/components/konami-joypad"
import Meta from "~/components/meta"
import PageHeadingIcon from "~/components/page-heading-icon"
import { button } from "~/components/ui/button"
import { Popover } from "~/components/ui/popover"
import { useAchievements } from "~/lib/achievements"
import { createBatchedInViewAnimation } from "~/lib/animation"
import achievements, { Achievement, AchievementProperties } from "~/lib/content/achievements"
import TablerTrophy from "~icons/tabler/trophy"

const AchievementPage = () => {
  const { completedAchievements } = useAchievements()

  onMount(() => {
    animate([
      [`[data-motion="image"]`, { opacity: 1, scale: [0.9, 1] }, { duration: 0.4 }],
      [
        `[data-motion="heading"]`,
        { opacity: 1, x: [-10, 0] },
        { duration: 0.4, delay: stagger(0.15), at: "<" },
      ],
    ])
  })
  createBatchedInViewAnimation(`[data-motion="achievement-item"]`)

  return (
    <>
      <Meta
        title="Achievements"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, veniam?"
      />
      <div class="lg:w-2/3 px-6">
        <PageHeadingIcon data-motion="image">
          <TablerTrophy />
        </PageHeadingIcon>
        <h1 class="font-heading text-4xl sm:text-5xl mb-6" data-motion="heading">
          Achievements
        </h1>
        <p class="text-on-base/70 tall-lines mb-6" data-motion="heading">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus accusamus, tempora quod
          placeat cumque in repellendus aut ea voluptas officia exercitationem voluptates impedit
          minima eaque fugiat quia, dignissimos perspiciatis harum?
        </p>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3" data-motion="heading">
          <AchievementsProgress />
          {completedAchievements().length > 0 && <ResetAchievementsPopover />}
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-6 px-6 py-20">
        <For each={Object.entries(achievements)}>
          {(achievement) =>
            achievement[0] == "PIECE_OF_CAKE" ? (
              <PieceOfCakeAchievementItem
                achievement={achievement[1]}
                unlocked={completedAchievements().includes(achievement[0])}
              />
            ) : (
              <AchievementItem
                achievementId={achievement[0] as Achievement}
                achievement={achievement[1]}
                unlocked={completedAchievements().includes(achievement[0] as Achievement)}
              />
            )
          }
        </For>
      </div>
    </>
  )
}

const ResetAchievementsPopover = () => {
  const { resetAchievements } = useAchievements()

  return (
    <Popover positioning={{ placement: "bottom" }} lazyMount unmountOnExit>
      <Popover.Trigger class={button({ variant: "subtle" })}>Reset progress</Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content class="max-w-72 p-5 origin-top">
            <p class="text-sm text-on-base/70">
              Are you sure you want to delete your achievements?
            </p>
            <div class="grid grid-cols-1 gap-2">
              <Popover.CloseTrigger class={button({ theme: "error" })} onClick={resetAchievements}>
                Yes, let's start all over
              </Popover.CloseTrigger>
              <Popover.CloseTrigger class={button({ variant: "subtle" })}>
                Actually, nevermind
              </Popover.CloseTrigger>
            </div>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover>
  )
}

const AchievementsProgress = () => {
  const { completedAchievements } = useAchievements()

  return (
    <div class="flex gap-2 items-center">
      <Progress.Root
        class="[--size:38px] [--thickness:6px]"
        value={completedAchievements().length}
        min={0}
        max={Object.keys(achievements).length}
      >
        <Progress.Circle>
          <Progress.CircleTrack class="stroke-neutral/10" />
          <Progress.CircleRange class="stroke-accent [stroke-linecap:round] transition-all" />
        </Progress.Circle>
      </Progress.Root>
      <p class="text-sm text-on-base/70 font-semibold">
        {completedAchievements().length} / {Object.keys(achievements).length} unlocked
      </p>
    </div>
  )
}

const AchievementItem: Component<{
  achievementId: Achievement
  achievement: AchievementProperties
  unlocked: boolean
}> = (props) => {
  return (
    <div
      class="flex flex-col px-4.5 py-4 rounded-2xl border border-on-base/10 data-[unlocked]:border-accent/50 border-dashed data-[unlocked]:border-solid group"
      {...(props.unlocked ? { "data-unlocked": true } : {})}
      data-motion="achievement-item"
    >
      <div class="flex justify-between mb-4">
        <div class="w-16 aspect-square clip-hexagon flex justify-center items-center text-2xl bg-on-base/5 opacity-50 group-data-[unlocked]:bg-accent/10 group-data-[unlocked]:text-accent group-data-[unlocked]:opacity-100 -translate-x-1">
          {props.achievement.icon()}
        </div>
        {props.achievementId == "CHEATER" && <KonamiJoypadPopover />}
      </div>
      <h2 class="text-lg font-medium text-on-base/50 group-data-[unlocked]:text-on-base mb-1">
        {props.achievement.name}
      </h2>
      <p class="text-sm text-on-base/30 group-data-[unlocked]:text-on-base/70 tall-lines">
        {props.achievement.description}
      </p>
    </div>
  )
}

const PieceOfCakeAchievementItem: Component<{
  achievement: AchievementProperties
  unlocked: boolean
}> = (props) => {
  const { unlockAchievement } = useAchievements()

  return (
    <button
      class="text-left flex flex-col px-4.5 py-4 rounded-2xl border border-on-base/10 hover:border-on-base/20 data-[unlocked]:border-accent/50 border-dashed data-[unlocked]:border-solid group transition-colors cursor-pointer data-[unlocked]:cursor-default"
      {...(props.unlocked ? { "data-unlocked": true } : {})}
      data-motion="achievement-item"
      onClick={() => unlockAchievement("PIECE_OF_CAKE")}
    >
      <div class="w-16 aspect-square clip-hexagon flex justify-center items-center text-2xl bg-on-base/5 opacity-50 group-data-[unlocked]:bg-accent/10 group-data-[unlocked]:text-accent group-data-[unlocked]:opacity-100 mb-4 -translate-x-1">
        {props.achievement.icon()}
      </div>
      <h2 class="text-lg font-medium text-on-base/50 group-data-[unlocked]:text-on-base mb-1">
        {props.achievement.name}
      </h2>
      <p class="text-sm text-on-base/30 group-data-[unlocked]:text-on-base/70 tall-lines">
        {props.achievement.description}
      </p>
    </button>
  )
}

export default AchievementPage
