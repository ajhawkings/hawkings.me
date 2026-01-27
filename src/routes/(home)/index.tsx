import { Title } from '@solidjs/meta'

import styles from './home.module.css'

export default function Home() {
  return (
    <>
      <Title>Home | hawkings.me</Title>
      <div class={styles.main}>
        <h2>Welcome to my website - hawkings.me</h2>
        <p>
          As you can probably see, it is under construction. CSS is a luxury,
          anyway...
        </p>
        <p>
          In the meantime please check out my{' '}
          <a href="https://github.com/ajhawkings">GitHub profile</a>. It has
          info on what I'm up to!
        </p>
      </div>
    </>
  )
}
