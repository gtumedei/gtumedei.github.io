import { makePersisted } from "@solid-primitives/storage"
import { onMount } from "solid-js"
import { createStore, reconcile } from "solid-js/store"
import { isServer } from "solid-js/web"
import { create } from "~/lib/context"
import { Accent, Style, Theme } from "~/lib/theme"

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
    moddingManiac: {
      styles: [] as Style[],
      wallpaper: false,
      superMode: false,
    },
  })

  const [progress, setProgress] = makePersisted(createStore(defaultValues()), {
    name: "gtumedei-io-achievements-progress",
    storage: isServer ? undefined : localStorage,
  })

  const resetProgress = () => setProgress(reconcile(defaultValues()))

  // Make sure new achievement properties are persisted to local storage
  onMount(() => {
    const p = { ...progress }
    for (const [k, v] of Object.entries(defaultValues())) {
      // @ts-ignore
      if (!(k in p)) p[k] = v
    }
    setProgress(reconcile(p))
  })

  return { progress, setProgress, resetProgress }
})
