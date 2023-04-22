import axios from 'axios';



export const isLoggedInService = async () => {

    try {
        const response = await axios.get('http://localhost:4000/api/users/profile', {withCredentials: true});
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
