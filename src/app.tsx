import { useRoutes } from 'solid-app-router'
import { routes } from './routes'

import type { Component } from 'solid-js'

const App: Component = () => {
  const Route = useRoutes(routes)

  return (
    <>
      <main>
        <Route />
      </main>
    </>
  )
}

export default App
