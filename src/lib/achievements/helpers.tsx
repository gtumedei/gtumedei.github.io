import { useCurrentMatches, useLocation } from "@solidjs/router"
import {
  Component,
  ComponentProps,
  createEffect,
  createMemo,
  createSignal,
  on,
  onCleanup,
  onMount,
  Show,
  splitProps,
} from "solid-js"
import { Portal } from "solid-js/web"
import { cn } from "tailwind-variants"
import SplashCursor from "~/components/splash-cursor"
import { button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import { useAchievements } from "~/lib/achievements"
import { useAchievementsProgress } from "~/lib/achievements/progress"
import env from "~/lib/env"
import { accents, styles, themes, useTheme } from "~/lib/theme"
import TablerStarFilled from "~icons/tabler/star-filled"

const Visitor = () => {
  const { unlockAchievement } = useAchievements()
  const { progress, setProgress } = useAchievementsProgress()

  const location = useLocation()

  const matches = useCurrentMatches()
  const is404 = () => matches().some((m) => !!m.params.notFound)

  createEffect(
    on(
      () => location.pathname,
      () => {
        if (is404() || progress.visitor.pages.includes(location.pathname)) return
        setProgress("visitor", "pages", (v) => [...v, location.pathname])
        if (progress.visitor.pages.length == 5) unlockAchievement("VISITOR")
      },
    ),
  )

  return <></>
}

const ReturningVisitor = () => {
  const { unlockAchievement } = useAchievements()
  const { progress, setProgress } = useAchievementsProgress()

  onMount(async () => {
    if (progress.returningVisitor.firstVisitTime === null) {
      setProgress("returningVisitor", "firstVisitTime", Date.now())
    } else if (Date.now() - progress.returningVisitor.firstVisitTime >= 86_400_000) {
      await new Promise((r) => setTimeout(r, 750))
      unlockAchievement("RETURNING_VISITOR")
    }
  })

  return <></>
}

export const Keymaster: Component<ComponentProps<"div">> = (props) => {
  const [localProps, divProps] = splitProps(props, ["class", "children"])

  const [flipped, setFlipped] = createSignal(false)
  const [open, _setOpen] = createSignal(false)
  const setOpen = (open: boolean) => {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => _setOpen(open))
    } else {
      _setOpen(open)
    }
  }
  const toggleDialog = async (o: boolean) => {
    if (o === open()) return
    if (o) {
      setFlipped(true)
      await new Promise((r) => setTimeout(r, 600))
      setOpen(true)
    } else {
      setOpen(false)
      await new Promise((r) => setTimeout(r, 600))
      setFlipped(false)
    }
  }

  const { completedAchievements, unlockAchievement } = useAchievements()
  const isCompleted = createMemo(() => completedAchievements().includes("KEYMASTER"))

  return (
    <>
      <div
        class={cn(
          "relative w-24 h-24 mb-6 perspective-midrange group",
          flipped() && "flipped",
          localProps.class,
        )}
        onClick={() => toggleDialog(true)}
        {...divProps}
      >
        <div class="w-full h-full rounded-full transform-3d transition-transform duration-700 relative group-hover:rotate-y-20 group-[.flipped]:rotate-y-180">
          {localProps.children}
          <div class="flex bg-base-100 dark:bg-neutral rounded-full shadow shadow-black/5 backface-hidden rotate-y-180 absolute inset-0">
            <div class="bg-amber-700/20 rounded-full border border-on-base/10 absolute inset-0" />
            <div class="flex bg-amber-700/20 rounded-full absolute inset-2 shadow-inner shadow-black/10 overflow-hidden">
              <KeyBackgroundDecoration class="absolute top-0 left-0 h-full w-full fill-amber-950/10" />
              <KeyIcon
                class={cn("w-10 h-10 m-auto [view-transition-name:key]", open() && "hidden")}
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open()}
        onOpenChange={({ open }) => toggleDialog(open)}
        closeOnEscape={isCompleted()}
        closeOnInteractOutside={isCompleted()}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content class="w-full max-w-sm text-center">
              <div class="w-32 h-32 flex bg-base-100 dark:bg-neutral rounded-full shadow shadow-black/5 mx-auto relative">
                <div class="bg-amber-700/20 rounded-full border border-on-base/10 absolute inset-0" />
                <div class="flex bg-amber-700/20 rounded-full absolute inset-2 shadow-inner shadow-black/10 overflow-hidden">
                  <KeyBackgroundDecoration class="absolute top-0 left-0 h-full w-full fill-amber-950/10" />
                  <KeyIcon
                    class={cn("w-14 h-14 m-auto [view-transition-name:key]", !open() && "hidden")}
                  />
                </div>
              </div>
              <Dialog.Header class="gap-2.5 mt-1">
                <Dialog.Title>
                  {isCompleted() ? "This is the hidden key." : "You found the key!"}
                </Dialog.Title>
                <Dialog.Description class="text-sm text-balance space-y-1">
                  <p>
                    {isCompleted()
                      ? "Stop poking around or others are going to find out about it!"
                      : "You saw what others missed. As a reward, a new option has been unlocked in the theme switcher."}
                  </p>
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Actions class="grid grid-cols-1">
                <Dialog.CloseTrigger
                  class={button()}
                  onClick={async () => {
                    await new Promise((r) => setTimeout(r, 1000))
                    unlockAchievement("KEYMASTER")
                  }}
                >
                  {isCompleted() ? "Close" : "I'll keep the secret"}
                </Dialog.CloseTrigger>
              </Dialog.Actions>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
        <style>{`
        ::view-transition-group(key) {
          animation-duration: 0.5s;
          animation-timing-function: ease-in-out;
        }
        `}</style>
      </Dialog>
    </>
  )
}

