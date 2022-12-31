import { A } from 'solid-start'

export default function NavBar() {
  return (
    <nav>
      <ul>
        <A href="/">Home</A>
        <A href="/about">About</A>
        <A href="/projects">Projects</A>
      </ul>
    </nav>
  )
}
