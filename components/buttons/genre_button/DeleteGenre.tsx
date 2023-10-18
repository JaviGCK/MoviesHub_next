'use client'
import { deleteGenre } from '@/actions/genre.action';
import styles from './deleteGenre.module.css';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BsTrash3Fill } from 'react-icons/bs';

type Props = {
    genreId: number;
    onActionSuccess: () => void; // Agrega la función de éxito
};

const DeleteGenre = ({ genreId, onActionSuccess }: Props) => {
    const router = useRouter();

    const handleDeleteClick = async () => {
        try {
            await deleteGenre(genreId);
            onActionSuccess();
            router.refresh();
        } catch (error) {
            console.error('Error deleting genre:', error);
        }
    };

    return (
        <span className={styles.genre}>
            <button className={styles.button} onClick={handleDeleteClick}>
                <BsTrash3Fill className={styles.icon} />
            </button>
        </span>
    );
};

export default DeleteGenre;