const KeyIcon: Component<ComponentProps<"svg">> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" {...props}>
      <path
        fill="#31373D"
        d="M7.915 34.868c.725.725 1.313 1.313 2.417.21s-.665-2.871.439-3.975l.552-.552c1.104-1.104 2.872.664 3.974-.438c1.104-1.104.516-1.692-.21-2.417L12.41 25.02c-.725-.725-1.808-.819-2.417-.209l-4.964 4.964c-.61.609-.516 1.692.209 2.417z"
      />
      <path
        fill="#67757F"
        d="M1.03 33.772a2 2 0 0 0 2.829 0l19.07-19.069c-.101-2.727 4.95-4.95 3.536-6.364c-.781-.781-4.243 5.657-6.971 4.142L1.03 30.944a2 2 0 0 0 0 2.828"
      />
      <path
        fill="#31373D"
        d="M16.919 3.743a5.5 5.5 0 1 0 7.778 7.779a5.5 5.5 0 0 0-7.778-7.779m6.363 6.364a3.5 3.5 0 1 1-4.95-4.95a3.5 3.5 0 0 1 4.95 4.95"
      />
      <path
        fill="#31373D"
        d="M26.111 1.622A5.5 5.5 0 1 0 33.888 9.4a5.5 5.5 0 0 0-7.777-7.778m6.364 6.364a3.5 3.5 0 1 1-4.949-4.952a3.5 3.5 0 0 1 4.949 4.952"
      />
      <path
        fill="#31373D"
        d="M23.989 10.814a5.5 5.5 0 1 0 7.778 7.779a5.5 5.5 0 0 0-7.778-7.779m6.365 6.364a3.5 3.5 0 1 1-4.95-4.95a3.5 3.5 0 0 1 4.95 4.95"
      />
      <path
        fill="#67757F"
        d="M19.394 18.238a2 2 0 0 1-2.829 2.829l-2.829-2.829a2 2 0 1 1 2.829-2.828z"
      />
      <circle cx="26" cy="9" r="1" fill="#31373D" />
    </svg>
  )
}

