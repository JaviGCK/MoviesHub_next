'use client'
import styles from './addMovie.module.css'
import React from 'react'
import BackButton from '../buttons/back_button/BackButton'
import UpdateForm from '../form/UpdateForm'

type Props = {
    movieId: number;
};

const UpdateMovie = ({ movieId }: Props) => {
    const onClose = () => { };
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.h1}>Update Movie</h1>
                <UpdateForm movieId={movieId} onClose={onClose} />
                <div className={styles.back}>
                    <BackButton />
                </div>
            </div>
        </>
    )
}

export default UpdateMovie