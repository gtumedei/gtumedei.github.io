import { defineConfig, defineSingleton } from "@content-collections/core"
import { z } from "zod"

const UrlOrHash = z.union([z.url(), z.literal("#")])

const projects = defineSingleton({
  name: "projects",
  typeName: "Projects",
  filePath: "content/projects.yml",
  parser: "yaml",
  schema: z.object({
    categories: z.array(
      z.object({
        name: z.string(),
        items: z.array(
          z.object({
            name: z.string(),
            description: z.string(),
            iconUrl: UrlOrHash,
            showcaseImageUrl: UrlOrHash.nullish(),
            isHighlighted: z.boolean().nullish(),
            links: z
              .array(
                z.object({
                  type: z.enum(["website", "code", "article"]),
                  url: UrlOrHash,
                }),
              )
              .nullish(),
          }),
        ),
      }),
    ),
  }),
})

const tech = defineSingleton({
  name: "tech",
  filePath: "content/tech.yml",
  parser: "yaml",
  schema: z.object({
    items: z.array(
      z.object({
        name: z.string(),
        url: UrlOrHash,
        icon: z.string(),
        color: z.object({ light: z.string(), dark: z.string() }),
      }),
    ),
  }),
})

const minigames = defineSingleton({
  name: "minigames",
  typeName: "Minigames",
  filePath: "content/minigames.yml",
  parser: "yaml",
  schema: z.object({
    items: z.array(
      z.object({
        slug: z.string(),
        name: z.string(),
        description: z.string(),
        imageUrl: z.string(),
      }),
    ),
  }),
})

const achievements = defineSingleton({
  name: "achievements",
  typeName: "Achievements",
  filePath: "content/achievements.yml",
  parser: "yaml",
  schema: z.object({
    items: z.array(
      z.object({
        code: z.string(),
        name: z.string(),
        description: z.string(),
        icon: z.string(),
      }),
    ),
  }),
})

export default defineConfig({
  content: [projects, tech, minigames, achievements],
})
