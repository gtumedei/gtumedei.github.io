import path from "path"
import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import Pages from "vite-plugin-pages"
import Layouts from "vite-plugin-vue-layouts"
import PurgeIcons from "vite-plugin-purge-icons"
import FontsLoader from "vite-plugin-fonts"
import SvgLoader from "vite-svg-loader"
import { VitePWA } from "vite-plugin-pwa"
import VueI18n from "@intlify/vite-plugin-vue-i18n"
import WindiCSS from "vite-plugin-windicss"

export default defineConfig({
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
    }
  },
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue", "md"],
      pagesDir: "src/views"
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({ layoutsDir: "src/components/layouts" }),

    // https://github.com/stafyniaksacha/vite-plugin-fonts
    FontsLoader({
      google: {
        families: ["Lato", "DM Serif Display"]
      }
    }),

    // https://github.com/antfu/purge-icons
    PurgeIcons(),

    // https://github.com/jpkleemans/vite-svg-loader
    SvgLoader(),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS(),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "safari-pinned-tab.svg"],
      manifest: {
        name: "GTumedei",
        short_name: "GTumedei",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    }),

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, "locales/**")]
    })
  ],

  server: {
    fs: {
      strict: true
    }
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: "async",
    formatting: "minify"
  },

  optimizeDeps: {
    include: [
      "vue",
      "vue-router",
      "@vueuse/core",
      "@iconify/iconify"
    ],
    exclude: [
      "vue-demi"
    ]
  }
})