const KeyBackgroundDecoration: Component<ComponentProps<"svg">> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" {...props}>
      <g fill-rule="evenodd">
        <path d="M77.17 0H80v2.83l-.1.1A39.9 39.9 0 0 1 74.64 20a39.9 39.9 0 0 1 5.24 17.06l.11.11v2.89c-.01 6.9-1.8 13.79-5.35 19.94A39.96 39.96 0 0 1 80 79.94V80h-2.83L66.84 69.66a39.83 39.83 0 0 1-24.1 10.25l.09.09h-5.66l.1-.1c-8.7-.58-17.22-4-24.1-10.23L2.82 80H0V79.94c.01-6.9 1.8-13.8 5.35-19.94A39.96 39.96 0 0 1 0 40.06V37.17l.1-.1A39.9 39.9 0 0 1 5.36 20 39.9 39.9 0 0 1 .1 2.94L0 2.83V0h2.83l-.1.1a39.83 39.83 0 0 1 24.1 10.24L37.18 0H40c0 6.92-1.78 13.83-5.35 20A39.96 39.96 0 0 1 40 40c0-6.92 1.78-13.83 5.35-20A39.96 39.96 0 0 1 40 0h2.83l10.33 10.34A39.83 39.83 0 0 1 77.26.09L77.17 0zm.77 77.94c-.3-5.52-1.8-11-4.49-16a40.18 40.18 0 0 1-5.17 6.34l9.66 9.66zm-12.52-9.7l-6.83-6.83-5.46 5.46-1.41 1.41-9.66 9.66c8.4-.45 16.69-3.68 23.36-9.7zm-23.07 6.58l7.99-7.98a40.05 40.05 0 0 1-3.79-4.9 37.88 37.88 0 0 0-4.2 12.88zM47.68 60a37.98 37.98 0 0 0 4.07 5.42L57.17 60l-5.42-5.42A38 38 0 0 0 47.68 60zm2.66-6.84a40.06 40.06 0 0 0-3.79 4.9 37.88 37.88 0 0 1-4.2-12.88l7.99 7.98zm1.38-1.44l1.41 1.41 5.46 5.46 6.83-6.84a37.85 37.85 0 0 0-23.36-9.7l9.66 9.67zM60 60l6.87 6.87A38.1 38.1 0 0 0 72.32 60a38.11 38.11 0 0 0-5.45-6.87L60 60zm-14.65 0a39.9 39.9 0 0 0-5.24 17.06l-.11.11-.1-.1A39.9 39.9 0 0 0 34.64 60a39.9 39.9 0 0 0 5.24-17.06l.11-.11.1.1A39.9 39.9 0 0 0 45.36 60zm9.23-48.25a37.85 37.85 0 0 1 23.36-9.7l-9.66 9.67-1.41 1.41-5.46 5.46-6.83-6.84zm13.67 13.67L62.83 20l5.42-5.42A38 38 0 0 1 72.32 20a37.98 37.98 0 0 1-4.07 5.42zm5.2-3.47a40.05 40.05 0 0 1-3.79 4.89l7.99 7.98c-.61-4.45-2.01-8.82-4.2-12.87zm-6.58 4.92l1.41 1.41 9.66 9.66a37.85 37.85 0 0 1-23.36-9.7l6.83-6.83 5.46 5.46zM53.13 13.13L60 20l-6.87 6.87A38.11 38.11 0 0 1 47.68 20a38.1 38.1 0 0 1 5.45-6.87zm-1.41-1.41l-9.66-9.66c.3 5.52 1.8 11 4.49 16a40.18 40.18 0 0 1 5.17-6.34zm-9.66 26.22c.3-5.52 1.8-11 4.49-16a40.18 40.18 0 0 0 5.17 6.34l-9.66 9.66zm26.22 13.78l9.66-9.66c-.3 5.52-1.8 11-4.49 16a40.18 40.18 0 0 0-5.17-6.34zm8.98-11.81L66.84 50.34a39.83 39.83 0 0 0-24.1-10.25l10.42-10.43a39.83 39.83 0 0 0 24.1 10.25zm-7.6-26.75a40.06 40.06 0 0 1 3.79 4.9 37.88 37.88 0 0 0 4.2-12.88l-7.99 7.98zm-31.72 28.9c-8.4.45-16.69 3.68-23.36 9.7l6.83 6.83 5.46-5.46 1.41-1.41 9.66-9.66zM22.83 60l5.42 5.42c1.54-1.7 2.9-3.52 4.07-5.42a38 38 0 0 0-4.07-5.42L22.83 60zm5.45 8.28l-1.41-1.41-5.46-5.46-6.83 6.84a37.85 37.85 0 0 0 23.36 9.7l-9.66-9.67zm9.37 6.54l-7.99-7.98a40.05 40.05 0 0 0 3.79-4.9 37.88 37.88 0 0 1 4.2 12.88zM20 60l-6.87-6.87A38.11 38.11 0 0 0 7.68 60a38.11 38.11 0 0 0 5.45 6.87L20 60zm17.26-19.9L26.84 29.65a39.83 39.83 0 0 1-24.1 10.25l10.42 10.43a39.83 39.83 0 0 1 24.1-10.25zm-35.2 1.96l9.66 9.66a40.18 40.18 0 0 0-5.17 6.33c-2.7-5-4.2-10.47-4.5-16zm4.49 19.89c-2.7 5-4.2 10.47-4.5 16l9.67-9.67a40.18 40.18 0 0 1-5.17-6.33zm31.1-16.77c-.61 4.45-2.01 8.82-4.2 12.87a40.06 40.06 0 0 0-3.79-4.89l7.99-7.98zm-4.2-23.23c2.7 5 4.2 10.47 4.5 16l-9.67-9.67c1.97-1.97 3.7-4.1 5.17-6.33zm-14.86-.54l6.83 6.84a37.85 37.85 0 0 1-23.36 9.7l9.66-9.67 1.41-1.41 5.46-5.46zm-8.25 5.43l-7.99 7.98c.61-4.45 2.01-8.82 4.2-12.87a40.04 40.04 0 0 0 3.79 4.89zm1.41-1.42A37.99 37.99 0 0 1 7.68 20a38 38 0 0 1 4.07-5.42L17.17 20l-5.42 5.42zm-5.2-7.37a40.04 40.04 0 0 1 3.79-4.89L2.35 5.18c.61 4.45 2.01 8.82 4.2 12.87zm6.58-4.92l-1.41-1.41-9.66-9.66a37.85 37.85 0 0 1 23.36 9.7l-6.83 6.83-5.46-5.46zm13.74 13.74L20 20l6.87-6.87A38.1 38.1 0 0 1 32.32 20a38.1 38.1 0 0 1-5.45 6.87zm6.58-8.82a40.18 40.18 0 0 0-5.17-6.33l9.66-9.66c-.3 5.52-1.8 11-4.49 16z" />
      </g>
    </svg>
  )
}

