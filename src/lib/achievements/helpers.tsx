import { makePersisted } from "@solid-primitives/storage"
import { useCurrentMatches, useLocation } from "@solidjs/router"
import { createEffect, createSignal, on, onCleanup, onMount, Show } from "solid-js"
import { createStore, reconcile } from "solid-js/store"
import { isServer } from "solid-js/web"
// import SplashCursor from "~/components/splash-cursor"
import { useAchievements } from "~/lib/achievements"
import { create } from "~/lib/context"
import env from "~/lib/env"
import { Accent, accents, Theme, themes, useTheme } from "~/lib/theme"

// TODO: find a way to not break everything when a new property is added to progress
// Right now if the user already has some progress the new property doesn't get set
export const [AchievementsProgressProvider, useAchievementsProgress] = create(() => {
  const defaultValues = () => ({
    visitor: {
      pages: [] as string[],
    },
    returningVisitor: {
      firstVisitTime: null as number | null,
    },
    deepDiver: {
      clickedLinks: [] as string[],
    },
    customizationAddict: {
      themes: [] as Theme[],
      accents: [] as Accent[],
    },
  })

  const [progress, setProgress] = makePersisted(createStore(defaultValues()), {
    name: "gtumedei-io-achievements-progress",
    storage: isServer ? undefined : localStorage,
  })

  const resetProgress = () => setProgress(reconcile(defaultValues()))

  return { progress, setProgress, resetProgress }
})

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
  const [cheatModeOn, setCheatModeOn] = createSignal(false)

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
          setCheatModeOn(true)
        }
      } else {
        konamiIndex = 0
      }
    }
    document.addEventListener("keydown", konamiHandler)
    onCleanup(() => document.removeEventListener("keydown", konamiHandler))
  })

  /* return (
    <Show when={cheatModeOn()}>
      <SplashCursor />
    </Show>
  ) */
  return <></>
}

const Helpers = {
  Visitor,
  ReturningVisitor,
  CustomizationAddict,
  InspectorGadget,
  Cheater,
}

export default Helpers
