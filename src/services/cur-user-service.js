import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
export const fetchUserProfile = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

export const fetchCurrentUserProfile = async () => {
    try {
        const response = await axios.get(`${API_BASE}/users/profile`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching current user data:', error);
        return null;
    }
};
