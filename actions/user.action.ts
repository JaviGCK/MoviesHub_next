const apiUrl = process.env.API_URL_BACKEND;

export const createUserIfNotExists = async (name: any, email: string) => {
    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        await (response);

        const createdUser = await response.json();
        console.log('User created successfully:', createdUser);
        return createdUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};