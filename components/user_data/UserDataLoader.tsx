'use client'
import React, { useEffect, useState } from 'react';
import CardMovie from '../card/CardMovie';
import { Movie } from '@/types/movie';
import { getAllUsers, getUserById } from '@/services/users.services';
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from './userDataLoader.module.css';
import { createUserIfNotExists } from '@/actions/user.action';

type UserData = {
    movies: Movie[];
};

export default function UserDataLoader() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const { user, error, isLoading } = useUser();

    const fetchUserData = async () => {
        if (user && user.email) {
            try {
                const email = user.email;
                const name = user.given_name;

                const allUsers = await getAllUsers();

                const matchedUser = allUsers.find((u: any) => u.email === email);

                if (!matchedUser) {
                    const newUser = await createUserIfNotExists(name, email);
                    setUserData(newUser);
                } else {
                    const existingUserData = await getUserById(matchedUser.id);
                    setUserData(existingUserData);
                }
            } catch (error) {
                console.error('Error fetching or creating user data:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [user]);

    const handleActionSuccess = () => {

        fetchUserData();
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <section className={styles.section_movies}>
            {userData && userData.movies && userData.movies.length > 0 ? (
                <CardMovie movie={userData.movies} onActionSuccess={handleActionSuccess} />
            ) : (
                <p>No movies found for this user.</p>
            )}
        </section>
    );
}
