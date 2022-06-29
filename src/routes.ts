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
  {
    path: '/about',
    component: lazy(() => import('./about/about')),
    name: 'About',
  },
  {
    path: '/projects',
    component: lazy(() => import('./projects/projects')),
    name: 'Projects',
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
    name: '404',
  },
]
