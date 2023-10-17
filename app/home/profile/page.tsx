import styles from './profile.module.css';
import ListUser from '@/components/user/ListUser';
import React from 'react'


const Profile = () => {


    return (
        <main className={styles.main}>

            <p className={styles.logo}>H</p>
            <section className={styles.section_text}>
                <p className={styles.text}>
                    This is your profile section where we store all your profile data. Don't worry, we prioritize your safety and security.
                </p>
            </section>
            <section className={styles.section_list}>
                <ListUser />
            </section>
        </main>
    )
}

export default Profile;
