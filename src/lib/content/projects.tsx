export type Project = {
  name: string
  description: string
  iconUrl: string
  showcaseImageUrl?: string
  isHighlighted?: true
  links?: {
    type: "website" | "code" | "article"
    url: string
  }[]
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
        links: [{ type: "website", url: "https://relisheu.org" }],
        iconUrl: "#",
      },
      {
        name: "DISCOV.ER",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://discover-project.it" }],
        iconUrl: "#",
      },
      {
        name: "SMARTLAGOON",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://smartlagoon.eu" }],
        iconUrl: "#",
      },
      {
        name: "Air Quality Sonification",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://sonification-demo.vercel.app" }],
        iconUrl: "#",
      },
      {
        name: "Navile",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://doi.org/10.1016/j.infsof.2026.108044" }],
        iconUrl: "#",
      },
      {
        name: "Maré",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [
          {
            type: "website",
            url: "https://tecnico.ulisboa.pt/pt/coronavirus/projectos-covid-19/mare-plataforma-para-ajudar-no-regresso-a-normalidade/",
          },
        ],
        iconUrl: "#",
      },
    ],
  },
  {
    name: "Freelance",
    projects: [
      {
        name: "Nexthardware",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://nexthardware.com" }],
        iconUrl: "#",
      },
      {
        name: "MoreThanTech Build",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://build.morethantech.it" }],
        iconUrl: "#",
      },
      {
        name: "MoreThanTech",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://morethantech.it" }],
        iconUrl: "#",
      },
      {
        name: "Radio Centrale",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://radiocentraleweb.it" }],
        iconUrl: "#",
      },
      {
        name: "TBG Studio",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://tbgstudio.it" }],
        iconUrl: "#",
      },
    ],
  },
  {
    name: "Personal",
    projects: [
      {
        name: "Sailing Ark",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://sailing-ark.vercel.app" }],
        iconUrl: "#",
      },
      {
        name: "AlmaMedia",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "github.com" }],
        iconUrl: "#",
      },
      {
        name: "Open Movies",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://open-movies-seven.vercel.app" }],
        iconUrl: "#",
      },
      {
        name: "goui",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://github.com/gtumedei/goui" }],
        iconUrl: "#",
      },
      {
        name: "metaviewer",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://github.com/gtumedei/metaviewer" }],
        iconUrl: "#",
      },
      {
        name: "taggui",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://github.com/gtumedei/taggui" }],
        iconUrl: "#",
      },
      {
        name: "go-droid",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://github.com/gtumedei/go-droid" }],
        iconUrl: "#",
      },
      {
        name: "yt-dlapp",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://github.com/gtumedei/yt-dlapp" }],
        iconUrl: "#",
      },
      {
        name: "goaway",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "https://github.com/gtumedei/goaway" }],
        iconUrl: "#",
      },
      {
        name: "vscode-adw-material-theme",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, voluptate!",
        links: [{ type: "website", url: "github.com" }],
        iconUrl: "#",
      },
    ],
  },
]

export default projectCategories
