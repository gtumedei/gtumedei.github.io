import { MetaProvider } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import { NProgress } from "~/components/layout/nprogress"

import "~/app.css"

const App = () => {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Suspense>
            <NProgress />
            {props.children}
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}

export default App
