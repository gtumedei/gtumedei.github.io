import { Component } from "solid-js"
import { stagger } from "motion"
import { createTimeline } from "~/composables/motion"

const TechPage: Component = () => {

  createTimeline([
    [".motion-1", { opacity: 1, x: [-10, 0] }, { duration: 0.4, delay: stagger(0.15) }]
  ])

  return (
    <>
      <h1 class="motion-1 text-4xl font-bold tracking-wider mb-2">Games</h1>
      <p class="motion-1 font-mono mb-12">
        This page is a work in progress. Things are going to be added soon(ish).
      </p>
    </>
  )
}

export default TechPage
