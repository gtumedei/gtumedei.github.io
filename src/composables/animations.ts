import { onBeforeUnmount, onMounted } from "vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import gsap from "gsap"

export const useHomeAnimations = () => {
  onMounted(async () => {
    const common: gsap.TweenVars = { opacity: 0, duration: 0.5 }

    // Hero
    gsap.from("#hero", {
      y: 32,
      delay: 0.5,
      ...common
    })

    await new Promise(r => setTimeout(r, 10)) // Nice Vue, very nice

    // Featured
    const lgAndUp = useBreakpoints(breakpointsTailwind).greater("lg")
    document.querySelectorAll(".featured-text").forEach(elem => gsap.from(elem, {
      scrollTrigger: { trigger: elem, start: "50% bottom" },
      y: 32,
      ...common
    }))
    document.querySelectorAll(".featured-img").forEach(elem => gsap.from(elem, {
      scrollTrigger: { trigger: elem, start: "50% bottom" },
      x: lgAndUp.value ? 32 : 0,
      y: lgAndUp.value ? 0 : 32,
      ...common
    }))
    document.querySelectorAll(".featured-img-flip").forEach(elem => gsap.from(elem, {
      scrollTrigger: { trigger: elem, start: "50% bottom" },
      x: lgAndUp.value ? -32 : 0,
      y: lgAndUp.value ? 0 : 32,
      ...common
    }))

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
    gsap.from(".resume-item", {
      scrollTrigger: { trigger: ".resume-grid", start: "130px bottom" },
      opacity: 0,
      y: 32,
      duration: 0.5,
      stagger: 0.15
    })
  })

  onBeforeUnmount(() => gsap.killTweensOf("*"))
}
