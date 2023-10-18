'use client';
import { deleteMovie } from '@/actions/movie.action';
import styles from './buttons_movies.module.css';

import { useRouter } from 'next/navigation';
import React from 'react';
import { BsTrash3Fill } from 'react-icons/bs';

type Props = {
    movieId: number;
    onActionSuccess: () => void; // Actualizada para aceptar onActionSuccess
};

const DeleteMovie = ({ movieId, onActionSuccess }: Props) => {
    const router = useRouter();

    const handleDeleteClick = async () => {
        try {
            await deleteMovie(movieId);
            onActionSuccess(); // Llamar a la función para indicar éxito
            router.refresh();
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    }

    return (
        <button className={styles.button} onClick={handleDeleteClick}>
            <BsTrash3Fill className={styles.icon} />
        </button>
    );
};

export default DeleteMovie;
