'use client'
import styles from './buttons_movies.module.css';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoMdPricetags } from 'react-icons/io';
import GenreForm from '@/components/form/GenreForm';

type Props = {
    movieId: number;
    isDisabled: boolean;
    onActionSuccess: () => void;
};

const AddGenreMovieBtn = ({ movieId, isDisabled, onActionSuccess }: Props) => {
    const router = useRouter();
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleButtonClick = () => {
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
        onActionSuccess();
    };

    return (
        <>
            <button className={styles.button} onClick={handleButtonClick} disabled={isDisabled}>
                <IoMdPricetags className={styles.icon} />
            </button>
            {isFormVisible && <GenreForm movieId={movieId} onClose={handleCloseForm} />}
        </>
    );
};

export default AddGenreMovieBtn;