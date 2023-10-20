import styles from './login.module.css'
import React from 'react'

const Login = () => {
    return (
        <div className={styles.button}>
            <a href="/home" className={styles.login} >Log In</a>
        </div>
    )
}

export default Login;