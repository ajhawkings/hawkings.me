import { Title } from 'solid-start'

import styles from './home.module.css'

export default function Home() {
  return (
    <>
      <Title>Home | hawkings.me</Title>
      <div class={styles.test}>Test</div>
    </>
  )
}
