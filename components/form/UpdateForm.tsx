'use client'
import React, { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';
import styles from './form.module.css';
import { handleFileChange } from '@/public/assets/utils/utils';
import { upDateMovie } from '@/actions/movie.action';

type Props = {
    movieId: number;
    onClose: () => void;
};

const UpdateForm = ({ movieId, onClose }: Props) => {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const urlRef = useRef<HTMLInputElement | null>(null);
    const scoreRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        const url = urlRef.current?.files ? urlRef.current.files[0] : null;
        const score = scoreRef.current?.value;
        const description = descriptionRef.current?.value;

        if (!name || !url || !score || !description) {
            setError('All fields are required.');
            return;
        }

        if (isNaN(Number(score)) || Number(score) < 1 || Number(score) > 10) {
            setError('Score must be a number between 1 and 10.');
            return;
        }

        setError('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('url', url);
        formData.append('score', score);
        formData.append('description', description);

        try {
            await upDateMovie(formData, movieId);
            console.log('Movie updated successfully');
            router.refresh();
            onClose();
        } catch (error) {
            console.error('Movie was not updated:', error);
        }
    };



    return (
        <div className={styles.modal}>
            <span className={styles.close} onClick={onClose}>&times;</span>
            <form className={styles.form} onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input className={styles.input} type="text" id="name" name="name" ref={nameRef} required />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="url">Poster</label>
                    <div className={styles.customFileInput}>
                        <input
                            type="file"
                            id="url"
                            name="url"
                            ref={urlRef}
                            required
                            accept="image/*"
                            className={styles.inputFile}
                            onChange={(e) => handleFileChange(e)}
                        />
                        <button className={styles.customFileButton} onClick={() => urlRef.current?.click()}>
                            Select Image
                        </button>
                        <span className={styles.fileName} id="file-name">
                            No file selected
                        </span>
                    </div>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="score">Score (1-10)</label>
                    <input
                        className={styles.input}
                        type="number"
                        id="score"
                        name="score"
                        ref={scoreRef}
                        required
                        min="1"
                        max="10"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="description">Description</label>
                    <textarea
                        className={styles.input}
                        id="description"
                        name="description"
                        ref={descriptionRef}
                        required
                    />
                </div>
                <div>
                    <button className={styles.button} type="submit">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateForm;
