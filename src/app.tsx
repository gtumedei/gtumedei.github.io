import { MetaProvider } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import { NProgress } from "~/components/layout/nprogress"
import { SearchDialog } from "~/components/search"
import { AchievementsProvider } from "~/lib/achievements"
import { ThemeProvider } from "~/lib/theme"

import "~/global.css"

const App = () => {
  return (
    <Router
      root={(props) => (
        <ThemeProvider>
          <MetaProvider>
            <AchievementsProvider>
              <Suspense>
                <NProgress />
                {props.children}
                <SearchDialog />
              </Suspense>
            </AchievementsProvider>
          </MetaProvider>
        </ThemeProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}

export default App
