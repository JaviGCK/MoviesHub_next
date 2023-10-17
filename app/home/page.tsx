// Home.tsx
import React from 'react';
import styles from './home.module.css';
import Nav from '../../components/nav/nav';
import CardMovie from '@/components/card/CardMovie';
import UserDataLoader from '@/components/user_data/UserDataLoader';


const Home = () => {

    return (
        <main className={styles.main}>
            <section className={styles.section_header}>
                <p className={styles.logo}>H</p>
                <Nav />
            </section>
            <UserDataLoader />
        </main>
    );
};

export default Home;
