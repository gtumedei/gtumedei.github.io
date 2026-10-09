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
- [ ] Reset style, wallpaper and super mode upon clearing achievements
- [ ] Show the wallpaper by default, add an alternative one when the related achievement is unlocked (e.g. https://reactbits.dev/c/backgrounds/plasma-wave?color1=3b82f6&color2=bfdbfe, https://reactbits.dev/backgrounds/liquid-chrome?baseColor=0.23137254901960785,0.5098039215686274,0.9647058823529412&interactive=false)
- [ ] Fill missing content
