export type Project = {
  name: string
  description: string
  url: string
  imageUrl: string
}

const projectCategories: {
  name: string
  projects: Project[]
}[] = [
  {
    name: "Research",
    projects: [
      {
        name: "Relish",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://relisheu.org",
        imageUrl: "#",
      },
      {
        name: "DISCOV.ER",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://discover-project.it",
        imageUrl: "#",
      },
      {
        name: "SMARTLAGOON",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://smartlagoon.eu",
        imageUrl: "#",
      },
      {
        name: "Air Quality Sonification",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://sonification-demo.vercel.app",
        imageUrl: "#",
      },
      {
        name: "Navile",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://doi.org/10.1016/j.infsof.2026.108044",
        imageUrl: "#",
      },
      {
        name: "Maré",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://tecnico.ulisboa.pt/pt/coronavirus/projectos-covid-19/mare-plataforma-para-ajudar-no-regresso-a-normalidade/",
        imageUrl: "#",
      },
    ],
  },
  {
    name: "Freelance",
    projects: [
      {
        name: "Nexthardware",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://nexthardware.com",
        imageUrl: "#",
      },
      {
        name: "MoreThanTech Build",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://build.morethantech.it",
        imageUrl: "#",
      },
      {
        name: "MoreThanTech",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://morethantech.it",
        imageUrl: "#",
      },
      {
        name: "Radio Centrale",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://radiocentraleweb.it",
        imageUrl: "#",
      },
      {
        name: "TBG Studio",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://tbgstudio.it",
        imageUrl: "#",
      },
    ],
  },
  {
    name: "Personal",
    projects: [
      {
        name: "Sailing Ark",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://sailing-ark.vercel.app",
        imageUrl: "#",
      },
      {
        name: "AlmaMedia",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "github.com",
        imageUrl:
          "https://chromewebstore.google.com/detail/almamedia/odldhmdkdpgdgihhjjmhmnnoopefcbid",
      },
      {
        name: "Open Movies",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://open-movies-seven.vercel.app",
        imageUrl: "#",
      },
      {
        name: "goui",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://github.com/gtumedei/goui",
        imageUrl: "#",
      },
      {
        name: "metaviewer",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://github.com/gtumedei/metaviewer",
        imageUrl: "#",
      },
      {
        name: "taggui",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://github.com/gtumedei/taggui",
        imageUrl: "#",
      },
      {
        name: "go-droid",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://github.com/gtumedei/go-droid",
        imageUrl: "#",
      },
      {
        name: "yt-dlapp",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://github.com/gtumedei/yt-dlapp",
        imageUrl: "#",
      },
      {
        name: "goaway",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "https://github.com/gtumedei/goaway",
        imageUrl: "#",
      },
      {
        name: "vscode-adw-material-theme",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        url: "github.com",
        imageUrl: "#",
      },
    ],
  },
]

export default projectCategories
