import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;

export const isLoggedInService = async () => {

    try {
        const response = await axios.get(`${API_BASE}/users/profile`, {withCredentials: true});
        console.log("isLoggedInService",response.data.email)

        if (response.data.email === 0) {
            return false;
        }
        return true;

    } catch (error) {
        console.error('Error fetching current user data:', error);
        return null;
    }
};
