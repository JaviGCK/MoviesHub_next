export const createGenre = async (formData: FormData, movieId: number): Promise<void> => {

    const response = await fetch(`http://localhost:8080/genres/${movieId}`, {
        method: 'POST',
        body: formData,
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(`Error creating genre: ${response.statusText}`);
    }

    return await response.json();
};

export const deleteGenre = async (genreId: number) => {

    const apiUrl = process.env.API_URL_BACKEND;

    try {
        const response = await fetch(`http://localhost:8080/genres/${genreId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        if (response.status === 204) {
            return true;
        } else if (response.status === 404) {
            return false;
        } else {
            throw new Error(`Error deleting genre. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting genre:', error);
        return null;
    }
};