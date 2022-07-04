import { createEffect, lazy } from 'solid-js'
import { routes } from './routes'

import { Routes, Route } from 'solid-app-router'
import NavBar from './components/NavBar'

import type { Component } from 'solid-js'

const App: Component = () => {
  createEffect(() => {
    const route = routes.find((r) => r.path === window.location.pathname)
    document.title = route?.title
      ? `hawkings.me | ${route.title}`
      : 'hawkings.me'
  })

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          {routes.map((route) => (
            <Route
              path={route.path}
              component={lazy(
                () => import(`./${route.folder}/${route.component}`)
              )}
            />
          ))}
        </Routes>
      </main>
    </>
  )
}

export default App
