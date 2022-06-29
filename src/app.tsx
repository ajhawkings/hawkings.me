import { useRoutes, useLocation } from 'solid-app-router'
import { routes } from './routes'

import NavBar from './components/NavBar'

import type { Component } from 'solid-js'

const App: Component = () => {
  const Route = useRoutes(routes)

  const location = useLocation()
  const path = location.pathname
  const title = routes.find((route) => route.path === path)?.name

  return (
    <>
      <NavBar />
      <main>
        <h1>{title}</h1>
        <Route />
      </main>
    </>
  )
}

export default App
