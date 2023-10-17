'use client'
import styles from './form.module.css';
import React, { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';
import { handleFileChange } from '@/public/assets/utils/utils';
import { createMovie } from '@/actions/movie.action';

const AddForm = () => {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const urlRef = useRef<HTMLInputElement | null>(null);
    const scoreRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        const urlInput = urlRef.current;
        const url = urlInput?.files ? urlInput.files[0] : null;
        const score = scoreRef.current?.value;
        const description = descriptionRef.current?.value;

        if (!name || !url || !score || !description) {
            setError('All fields are required.');
            return;
        }

        if (!url) {
            setError('Please select an image.');
            return;
        }

        setError('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('url', url as File);
        formData.append('score', score);
        formData.append('description', description);

        const userId = 1;

        try {
            await createMovie(formData, userId);
            console.log('Movie created successfully');
            router.refresh();
        } catch (error) {
            console.error('Movie was not created:', error);
        }
    };

    return (
        <div className={styles.addForm}>
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
                    <button className={styles.buttonAdd} type="submit">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddForm;
