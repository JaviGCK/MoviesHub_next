import styles from './genres.module.css';
import React from 'react'
import fetchDataGenres from '@/services/genres.services';
import ListGenres from '@/components/genres/ListGenres';

const GenrePage = async () => {
    const genres = await fetchDataGenres()
    return (
        <main className={styles.main}>

            <p className={styles.logo}>H</p>
            <section className={styles.section_text}>
                <p className={styles.text}>
                    This is a compilation of all the genres we have gathered throughout the app, so feel free to draw inspiration for your movies.
                </p>
            </section>
            <section className={styles.section_list}>
                <ListGenres genres={genres} />
            </section>
        </main>
    )
}
export default GenrePage;