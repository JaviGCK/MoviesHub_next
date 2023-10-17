'use client'
import styles from './buttons_movies.module.css';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoMdPricetags } from 'react-icons/io';
import GenreForm from '@/components/form/GenreForm';

type Props = {
    movieId: number;
    isDisabled: boolean;
};

const AddGenreMovieBtn = ({ movieId, isDisabled }: Props) => {
    const router = useRouter();
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleButtonClick = () => {
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
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