const SuperStar = () => {
  const { completedAchievements } = useAchievements()
  const { superModeOn } = useTheme()

  return (
    <Show when={completedAchievements().includes("SUPER_STAR") && superModeOn()}>
      <SplashCursor />
    </Show>
  )
}

export const SuperStarButton = () => {
  const { completedAchievements, unlockAchievement } = useAchievements()
  const isCompleted = createMemo(() => completedAchievements().includes("SUPER_STAR"))

  const [open, _setOpen] = createSignal(false)
  const setOpen = (open: boolean) => {
    if ("startViewTransition" in document) {
      document.startViewTransition(() => _setOpen(open))
    } else {
      _setOpen(open)
    }
  }

  return (
    <Dialog
      open={open()}
      onOpenChange={({ open }) => setOpen(open)}
      closeOnEscape={isCompleted()}
      closeOnInteractOutside={isCompleted()}
    >
      <Dialog.Trigger
        class={cn(
          "w-11 h-8 bg-base-300 hover:bg-amber-400/10 hover:dark:bg-amber-200/10 flex items-center gap-2 px-3 rounded-full cursor-pointer relative transition-colors group",
          isCompleted() && "bg-amber-400/10 dark:bg-amber-200/10",
        )}
        data-motion="tech-item"
      >
        <TablerStarFilled
          class={cn(
            "group-hover:text-amber-400 group-hover:dark:text-amber-200 group-hover:scale-125 transition-all [view-transition-name:star]",
            isCompleted() && "text-amber-400 dark:text-amber-200",
            open() && "hidden",
          )}
        />
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content class="w-full max-w-sm text-center">
            <div class="w-32 h-32 flex bg-base-100 dark:bg-neutral rounded-full shadow shadow-black/5 mx-auto relative">
              <div class="bg-indigo-800/40 rounded-full border border-on-base/10 absolute inset-0" />
              <div class="flex bg-indigo-800/40 rounded-full absolute inset-2 shadow-inner shadow-black/10 overflow-hidden">
                <StarBackgroundDecoration class="absolute inset-0 fill-indigo-950/10" />
                <StarBackgroundDecoration class="absolute inset-0 translate-y-full fill-indigo-950/10" />
              </div>
              <StarIcon
                class={cn(
                  "w-24 h-24 absolute-center [view-transition-name:star]",
                  !open() && "hidden",
                )}
              />
            </div>
            <Dialog.Header class="gap-2.5 mt-1">
              <Dialog.Title>
                {isCompleted() ? "This is your Super Star." : "You found the hidden Star!"}
              </Dialog.Title>
              <Dialog.Description class="text-sm text-balance space-y-1">
                <p>
                  A new toggle has appeared in the theme switcher: use it to turn your Super Mode on
                  and off.
                </p>
                <p>And then... wah-hoo! Move your cursor and feel the power sparkle!</p>
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Actions class="grid grid-cols-1">
              <Dialog.CloseTrigger
                class={button()}
                onClick={async () => {
                  await new Promise((r) => setTimeout(r, 500))
                  unlockAchievement("SUPER_STAR")
                }}
              >
                {isCompleted() ? "Close" : "Awesome!"}
              </Dialog.CloseTrigger>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
      <style>{`
      ::view-transition-group(star) {
        animation-duration: 0.5s;
        animation-timing-function: ease-in-out;
      }
      `}</style>
    </Dialog>
  )
}

