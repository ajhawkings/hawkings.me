import { For, Show } from 'solid-js'
import { A } from 'solid-start'
import { routes } from '../routes'

export default function NavBar() {
  return (
    <nav>
      <ul>
        <For each={routes}>
          {(route) => (
            <Show when={!route.navHide}>
              <li>
                <A href={route.path}>{route.title}</A>
              </li>
            </Show>
          )}
        </For>
      </ul>
    </nav>
  )
}
