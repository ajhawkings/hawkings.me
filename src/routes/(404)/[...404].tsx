import { Title } from '@solidjs/meta'
import { HttpStatusCode } from '@solidjs/start'

export default function NotFound() {
  return (
    <>
      <Title>404 | hawkings.me</Title>
      <HttpStatusCode code={404} />
      <p>Not found 😔</p>
    </>
  )
}