const StarIcon: Component<ComponentProps<"svg">> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 24 24" {...props}>
      <defs>
        <linearGradient
          id="StarGradient"
          x1="14.5"
          x2="1.125"
          y1="14.332"
          y2="1.72"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF6F47" />
          <stop offset="1" stop-color="#FFCD0F" />
        </linearGradient>
        <filter id="ConfigurableGlow" x="-50%" y="-50%" width="800%" height="800%">
          <feGaussianBlur stdDeviation="1.5" result="blur" in="SourceGraphic" />
          <feFlood flood-color="#fdba74" flood-opacity="0.7" result="glowColor" />
          <feComposite in="glowColor" in2="blur" operator="in" result="coloredGlow" />
          <feMerge>
            <feMergeNode in="coloredGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none">
        <path
          fill="url(#StarGradient)"
          filter="url(#ConfigurableGlow)"
          d="M7.194 2.102a.9.9 0 0 1 1.614 0l1.521 3.082l3.401.494a.9.9 0 0 1 .5 1.535l-2.462 2.4l.581 3.387a.9.9 0 0 1-1.306.948L8.001 12.35l-3.042 1.6A.9.9 0 0 1 3.653 13l.58-3.387l-2.46-2.399a.9.9 0 0 1 .499-1.535l3.4-.494z"
        />
      </g>
    </svg>
  )
}

const StarBackgroundDecoration: Component<ComponentProps<"svg">> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 28" {...props}>
      <path d="M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z" />
    </svg>
  )
}

const CustomizationAddict = () => {
  const { theme, accent } = useTheme()
  const { unlockAchievement } = useAchievements()
  const { progress, setProgress } = useAchievementsProgress()

  const checkCompletion = () => {
    if (
      progress.customizationAddict.themes.length == themes.length &&
      progress.customizationAddict.accents.length == accents.length
    ) {
      unlockAchievement("CUSTOMIZATION_ADDICT")
    }
  }

  createEffect(
    on(theme, (theme) => {
      if (!progress.customizationAddict.themes.includes(theme))
        setProgress("customizationAddict", "themes", (v) => [...v, theme])
      checkCompletion()
    }),
  )
  createEffect(
    on(accent, (accent) => {
      if (!progress.customizationAddict.accents.includes(accent))
        setProgress("customizationAddict", "accents", (v) => [...v, accent])
      checkCompletion()
    }),
  )

  return <></>
}

const ModdingManiac = () => {
  const { style, showWallpaper, superModeOn } = useTheme()
  const { unlockAchievement } = useAchievements()
  const { progress, setProgress } = useAchievementsProgress()

  const checkCompletion = () => {
    if (
      progress.moddingManiac.styles.length == styles.length &&
      progress.moddingManiac.wallpaper == true &&
      progress.moddingManiac.superMode == true
    ) {
      unlockAchievement("MODDING_MANIAC")
    }
  }

  createEffect(
    on(style, (style) => {
      if (!progress.moddingManiac.styles.includes(style))
        setProgress("moddingManiac", "styles", (v) => [...v, style])
      checkCompletion()
    }),
  )
  createEffect(
    on(showWallpaper, (state) => {
      if (state == "on") setProgress("moddingManiac", "wallpaper", true)
      checkCompletion()
    }),
  )
  createEffect(
    on(superModeOn, (state) => {
      if (state) setProgress("moddingManiac", "superMode", true)
      checkCompletion()
    }),
  )

  return <></>
}

