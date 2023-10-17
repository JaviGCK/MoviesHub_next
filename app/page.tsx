import styles from './login.module.css';
import Login from '@/components/buttons/login/Login'

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>
        Movies<span className={styles.span}>H</span>ub
      </h1>
      <div className={styles.text}>
        <p className={styles.p1}>Are you ready for the next level?</p>
        <p>Dive in and start enjoying the ability to save all the movies you've already seen, ensuring you never forget what you've watched</p>
      </div>
      <Login />
    </main>
  )
}
