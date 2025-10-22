import { JSX } from "solid-js"
import TablerBooks from "~icons/tabler/books"
import TablerCake from "~icons/tabler/cake"
import TablerCode from "~icons/tabler/code"
import TablerColorSwatch from "~icons/tabler/color-swatch"
import TablerDeviceGamepad3 from "~icons/tabler/device-gamepad-3"
import TablerError404 from "~icons/tabler/error-404"
import TablerError404Off from "~icons/tabler/error-404-off"
import TablerMap from "~icons/tabler/map"
import TablerMapHeart from "~icons/tabler/map-heart"
import TablerMouse from "~icons/tabler/mouse"
import TablerPalette from "~icons/tabler/palette"
import TablerSpiral from "~icons/tabler/spiral"
import TablerSunglasses from "~icons/tabler/sunglasses"
import TablerTool from "~icons/tabler/tool"

export type Achievement = keyof typeof achievements

export type AchievementProperties = {
  name: string
  description: string
  icon: () => JSX.Element
}

const achievements = {
  PIECE_OF_CAKE: {
    name: "Piece of Cake",
    description: "Click on this achievement to unlock it.",
    icon: () => <TablerCake />,
  },
  VISITOR: {
    name: "Visitor",
    description: "Visit 5 unique pages on the website.",
    icon: () => <TablerMap />,
  },
  RETURNING_VISITOR: {
    name: "Returning Visitor",
    description: "Come back to the website after at least 24 hours.",
    icon: () => <TablerMapHeart />,
  },
  DEEP_DIVER: {
    name: "Deep Diver",
    description: "Open 5 links in the Projects page.",
    icon: () => <TablerBooks />,
  },
  // TODO: not working on mobile
  SCROLLER: {
    name: "Scroller",
    description: "Scroll to the bottom of the longest page.",
    icon: () => <TablerMouse />,
  },
  // TODO
  KEEN_EYE: {
    name: "Keen Eye",
    description: "Discover the homepage easter egg.",
    icon: () => <TablerSunglasses />,
  },
  LOST: {
    name: "Lost...",
    description: "Visit the 404 page.",
    icon: () => <TablerError404 />,
  },
  AND_FOUND: {
    name: "...And Found",
    description: "Play with the doodle on the 404 page.",
    icon: () => <TablerError404Off />,
  },
  CUSTOMIZATION_ADDICT: {
    name: "Customization Addict",
    description: "Try out all the theme and accent color combinations.",
    icon: () => <TablerPalette />,
  },
  COLOR_GURU: {
    name: "Color Guru",
    description: "Get a 10 guess streak on Color Guesser.",
    icon: () => <TablerColorSwatch />,
  },
  INSPECTOR_GADGET: {
    name: "Inspector Gadget",
    description: "Open the browser devtools and check out the console.",
    icon: () => <TablerTool />,
  },
  DOMINATION: {
    name: "DOMination",
    description: "Find the secret in the HTML code.",
    icon: () => <TablerCode />,
  },
  CHEATER: {
    name: "Cheater",
    description: "Attempt the Konami Code.",
    icon: () => <TablerDeviceGamepad3 />,
  },
  ACHIEVEMENTCEPTION: {
    name: "Achievementception",
    description: "Reset your achievements.",
    icon: () => <TablerSpiral />,
  },
} as const satisfies Record<string, AchievementProperties>

export default achievements
