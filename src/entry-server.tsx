// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"
import { ANALYTICS_URL, WEBSITE_ID } from "~/lib/analytics"
import { applyAccentFnString, applyThemeFnString } from "~/lib/theme/apply"

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en" class="min-h-full flex bg-base-100">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.svg" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Fira+Code&family=Outfit:wght@100..900&display=swap"
            rel="stylesheet"
          />
          <style>{`[data-motion] { opacity: 0; }`}</style>
          <noscript>
            <style>{`[data-motion] { opacity: 1 !important; }`}</style>
          </noscript>
          <script innerHTML={applyThemeFnString} />
          <script innerHTML={applyAccentFnString} />
          {import.meta.env.PROD && (
            <script async defer data-website-id={WEBSITE_ID} src={`${ANALYTICS_URL}/script.js`} />
          )}
          {assets}
        </head>
        <body class="grow flex">
          <div id="app" class="grow flex flex-col">
            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
))
