import dotenv from 'dotenv';
import { revalidateTag } from 'next/cache';

dotenv.config();
const apiUrl = process.env.API_URL_BACKEND;


export const getAllUsers = async (): Promise<any> => {

    try {
        const response = await fetch('http://localhost:8080/users', {
            headers: {
                'Content-Type': 'application/json',
            },
            'cache': 'no-store'
        });

        if (!response.ok) {
            throw new Error(`Error fetching all users: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        return [];
    }

};


export const getUserById = async (userId: number): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching user data by ID: ${response.status}`);
        }

        const data = await response.json();
        if (response.ok) {

        }

        return data;
    } catch (error) {
        console.error('Error fetching user data by ID:', error);
        return null;
    }
};
