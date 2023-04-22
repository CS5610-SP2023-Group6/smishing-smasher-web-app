import axios from 'axios';



export const isLoggedInService = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/users/profile', {withCredentials: true});
        console.log("isLoggedInService",response.data.flag)

        if (response.data.flag === false) {
            return false;
        }
        if (response.data.userId !== null) {
        return true;
            }
    } catch (error) {
        console.error('Error fetching current user data:', error);
        return null;
    }
};
