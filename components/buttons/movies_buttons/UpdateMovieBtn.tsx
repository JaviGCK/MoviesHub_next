'use client'
import React, { useState } from 'react';
import { GiCardExchange } from 'react-icons/gi';
import styles from './buttons_movies.module.css';
import UpdateForm from '@/components/form/UpdateForm';

type Props = {
    movieId: number;
};
const UpdateMovieBtn = ({ movieId }: Props) => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleButtonClick = () => {
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
    };

    return (
        <>
            <button className={styles.button} onClick={handleButtonClick}>
                <GiCardExchange className={styles.icon} />
            </button>
            {isFormVisible && <UpdateForm movieId={movieId} onClose={handleCloseForm} />}
        </>
    );
};

export default UpdateMovieBtn;

