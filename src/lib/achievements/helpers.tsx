import { useCurrentMatches, useLocation } from "@solidjs/router"
import { createEffect, createMemo, createSignal, on, onCleanup, onMount, Show } from "solid-js"
import { Portal } from "solid-js/web"
import SplashCursor from "~/components/splash-cursor"
import { button } from "~/components/ui/button"
import { Dialog } from "~/components/ui/dialog"
import { useAchievements } from "~/lib/achievements"
import { useAchievementsProgress } from "~/lib/achievements/progress"
import env from "~/lib/env"
import { accents, themes, useTheme } from "~/lib/theme"

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

const SuperStar = () => {
  const { completedAchievements } = useAchievements()
  const { superModeOn } = useTheme()

  return (
    <Show when={completedAchievements().includes("SUPER_STAR") && superModeOn()}>
      <SplashCursor />
    </Show>
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
      '''"',#JGS/_|_\\###,---''
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
              <div class="bg-gradient-to-b from-accent-orange/30 via-accent-pink/30 to-accent-blue/30 blur-md rounded-full absolute inset-0" />
              <div class="bg-gradient-to-b from-accent-orange via-accent-pink to-accent-blue rounded-full absolute inset-0" />
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
