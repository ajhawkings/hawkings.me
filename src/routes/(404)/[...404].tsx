import { Title } from 'solid-start'
import { HttpStatusCode } from 'solid-start/server'

export default function NotFound() {
  return (
    <>
      <Title>404 | hawkings.me</Title>
      <HttpStatusCode code={404} />
      <p>Not found 😔</p>
    </>
  )
}
