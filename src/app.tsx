import { MetaProvider } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import { NProgress } from "~/components/layout/nprogress"
import { ThemeProvider } from "~/lib/theme"

import "~/app.css"

const App = () => {
  return (
    <Router
      root={(props) => (
        <ThemeProvider>
          <MetaProvider>
            <Suspense>
              <NProgress />
              {props.children}
            </Suspense>
          </MetaProvider>
        </ThemeProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}

export default App
