interface Routes {
  path: string
  folder: string
  component: string
  title: string
  navHide?: boolean
}

export const routes: Array<Routes> = [
  {
    path: '/',
    folder: 'home',
    component: 'home',
    title: 'Home',
  },
  {
    path: '/about',
    folder: 'about',
    component: 'about',
    title: 'About',
  },
  {
    path: '/projects',
    folder: 'projects',
    component: 'projects',
    title: 'Projects',
  },
  {
    path: '**',
    folder: 'errors',
    component: '404',
    title: '404',
    navHide: true,
  },
]
