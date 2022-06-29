import { useRoutes } from 'solid-app-router'
import { routes } from './routes'

import NavBar from './components/NavBar'

import type { Component } from 'solid-js'

const App: Component = () => {
  const Route = useRoutes(routes)

  return (
    <>
      <NavBar />
      <main>
        <Route />
      </main>
    </>
  )
}

export default App