// Credits to https://ascii.co.uk/
const inspectorGadgetArt = `
               ___
         _..--"\\  '|'""--.._
      .-'       \\  |        ''-.
     /           \\_|___...----''\\
    |__,,..--""'(_)--..__      |
    '\\     _.--''.I._     ''--..'
      '''"',####/_|_\\###,---''
        ,#'  _.:'___':-._ '#,
       #'  ,~'-;(oIo);-'~, '#
       #   '~-(  |    )=~'  #
       #       | |_  |      #
       #       ; ._. ;      #
       #  _..-;|\\ - /|;-._  #
       #-'   /_ \\\\_// _\\  '-#
     /'#    ; /__\\-'__\\;    #'\\
    ;  #\\.--|  |O  O   |'-./#  ;
    |__#/   \\ _;O__O___/   \\#__|
     | #\\    [I_[_]__I]    /# |
     \\_(#   /  |O  O   \\   #)_/
           /   |        \\
          /    |         \\
         /    /\\          \\
        /     | '\\         ;
       ;      \\   '.       |
        \\-._.__\\     \\_..-'/
         '.\\  \\-.._.-/  /''
            \\_.\\    /._/
             \\_.;  ;._/
           .-'-./  \\.-'-.
          (___.'    '.___)

     Congratulations, Inspector!
     Grab your achievement here:
    ${env.public.PUBLIC_BASE_URL}/inspector
`

// Credits to https://ascii.co.uk/
export const dominationArt = `
<!--
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

Nice work, here is your achievement:
${env.public.PUBLIC_BASE_URL}/dominator
-->`

const InspectorGadget = () => {
  onMount(() => {
    if (import.meta.env.PROD) console.log(inspectorGadgetArt)
  })
  return <></>
}

const Cheater = () => {
  const { completedAchievements, unlockAchievement } = useAchievements()
  const isCompleted = createMemo(() => completedAchievements().includes("CHEATER"))

  const [open, setOpen] = createSignal(false)

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
          konamiIndex = 0
          setOpen(true)
        }
      } else {
        konamiIndex = 0
      }
    }
    document.addEventListener("keydown", konamiHandler)
    onCleanup(() => document.removeEventListener("keydown", konamiHandler))
  })

  return (
    <Dialog
      open={open()}
      onOpenChange={({ open }) => setOpen(open)}
      closeOnEscape={isCompleted()}
      closeOnInteractOutside={isCompleted()}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content class="w-full max-w-sm text-center">
            <div class="w-32 h-32 flex bg-base-100 dark:bg-neutral rounded-full shadow shadow-black/5 mx-auto relative">
              <div class="bg-fuchsia-800/20 rounded-full border border-on-base/10 absolute inset-0" />
              <div class="flex bg-fuchsia-800/20 rounded-full absolute inset-2 shadow-inner shadow-black/10 overflow-hidden">
                <CheaterBackgroundDecoration class="fill-fuchsia-950/10 absolute inset-0" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 72 72"
                  class="w-16 h-16 absolute-center"
                >
                  <path
                    fill="#8967aa"
                    d="M10 21v14h3v3h3v7h6v6h6v-6h16v6h6v-6h6v-7h3v-3h3V20h-6v5h-7v-5h-4v-6h-6v6h-7v-6h-6v6h-4v5h-6v-5h-6zm6 30h6v6h-6zm34 0h6v6h-6z"
                  />
                  <g stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M25.175 31h3.6v6h-3.6z" />
                    <path
                      fill="none"
                      d="M22 45h-6v-6m6.583-14v-5H26m22.708 5v-5h-3.416M13 35h-3V20h6v15m40 0V20h6v15h-3M26 20v-6h6v6m7 0v-6h6v6M16 35h3v3h-6v-3m46 0v3h-6v-3h3M16 51h6v6h-6zm34 0h6v6h-6zm-22-6v6h-6v-6m28 0h6v-6m-12 6v6h6v-6"
                    />
                    <path d="M43.425 31h3.6v6h-3.6z" />
                    <path fill="none" d="M28 45h16M32 20h7m-23 5h6m27 0h7" />
                  </g>
                </svg>
              </div>
            </div>
            <Dialog.Header class="gap-2.5 mt-1">
              <Dialog.Title>
                {isCompleted() ? "Still cheating, huh?" : "Secret code detected"}
              </Dialog.Title>
              <Dialog.Description class="text-sm text-balance space-y-1">
                {isCompleted() ? (
                  <>
                    <p>
                      I get it, that combo feels too good to resist. But hey, the additional themes
                      are already yours.
                    </p>
                    <p>No extra lives this time!</p>
                  </>
                ) : (
                  <>
                    <p>
                      Nice moves! You cracked the Konami Code and uncovered hidden theme options.
                      You should check out the theme switcher.
                    </p>
                    <p>Respect, player.</p>
                  </>
                )}
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Actions class="grid grid-cols-1">
              <Dialog.CloseTrigger
                class={button()}
                onClick={async () => {
                  await new Promise((r) => setTimeout(r, 500))
                  unlockAchievement("CHEATER")
                }}
              >
                {isCompleted() ? "Fair enough" : "Respect"}
              </Dialog.CloseTrigger>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog>
  )
}

