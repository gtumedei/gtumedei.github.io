import { timeline, TimelineDefinition, TimelineOptions } from "motion"
import { onMount } from "solid-js"

export * from "motion"

export const createTimeline = (definition: TimelineDefinition, options?: TimelineOptions) =>
  onMount(() => timeline(definition, options))
