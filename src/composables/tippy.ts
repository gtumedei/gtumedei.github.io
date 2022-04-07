import { isRef, onMounted, ref, unref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { MaybeRef } from "@vueuse/core"
import tippy, { Instance, Placement } from "tippy.js"

const tippyItems = ref<{
  elem: HTMLElement
  i18nKey: string
  instance: Instance
}[]>([])

export const createTippy = () => {
  const { t, locale } = useI18n()
  watch(locale, () => tippyItems.value.forEach(i => i.instance.setContent(t(i.i18nKey))))
}

export const useTippy = (
  elemRef: MaybeRef<HTMLElement | undefined>,
  i18nKeyRef: MaybeRef<string>,
  placement: Placement = "top"
) => onMounted(() => {
  const elem = unref(elemRef)
  const i18nKey = unref(i18nKeyRef)
  if (!elem) return

  const { t } = useI18n()

  // Create and store the new instance
  const instance = tippy(elem, { content: t(i18nKey), placement })
  const item = { elem, i18nKey, instance }
  tippyItems.value.push(item)

  // If the i18n key is a ref, watch it to update the tooltip content
  if (isRef(i18nKeyRef)) {
    watch(i18nKeyRef, (val) => {
      item.i18nKey = val
      item.instance.setContent(t(item.i18nKey))
    })
  }
})
