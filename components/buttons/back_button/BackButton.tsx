import Link from 'next/link'
import styles from './backButton.module.css'
import React from 'react'
import { TiArrowBack } from 'react-icons/ti'
const BackButton = () => {
    return (
        <div className={styles.button}>
            <Link href='/home' className={styles.login}>
                <TiArrowBack className={styles.icon} />
            </Link>
        </div>
    )
}

export default BackButton