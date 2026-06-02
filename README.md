# gtumedei.github.io

My personal website.

## Getting started

- Clone the repo
- Install dependencies (`pnpm i`)
- Create a `.env` file and populate it with the variables indicated by the schema under `src/lib/env.ts`
- Start development server (`pnpm dev`)

## TODO

- Racing icon game
  - Use tabler icons as cars (and obstacles too?)
  - Choose car trail
  - Top-down view
  - 4 lanes with cars you have to dodge, 2 lanes for each direction
  - Dynamic obstacles i.e. other vehicles to dodge
  - Static obstacles such as roadworks
  - Possibility to customize your car: choose icon, color, particle effect
  - Pick up bonuses during the game
  - Progressively increase speed and add new spawnable elements
  - Add an achievement
- 404 doodle:
  - [ ] Fix resize sometimes not working properly
  - [ ] Forward unused events to the window (pinch, drag, scroll, ...)
