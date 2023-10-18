'use client';
import styles from './form.module.css';
import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';
import { handleFileChange } from '@/public/assets/utils/utils';
import { createMovie } from '@/actions/movie.action';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getAllUsers, getUserById } from '@/services/users.services';
import { createUserIfNotExists } from '@/actions/user.action';

// Importa las bibliotecas necesarias y estilos aquí

const AddForm = () => {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const urlRef = useRef<HTMLInputElement | null>(null);
    const scoreRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userData, setUserData] = useState<{ id: number } | null>(null);
    const router = useRouter();
    const { user, error: authError } = useUser();

    const resetFileInput = (ref: React.RefObject<HTMLInputElement | null>) => {
        if (ref.current) {
            ref.current.value = ''; // Limpiar el campo de archivo
        }
    };

    const resetForm = () => {
        if (nameRef.current) nameRef.current.value = '';
        resetFileInput(urlRef); // Restablecer el campo de tipo archivo
        if (scoreRef.current) scoreRef.current.value = '';
        if (descriptionRef.current) descriptionRef.current.value = '';
    };

    const getUserData = async () => {
        if (user && user.email) {
            try {
                const email = user.email;
                const name = user.given_name;
                const allUsers = await getAllUsers();
                const matchedUser = allUsers.find((u: any) => u.email === email);

                if (!matchedUser) {
                    const newUser = await createUserIfNotExists(name, email);
                    setUserData({ id: newUser.id });
                } else {
                    const existingUserData = await getUserById(matchedUser.id);
                    setUserData({ id: existingUserData.id });
                }
            } catch (error) {
                console.error('Error fetching or creating user data:', error);
            }
        }
    };

    useEffect(() => {
        if (!userData) {
            getUserData();
        }
    }, [user]);

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

        if (userData) {
            try {
                await createMovie(formData, userData.id);
                setSuccessMessage('Your movie was created successfully');
                resetForm();
                router.refresh();
            } catch (error) {
                console.error('Movie was not created:', error);
            }
        } else {
            console.error('User data not available. Cannot create a movie.');
        }
    };

    useEffect(() => {
        if (successMessage) {
            const timeout = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [successMessage]);

    return (
        <div className={styles.addForm}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {successMessage && <p className={styles.success}>{successMessage}</p>}
                {error && <p className={styles.error}>{error}</p>}
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
