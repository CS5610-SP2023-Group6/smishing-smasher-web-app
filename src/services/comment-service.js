import axios from "axios";

const COMMENT_API = "http://localhost:4000/api/comments";

export const createComment = async (comment) => {
    const response = await axios.post(`${COMMENT_API}/create`, comment, {withCredentials: true});
    return response.data;
};

// Add more services for other comment-related API endpoints if needed
