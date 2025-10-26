# gtumedei.github.io

My personal website.

## Getting started

- Clone the repo
- Install dependencies (`pnpm i`)
- Create a `.env` file and populate it with the variables indicated by the schema under `src/lib/env.ts`
- Start development server (`pnpm dev`)

## TODO

- [ ] Mention the inspiration from https://tailwindcss.com/plus/templates/spotlight
- [ ] Add color guesser banner
- [x] Better mobile menu anchoring or different close button design
- Games:
  - Cloud of icons floating around, you have to shoot to the same icon you have in your gun
  - 2D endless runner with Tabler icons cars
    - Top-down view
    - 4 lanes with cars you have to dodge, 2 lanes for each direction
    - Dynamic obstacles i.e. other vehicles to dodge
    - Static obstacles such as roadworks
    - Possibility to customize your car: choose icon, color, particle effect
    - Pick up bonuses during the game
    - Progressively increase speed and add new spawnable elements
- Easter eggs:
  - [ ] Konami code to unlock something(https://www.reactbits.dev/animations/noise, https://www.reactbits.dev/backgrounds/letter-glitch)
  - [ ] Add homepage easter egg
  - [ ] Homepage easter egg to unlock something (https://www.reactbits.dev/backgrounds/dark-veil or https://www.reactbits.dev/backgrounds/plasma)
- [ ] Add WebGL detection and display an error for unsupported features (Super Mode)
- Achievements section inspired by https://www.maxlaumeister.com/achievements/
  - [ ] Discover the doodle in the homepage
  - [ ] An achievement for the other minigame
