import { routes } from '../routes'

import { Link } from 'solid-app-router'
import { For } from 'solid-js'

export default function NavBar() {
  return (
    <nav class="bg-gray-200 text-gray-900 px-4">
      <ul class="flex items-center">
        <For each={routes}>
          {(route) => (
            <li>
              <Link href={route.path}>{route.name}</Link>
            </li>
          )}
        </For>
      </ul>
    </nav>
  )
}
