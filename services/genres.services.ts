import dotenv from 'dotenv';
dotenv.config();

const fetchDataGenres = async () => {
    const apiUrl = process.env.API_URL_BACKEND;

    try {
        const response = await fetch(`${apiUrl}/genres`, {
            headers: {
                'Content-Type': 'application/json',

            },
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error(`Error fetching genres data: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching genres:', error);
        return null;
    }

};

export default fetchDataGenres