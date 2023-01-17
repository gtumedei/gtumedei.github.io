const plugin = require("tailwindcss/plugin")
const apply = require("./apply")

module.exports = plugin(({ addComponents, addUtilities }) => {
  addComponents({
    // Links
    ".link": apply`text-accent hover:underline`,

    // Buttons
    ".btn": {
      ...apply`
        px-8 py-3 rounded-lg outline-none
        inline-flex justify-center items-center gap-3
        border border-transparent
        text-sm font-bold text-neutral bg-primary fill-neutral-100
        transition-all
      `,
      "&:disabled": {
        ...apply`!shadow-none cursor-not-allowed`,
        "&:not(.loading)": apply`opacity-40`
      },
      ".icon": apply`text-base`
    },
    ".btn-accent": {
      ...apply`
        text-inverted-neutral bg-accent
        hover:shadow-xl hover:shadow-accent-20
        focus:shadow-xl focus:shadow-accent-20
        active:shadow-lg active:shadow-accent-20
      `,
      "&:not(.loading):disabled": apply`bg-inverted-primary`
    },
    ".btn-outline": apply`
      border-neutral-8 text-accent bg-transparent
      hover:bg-accent-10 hover:border-accent
      focus:bg-accent-10 focus:border-accent
      active:bg-accent-20 active:border-accent
    `,
    ".btn-transparent": apply`
      bg-transparent hover:bg-neutral-8 focus:bg-neutral-8 active:bg-neutral-12
    `,
    ".btn-icon": {
      ...apply`p-3 bg-transparent`,
      "&:not(:disabled)": apply`
        hover:bg-accent-10 hover:text-accent hover:fill-accent
        focus:bg-accent-10 focus:text-accent focus:fill-accent
        active:bg-accent-20 active:text-accent active:fill-accent
      `
    },

    // Form elements
    ".fieldset": {
      ...apply`relative flex flex-col`,
      ".label": apply`text-sm font-bold ml-1 mb-1`,
      "& > .icon": apply`
        absolute bottom-[7px] left-[7px]
        bg-primary-focus h-9 w-9 p-2 rounded-lg
        pointer-events-none transition-colors
      `,
      "&:hover, &:focus-within": {
        "& > .icon": apply`bg-accent-10 text-accent`
      },
      ".icon + .input, .icon + .textarea": apply`pl-14`
    },
    ".input, .textarea": apply`
      bg-transparent rounded-xl px-4 py-3 outline-none
      border hover:border-accent focus:border-accent
      transition-all resize-none
    `,

    // Typography
    ".section-heading": apply`text-4xl font-bold tracking-wider`,
    ".section-subheading": apply`text-xl font-bold tracking-wider`,

    // Cards
    ".card": apply`rounded-xl border overflow-hidden`,

    // Badges
    ".badge": apply`
      text-xs font-bold uppercase tracking-wide text-inverted-neutral
      bg-accent rounded-full px-3 py-1
    `
  })

  addUtilities({
    // Absolute positioning
    ".absolute-center": apply`absolute transform top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2`,
    ".absolute-center-x": apply`absolute transform left-[50%] -translate-x-1/2`,
    ".absolute-center-y": apply`absolute transform top-[50%] -translate-y-1/2`,

    // Fixed positioning
    ".fixed-center": apply`fixed transform top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2`,
    ".fixed-center-x": apply`fixed transform left-[50%] -translate-x-1/2`,
    ".fixed-center-y": apply`fixed transform top-[50%] -translate-y-1/2`,

    // Motion base classes
    ".motion-1, .motion-2, .motion-3, .motion-4, .motion-5": {
      opacity: 0
    }
  })
})
