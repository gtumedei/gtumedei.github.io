import { animate, AnimationOptionsWithOverrides, ElementOrSelector, MotionKeyframesDefinition, timeline } from "motion"
import { onMount } from "solid-js"

export const motion = (
  elem: HTMLInputElement,
  value: () => [keyframes: MotionKeyframesDefinition, options?: AnimationOptionsWithOverrides]
) => {
  const [keyframes, options] = value()
  animate(elem, keyframes, options)
}

export const createMotion = (
  elems: () => ElementOrSelector,
  keyframes: MotionKeyframesDefinition,
  options?: AnimationOptionsWithOverrides
) => onMount(() => animate(elems(), keyframes, options))

export const createTimeline = (
  definition: Parameters<typeof timeline>[0],
  options?: Parameters<typeof timeline>[1]
) => onMount(() => timeline(definition, options))
