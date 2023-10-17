import { Genre } from '@/types/genre'
import styles from './listGeres.module.css'
import React from 'react'
import BackButton from '../buttons/back_button/BackButton'

type Props = {
    genres: Genre[]
}
const ListGenres = ({ genres }: Props) => {

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.h1}>Genres</h1>
                <ul className={styles.ul}>
                    {genres.map((genre, index) => (
                        <li key={index} className={styles.li}>{genre.name}</li>
                    ))}
                </ul>
                <div className={styles.back}>
                    <BackButton />
                </div>
            </div>
        </>
    )
}

export default ListGenres