# gtumedei.github.io

My personal website.

## Getting started

- Clone the repo
- Install dependencies (`pnpm i`)
- Create a `.env` file and populate it with the variables indicated by the schema under `src/lib/env.ts`
- Start development server (`pnpm dev`)

## TODO

- [ ] Mention the inspiration from https://tailwindcss.com/plus/templates/spotlight
- [ ] Something interactive in the homepage, maybe click on the profile image to toggle a full-page particle effect like https://vincentgarreau.com/particles.js/#default or https://drawcall.github.io/Proton/#examples
- [ ] Add color guesser banner
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
  - [ ] Konami code to trigger something
- [ ] Find a better place to put the achievements page link
- Achievements section inspired by https://www.maxlaumeister.com/achievements/
  - [x] Click on the achievement
  - [ ] Visit 5 pages
  - [x] Scroll to the bottom of the longest page
  - [x] Visit the 404 page
  - [x] Play with the doodle in the 404 page
  - [ ] Discover the doodle in the homepage
  - [x] Use the Konami code
  - [x] Get a 10 guess streak on Color Guesser
  - [ ] Try out all the theme and accent color combinations
  - [x] Open the browser devtools on the website
- [x] Sonner + confetti effect when you unlock an achievement
