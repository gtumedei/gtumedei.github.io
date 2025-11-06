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
import SplashCursor from "~/components/splash-cursor"
import { button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import { useAchievements } from "~/lib/achievements"
import { useAchievementsProgress } from "~/lib/achievements/progress"
import cn from "~/lib/cn"
import env from "~/lib/env"
import { accents, themes, useTheme } from "~/lib/theme"
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
      }
    )
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
          localProps.class
        )}
        onClick={() => toggleDialog(true)}
        {...divProps}
      >
        <div class="w-full h-full rounded-full transform-3d transition-transform duration-700 relative group-hover:rotate-y-20 group-[.flipped]:rotate-y-180">
          {localProps.children}
          <div class="flex bg-base-100 dark:bg-neutral rounded-full border border-on-base/10 shadow shadow-black/5 backface-hidden rotate-y-180 absolute inset-0">
            <div class="bg-yellow-700/10 rounded-full absolute inset-0" />
            <div class="flex bg-yellow-700/20 rounded-full absolute inset-2 shadow-inner shadow-black/10">
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
              <div class="w-32 h-32 flex bg-base-100 dark:bg-neutral rounded-full border border-on-base/10 shadow shadow-black/5 mx-auto relative">
                <div class="bg-yellow-700/10 rounded-full absolute inset-0" />
                <div class="flex bg-yellow-700/20 rounded-full absolute inset-2 shadow-inner shadow-black/10">
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
                    You saw what others missed. As a reward, a new option has been unlocked in the
                    theme switcher.
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
          isCompleted() && "bg-amber-400/10 dark:bg-amber-200/10"
        )}
        data-motion="tech-item"
      >
        <TablerStarFilled
          class={cn(
            "group-hover:text-amber-400 group-hover:dark:text-amber-200 group-hover:scale-125 transition-all [view-transition-name:star]",
            isCompleted() && "text-amber-400 dark:text-amber-200",
            open() && "hidden"
          )}
        />
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content class="w-full max-w-sm text-center">
            <div class="w-32 h-32 bg-base-300 flex rounded-full mx-auto relative">
              <div class="bg-linear-to-b from-accent-orange/30 via-accent-pink/30 to-accent-blue/30 blur-md rounded-full absolute inset-0" />
              <div class="bg-linear-to-b from-accent-orange via-accent-pink to-accent-blue rounded-full absolute inset-0" />
              <div class="bg-base-300/95 backdrop-blur-md rounded-full absolute inset-px" />
              <div class="bg-amber-400/10 dark:bg-amber-200/5 rounded-full absolute inset-px" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class={cn(
                  "w-16 h-16 absolute-center [view-transition-name:star]",
                  !open() && "hidden"
                )}
                viewBox="0 0 16 16"
              >
                <g fill="none">
                  <path
                    fill="url(#SVGKG1LDe8x)"
                    d="M7.194 2.102a.9.9 0 0 1 1.614 0l1.521 3.082l3.401.494a.9.9 0 0 1 .5 1.535l-2.462 2.4l.581 3.387a.9.9 0 0 1-1.306.948L8.001 12.35l-3.042 1.6A.9.9 0 0 1 3.653 13l.58-3.387l-2.46-2.399a.9.9 0 0 1 .499-1.535l3.4-.494z"
                  />
                  <defs>
                    <linearGradient
                      id="SVGKG1LDe8x"
                      x1="14.5"
                      x2="1.125"
                      y1="14.332"
                      y2="1.72"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FF6F47" />
                      <stop offset="1" stop-color="#FFCD0F" />
                    </linearGradient>
                  </defs>
                </g>
              </svg>
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
    })
  )
  createEffect(
    on(accent, (accent) => {
      if (!progress.customizationAddict.accents.includes(accent))
        setProgress("customizationAddict", "accents", (v) => [...v, accent])
      checkCompletion()
    })
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
    console.log(inspectorGadgetArt)
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
            <div class="w-32 h-32 bg-base-300 flex rounded-full mx-auto relative">
              <div class="bg-linear-to-b from-accent-orange/30 via-accent-pink/30 to-accent-blue/30 blur-md rounded-full absolute inset-0" />
              <div class="bg-linear-to-b from-accent-orange via-accent-pink to-accent-blue rounded-full absolute inset-0" />
              <div class="bg-base-300/80 backdrop-blur-md rounded-full absolute inset-px" />
              <p class="text-6xl absolute-center">👾</p>
            </div>
            <Dialog.Header class="gap-2.5 mt-1">
              <Dialog.Title>
                {isCompleted() ? "Still cheating, huh?" : "Secret code detected"}
              </Dialog.Title>
              <Dialog.Description class="text-sm text-balance space-y-1">
                {isCompleted() ? (
                  <>
                    <p>
                      I get it, that combo feels too good to resist. But hey, the dotted theme is
                      already yours.
                    </p>
                    <p>No extra lives this time!</p>
                  </>
                ) : (
                  <>
                    <p>
                      Nice moves! You cracked the Konami Code and uncovered the hidden Dotted Theme.
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

const Helpers = {
  Visitor,
  ReturningVisitor,
  SuperStar,
  CustomizationAddict,
  InspectorGadget,
  Cheater,
}

export default Helpers
