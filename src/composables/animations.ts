import { onBeforeUnmount, onMounted } from "vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import gsap from "gsap"

export const useHomeAnimations = () => {
  onMounted(async () => {
    await new Promise(r => setTimeout(r, 10)) // Nice Vue, very nice

    const common: gsap.TweenVars = { opacity: 0, duration: 0.5 }

    // Hero
    gsap.from("#hero", {
      opacity: 0,
      y: 32,
      duration: 0.5,
      delay: 0.5
    })

    // Featured
    const lgAndUp = useBreakpoints(breakpointsTailwind).greater("lg")
    gsap.from(".featured-text", {
      scrollTrigger: { trigger: ".featured-text", start: "50% bottom" },
      y: 32,
      ...common
    })
    gsap.from(".featured-img", {
      scrollTrigger: { trigger: ".featured-img", start: "50% bottom" },
      x: lgAndUp.value ? 32 : 0,
      y: lgAndUp.value ? 0 : 32,
      ...common
    })
    gsap.from(".featured-img-flip", {
      scrollTrigger: { trigger: ".featured-img-flip", start: "50% bottom" },
      x: lgAndUp.value ? -32 : 0,
      y: lgAndUp.value ? 0 : 32,
      ...common
    })

    // Knowledge
    gsap.from("#knowledge-heading", {
      scrollTrigger: { trigger: "#knowledge-heading", start: "80% bottom" },
      opacity: 0,
      y: 32,
      duration: 0.5
    })

    // Current tech stack
    gsap.from(".carousel", {
      scrollTrigger: { trigger: ".carousel", start: "80% bottom" },
      opacity: 0,
      y: 32,
      duration: 0.5
    })

    // Other technologies
    gsap.from(".tech-item", {
      scrollTrigger: { trigger: ".tech-grid", start: "130px bottom" },
      opacity: 0,
      y: 32,
      duration: 0.5,
      stagger: 0.02
    })

    // About
    gsap.from("#about-heading", {
      scrollTrigger: { trigger: "#about-heading", start: "80% bottom" },
      opacity: 0,
      y: 32,
      duration: 0.5
    })

    // Profile
    gsap.from(".profile-img", {
      scrollTrigger: { trigger: ".profile-img", start: "50% bottom" },
      x: lgAndUp.value ? -32 : 0,
      y: lgAndUp.value ? 0 : 32,
      ...common
    })
    gsap.from(".profile-text", {
      scrollTrigger: { trigger: ".profile-text", start: "50% bottom" },
      y: 32,
      ...common
    })

    // Resume
    // TODO
  })

  onBeforeUnmount(() => gsap.killTweensOf("*"))
}
