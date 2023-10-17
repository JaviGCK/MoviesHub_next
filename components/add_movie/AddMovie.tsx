import styles from './addMovie.module.css'
import React from 'react'
import BackButton from '../buttons/back_button/BackButton'
import AddForm from '../form/AddForm'

const AddMovie = () => {

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.h1}>Add Movie</h1>
                <AddForm />
                <div className={styles.back}>
                    <BackButton />
                </div>
            </div>
        </>
    )
}

export default AddMovie