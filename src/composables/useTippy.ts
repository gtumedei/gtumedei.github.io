import { isRef, onMounted, ref, unref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { MaybeRef } from "@vueuse/core"
import tippy, { Instance, Placement } from "tippy.js"

const tippyInstances = ref<{
  elem: HTMLElement
  i18nKey: string
  placement: Placement
  instance: Instance
}[]>([])

export const createTippy = () => {
  const { t, locale } = useI18n()
  watch(locale, () => tippyInstances.value.forEach(i => i.instance.setContent(t(i.i18nKey))))
}

export const useTippy = (
  elemRef: MaybeRef<HTMLElement | undefined>,
  i18nKeyRef: MaybeRef<string>,
  placement: Placement = "top"
) => {
  onMounted(() => {
    const elem = unref(elemRef)
    const i18nKey = unref(i18nKeyRef)
    if (!elem) return

    const { t } = useI18n()

    // Create and store the new instance
    tippyInstances.value.push({
      elem,
      i18nKey,
      placement,
      instance: tippy(elem, { content: t(i18nKey), placement })
    })

    // If the i18n key is a ref, watch it to update the tooltip content
    if (isRef(i18nKeyRef)) {
      watch(i18nKeyRef, (val) => {
        const i = tippyInstances.value.find(i => i.elem == elem)
        if (!i) return
        i.i18nKey = val
        i.instance.setContent(t(i.i18nKey))
      })
    }
  })
}
