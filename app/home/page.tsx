import styles from './home.module.css';
import React from 'react';
import Nav from '../../components/nav/nav'
import { getUserById } from '@/services/users.services';
import CardMovie from '@/components/card/CardMovie';
import { getSession } from '@auth0/nextjs-auth0';

const Home = async () => {
    const user = await getUserById(1)
    const movies = user ? user.movies || [] : []

    const session = await getSession();
    console.log(session);

    return (
        <main className={styles.main}>
            <section className={styles.section_header}>
                <p className={styles.logo}>H</p>
                <Nav />
            </section>
            <section className={styles.section_movies}>
                <CardMovie movie={movies} />

            </section>
        </main>
    );
};

export default Home;

