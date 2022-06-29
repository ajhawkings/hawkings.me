import { lazy } from 'solid-js'

import type { RouteDefinition } from 'solid-app-router'

type Routes = RouteDefinition & {
  name: string
}

export const routes: Array<Routes> = [
  {
    path: '/',
    component: lazy(() => import('./home/home')),
    name: 'Home',
  },
]
