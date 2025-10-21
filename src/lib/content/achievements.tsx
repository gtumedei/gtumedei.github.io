import { JSX } from "solid-js"
import TablerCake from "~icons/tabler/cake"
import TablerColorSwatch from "~icons/tabler/color-swatch"
import TablerDeviceGamepad3 from "~icons/tabler/device-gamepad-3"
import TablerError404 from "~icons/tabler/error-404"
import TablerMap from "~icons/tabler/map"
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
  SCROLLER: {
    name: "Scroller",
    description: "Scroll to the bottom of the longest page.",
    icon: () => <TablerMouse />,
  },
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
    icon: () => <TablerSpiral />,
  },
  CHEATER: {
    name: "Cheater",
    description: "Attempt the Konami Code.",
    icon: () => <TablerDeviceGamepad3 />,
  },
  COLOR_GURU: {
    name: "Color Guru",
    description: "Get a 10 guess streak on Color Guesser.",
    icon: () => <TablerColorSwatch />,
  },
  CUSTOMIZATION_ADDICT: {
    name: "Customization Addict",
    description: "Try out all the theme and accent color combinations.",
    icon: () => <TablerPalette />,
  },
  INSPECTOR: {
    name: "Inspector",
    description: "Open the browser devtools and check out the console.",
    icon: () => <TablerTool />,
  },
} as const satisfies Record<string, AchievementProperties>

export default achievements