const CheaterBackgroundDecoration: Component<ComponentProps<"svg">> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" {...props}>
      <g stroke="none" stroke-width="1" fill-rule="evenodd">
        <path d="M54.627417,1.33226763e-15 L55.4558441,0.828427125 L54.0416306,2.24264069 L51.7989899,-1.44328993e-15 L54.627417,7.10542736e-15 L54.627417,1.33226763e-15 Z M5.372583,-5.55111512e-16 L4.54415588,0.828427125 L5.95836944,2.24264069 L8.20101013,-1.44328993e-15 L5.372583,-7.77156117e-16 L5.372583,-5.55111512e-16 Z M48.9705627,6.32827124e-15 L52.627417,3.65685425 L51.2132034,5.07106781 L46.1421356,-1.44328993e-15 L48.9705627,5.21804822e-15 L48.9705627,6.32827124e-15 Z M11.0294373,-1.44328993e-15 L7.372583,3.65685425 L8.78679656,5.07106781 L13.8578644,1.22124533e-15 L11.0294373,-3.33066907e-16 L11.0294373,-1.44328993e-15 Z M43.3137085,2.10942375e-15 L49.7989899,6.48528137 L48.3847763,7.89949494 L40.4852814,2.10942375e-15 L43.3137085,-1.44328993e-15 L43.3137085,2.10942375e-15 Z M16.6862915,3.33066907e-16 L10.2010101,6.48528137 L11.6152237,7.89949494 L19.5147186,-3.33066907e-16 L16.6862915,-1.44328993e-15 L16.6862915,3.33066907e-16 Z M37.6568542,2.55351296e-15 L46.9705627,9.3137085 L45.5563492,10.7279221 L34.8284271,-5.55111512e-16 L37.6568542,-1.44328993e-15 L37.6568542,2.55351296e-15 Z M22.3431458,5.55111512e-16 L13.0294373,9.3137085 L14.4436508,10.7279221 L25.1715729,-1.11022302e-16 L22.3431458,-1.44328993e-15 L22.3431458,5.55111512e-16 Z M32,-3.33066907e-16 L44.1421356,12.1421356 L42.7279221,13.5563492 L30,0.828427125 L17.2720779,13.5563492 L15.8578644,12.1421356 L28,-3.33066907e-16 L32,-1.44328993e-15 L32,-3.33066907e-16 Z M0.284271247,-1.44328993e-15 L28.2842712,28 L26.8700577,29.4142136 L-2.15508222e-16,2.54415588 L-2.15508222e-16,4.71844785e-16 L0.284271247,4.71844785e-16 L0.284271247,-1.44328993e-15 Z M1.80408836e-15,5.372583 L25.4558441,30.8284271 L24.0416306,32.2426407 L3.33720546e-15,8.20101013 L-2.15508222e-16,5.372583 L1.80408836e-15,5.372583 Z M-2.15508222e-16,11.0294373 L22.627417,33.6568542 L21.2132034,35.0710678 L4.80878765e-15,13.8578644 L1.25607397e-15,11.0294373 L-2.15508222e-16,11.0294373 Z M-2.15508222e-16,16.6862915 L19.7989899,36.4852814 L18.3847763,37.8994949 L7.73346434e-15,19.5147186 L6.28036983e-16,16.6862915 L-2.15508222e-16,16.6862915 Z M1.66860273e-15,22.3431458 L16.9705627,39.3137085 L15.5563492,40.7279221 L-2.15508222e-16,25.1715729 L-2.15508222e-16,22.3431458 L1.66860273e-15,22.3431458 Z M-2.15508222e-16,28 L14.1421356,42.1421356 L12.7279221,43.5563492 L-2.15508222e-16,30.8284271 L-2.15508222e-16,28 L-2.15508222e-16,28 Z M-2.15508222e-16,33.6568542 L11.3137085,44.9705627 L9.89949494,46.3847763 L5.20282872e-16,36.4852814 L5.20282872e-16,33.6568542 L-2.15508222e-16,33.6568542 Z M-2.15508222e-16,39.3137085 L8.48528137,47.7989899 L7.07106781,49.2132034 L3.55271368e-15,42.1421356 L3.55271368e-15,39.3137085 L-2.15508222e-16,39.3137085 Z M-2.15508222e-16,44.9705627 L5.65685425,50.627417 L4.24264069,52.0416306 L3.55271368e-15,47.7989899 L2.66453526e-15,44.9705627 L-2.15508222e-16,44.9705627 Z M-2.15508222e-16,50.627417 L2.82842712,53.4558441 L1.41421356,54.8700577 L2.48058749e-15,53.4558441 L2.48058749e-15,50.627417 L-2.15508222e-16,50.627417 Z M54.627417,60 L30,35.372583 L5.372583,60 L8.20101013,60 L30,38.2010101 L51.7989899,60 L54.627417,60 L54.627417,60 Z M48.9705627,60 L30,41.0294373 L11.0294373,60 L13.8578644,60 L30,43.8578644 L46.1421356,60 L48.9705627,60 L48.9705627,60 Z M43.3137085,60 L30,46.6862915 L16.6862915,60 L19.5147186,60 L30,49.5147186 L40.4852814,60 L43.3137085,60 L43.3137085,60 Z M37.6568542,60 L30,52.3431458 L22.3431458,60 L25.1715729,60 L30,55.1715729 L34.8284271,60 L37.6568542,60 L37.6568542,60 Z M32,60 L30,58 L28,60 L32,60 L32,60 Z M59.7157288,3.33066907e-16 L31.7157288,28 L33.1299423,29.4142136 L60,2.54415588 L60,-1.44328993e-15 L59.7157288,-1.44328993e-15 L59.7157288,3.33066907e-16 Z M60,5.372583 L34.5441559,30.8284271 L35.9583694,32.2426407 L60,8.20101013 L60,5.372583 L60,5.372583 Z M60,11.0294373 L37.372583,33.6568542 L38.7867966,35.0710678 L60,13.8578644 L60,11.0294373 L60,11.0294373 Z M60,16.6862915 L40.2010101,36.4852814 L41.6152237,37.8994949 L60,19.5147186 L60,16.6862915 L60,16.6862915 Z M60,22.3431458 L43.0294373,39.3137085 L44.4436508,40.7279221 L60,25.1715729 L60,22.3431458 L60,22.3431458 Z M60,28 L45.8578644,42.1421356 L47.2720779,43.5563492 L60,30.8284271 L60,28 L60,28 Z M60,33.6568542 L48.6862915,44.9705627 L50.1005051,46.3847763 L60,36.4852814 L60,33.6568542 L60,33.6568542 Z M60,39.3137085 L51.5147186,47.7989899 L52.9289322,49.2132034 L60,42.1421356 L60,39.3137085 L60,39.3137085 Z M60,44.9705627 L54.3431458,50.627417 L55.7573593,52.0416306 L60,47.7989899 L60,44.9705627 L60,44.9705627 Z M60,50.627417 L57.1715729,53.4558441 L58.5857864,54.8700577 L60,53.4558441 L60,50.627417 L60,50.627417 Z M39.8994949,16.3847763 L41.3137085,14.9705627 L30,3.65685425 L18.6862915,14.9705627 L20.1005051,16.3847763 L30,6.48528137 L39.8994949,16.3847763 L39.8994949,16.3847763 Z M37.0710678,19.2132034 L38.4852814,17.7989899 L30,9.3137085 L21.5147186,17.7989899 L22.9289322,19.2132034 L30,12.1421356 L37.0710678,19.2132034 L37.0710678,19.2132034 Z M34.2426407,22.0416306 L35.6568542,20.627417 L30,14.9705627 L24.3431458,20.627417 L25.7573593,22.0416306 L30,17.7989899 L34.2426407,22.0416306 L34.2426407,22.0416306 Z M31.4142136,24.8700577 L32.8284271,23.4558441 L30,20.627417 L27.1715729,23.4558441 L28.5857864,24.8700577 L30,23.4558441 L31.4142136,24.8700577 L31.4142136,24.8700577 Z M56.8700577,59.4142136 L58.2842712,58 L30,29.7157288 L1.71572875,58 L3.12994231,59.4142136 L30,32.5441559 L56.8700577,59.4142136 L56.8700577,59.4142136 Z" />
      </g>
    </svg>
  )
}

const AchievementHelpers = {
  Visitor,
  ReturningVisitor,
  SuperStar,
  CustomizationAddict,
  ModdingManiac,
  InspectorGadget,
  Cheater,
}

export default AchievementHelpers
