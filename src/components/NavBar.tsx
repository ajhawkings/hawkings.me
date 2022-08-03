import { routes } from '../routes'

import { Link } from '@solidjs/router'
import { For, Show } from 'solid-js'

export default function NavBar() {
  return (
    <nav>
      <ul>
        <For each={routes}>
          {(route) => (
            <Show when={!route.navHide}>
              <li>
                <Link href={route.path}>{route.title}</Link>
              </li>
            </Show>
          )}
        </For>
      </ul>
    </nav>
  )
}
