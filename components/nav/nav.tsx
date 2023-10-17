import Link from 'next/link';
import styles from './nav.module.css';
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const Nav = async () => {

    return (
        <div className={styles.nav}>
            <div className={styles.button}>
                <Link href="home/profile" className={styles.button_text}>
                    Profile
                </Link>
            </div>
            <div className={styles.button}>
                <Link href="home/movie" className={styles.button_text}>
                    Add Movie
                </Link>
            </div>
            <div className={styles.button}>
                <Link href="home/genre" className={styles.button_text}>
                    Genres
                </Link>
            </div>
            <div className={`${styles.button} ${styles.logout}`}>
                <a href="/api/auth/logout" className={styles.button_text}><FaSignOutAlt />
                </a>
            </div>
        </div>
    );
};

export default Nav;
