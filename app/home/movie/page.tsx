import AddMovie from '@/components/add_movie/AddMovie';
import styles from './movies.module.css';
import React from 'react'

const MoviePage = () => {
    return (
        <main className={styles.main}>

            <p className={styles.logo}>H</p>
            <section className={styles.section}>
                <AddMovie />
            </section>
        </main>
    )
}
export default MoviePage;