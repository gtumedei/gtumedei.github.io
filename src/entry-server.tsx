// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"
import { ANALYTICS_URL, WEBSITE_ID } from "~/lib/analytics"

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en" class="min-h-full flex bg-base-200">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.svg" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
          {/* TODO: remove unused fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Fira+Code&family=Outfit:wght@100..900&display=swap"
            rel="stylesheet"
          />
          {import.meta.env.PROD && (
            <script async defer data-website-id={WEBSITE_ID} src={`${ANALYTICS_URL}/script.js`} />
          )}
          <style>
            {`[data-motion] {
              opacity: 0;
            }`}
          </style>
          <noscript>
            <style>
              {`[data-motion] {
                opacity: 1 !important;
              }`}
            </style>
          </noscript>
          {assets}
        </head>
        <body class="grow flex">
          <script>
            {`const currentTheme = localStorage.getItem("gtumedei-io-theme") ?? "system"
            if (currentTheme == "system") {
              document.documentElement.removeAttribute("data-theme")
            } else {
              document.documentElement.setAttribute("data-theme", currentTheme)
            }
            const currentAccent = localStorage.getItem("gtumedei-io-accent") ?? "blue"
            if (currentAccent == "blue") {
              document.documentElement.removeAttribute("data-accent")
            } else {
              document.documentElement.setAttribute("data-accent", currentAccent)
            }
            document.body.style.visibility = "visible"
            document.body.style.opacity = "1"`}
          </script>
          <div id="app" class="grow flex flex-col">
            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
))
