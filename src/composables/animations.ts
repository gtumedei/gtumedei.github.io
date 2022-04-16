import { onBeforeUnmount, onMounted } from "vue"
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import gsap from "gsap"

export const useHomeAnimations = () => {
  onMounted(async () => {
    const common: gsap.TweenVars = { opacity: 0, duration: 0.5 }

    // Hero
    gsap.from(".hero-item", {
      y: 32,
      delay: 1,
      stagger: 0.1,
      ...common
    })
    gsap.from(".hero-actions", {
      y: 32,
      delay: 2,
      ...common
    })

    // Headings
    const headings = [
      { items: "#featured-heading > *", trigger: "#featured-heading" },
      { items: "#knowledge-heading > *", trigger: "#knowledge-heading" },
      { items: "#about-heading > *", trigger: "#about-heading" },
      { items: "#contact-heading > *", trigger: "#contact-heading" }
    ]
    headings.forEach(({ items, trigger }) => {
      gsap.from(items, {
        scrollTrigger: { trigger, start: "100% bottom" },
        y: 32,
        stagger: 0.1,
        ...common
      })
    })

    await new Promise(r => setTimeout(r, 10)) // Nice Vue, very nice

    const lgAndUp = useBreakpoints(breakpointsTailwind).greater("lg")

    // Featured
    document.querySelectorAll(".featured-item").forEach(featuredItem => {
      const textElem = featuredItem.querySelector(".featured-text")
      const start = lgAndUp.value ? "100% bottom" : "75% bottom"
      gsap.from(textElem, {
        scrollTrigger: { trigger: featuredItem, start },
        x: lgAndUp.value ? 0 : -32,
        y: lgAndUp.value ? 32 : 0,
        ...common
      })
      const imgElem = featuredItem.querySelector(".featured-img")
      if (imgElem) {
        gsap.from(imgElem, {
          scrollTrigger: { trigger: featuredItem, start },
          x: 32,
          ...common
        })
      }
      const imgFlipElem = featuredItem.querySelector(".featured-img-flip")
      if (imgFlipElem) {
        gsap.from(imgFlipElem, {
          scrollTrigger: { trigger: featuredItem, start },
          x: lgAndUp.value ? -32 : 32,
          ...common
        })
      }
    })

    // Current tech stack
    /* gsap.from(".carousel", {
      scrollTrigger: { trigger: ".carousel", start: "80% bottom" },
      y: 32,
      ...common
    }) */

    // Other technologies
    gsap.from(".tech-grid .tech-item", {
      scrollTrigger: { trigger: ".tech-grid", start: "130px bottom" },
      y: 32,
      stagger: 0.02,
      ...common
    })

    // Profile
    gsap.from(".profile-img", {
      scrollTrigger: { trigger: ".profile-img", start: "100% bottom" },
      x: lgAndUp.value ? -32 : 0,
      y: lgAndUp.value ? 0 : 32,
      ...common
    })
    gsap.from(".profile-text", {
      scrollTrigger: { trigger: ".profile-text", start: "100% bottom" },
      x: lgAndUp.value ? 0 : -32,
      y: lgAndUp.value ? 32 : 0,
      ...common
    })

    // Resume
    gsap.from(".resume-heading", {
      scrollTrigger: { trigger: ".resume-heading", start: "100% bottom" },
      y: 32,
      ...common
    })
    gsap.from(".resume-item", {
      scrollTrigger: { trigger: ".resume-grid", start: "130px bottom" },
      y: 32,
      stagger: 0.15,
      ...common
    })

    // Contact
    gsap.from(".contact-links-heading", {
      scrollTrigger: { trigger: ".contact-links-heading", start: "100% bottom" },
      y: 32,
      ...common
    })
    gsap.from(".contact-form-heading", {
      scrollTrigger: { trigger: ".contact-form-heading", start: "100% bottom" },
      y: 32,
      ...common
    })
    gsap.from(".contact-form-grid", {
      scrollTrigger: { trigger: ".contact-form-grid", start: "50% bottom" },
      y: 32,
      ...common
    })
    document.querySelectorAll(".contact-link").forEach(contactLink => {
      gsap.from(contactLink, {
        scrollTrigger: { trigger: contactLink, start: "100% bottom" },
        x: lgAndUp.value ? 32 : -32,
        ...common
      })
    })
  })

  onBeforeUnmount(() => gsap.killTweensOf("*"))
}
