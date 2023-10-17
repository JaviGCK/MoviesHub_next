'use client';
import styles from './form.module.css';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createGenre } from '@/actions/genre.action';

type Props = {
    movieId: number;
    onClose: () => void;
};

const GenreForm = ({ movieId, onClose }: Props) => {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const name = nameRef.current?.value;

        if (!name) {
            setError('Name field is required.');
            return;
        }

        setError('');

        const formData = new FormData();
        formData.append('name', name);

        try {
            await createGenre(formData, movieId);
            console.log('Genre created successfully');
            router.refresh();
        } catch (error) {
            console.error('Genre was not created:', error);
        }
    };

    return (
        <form className={styles.modalxs} onSubmit={handleSubmit}>
            <span className={styles.close} onClick={onClose}>&times;</span>
            {error && <p className="error-message">{error}</p>}
            <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Name</label>
                <input className={styles.input} type="text" id="name" name="name" ref={nameRef} required />
            </div>
            <div>
                <button className={styles.button} type="submit">Create</button>
            </div>
        </form>
    );
};

export default GenreForm;
