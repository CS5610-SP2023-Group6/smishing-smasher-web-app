import axios from 'axios';

export const fetchUserProfile = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

export const fetchCurrentUserProfile = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/users/profile', {withCredentials: true});
        return response.data;
    } catch (error) {
        console.error('Error fetching current user data:', error);
        return null;
    }
};
