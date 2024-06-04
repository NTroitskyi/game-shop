import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Example API

export const fetchGames = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};
