
import axios from "axios";

const COMMENT_API = process.env.REACT_APP_API_BASE;

export const findAllComments = async () => {
    const response = await axios.get(`${COMMENT_API}/all`, { withCredentials: true });
    return response.data;
};

export const findCommentById = async (id) => {
    const response = await axios.get(`${COMMENT_API}/id/${id}`, { withCredentials: true });
    return response.data;
};

export const findCommentsByAuthorId = async (authorId) => {
    const response = await axios.get(`${COMMENT_API}/author/${authorId}`, { withCredentials: true });
    return response.data;
};

export const findCommentsByPostId = async (postId) => {
    const response = await axios.get(`${COMMENT_API}/post/${postId}`, { withCredentials: true });
    return response.data;
};

export const findCommentsByContents = async (text) => {
    const response = await axios.post(`${COMMENT_API}/content`, { text }, { withCredentials: true });
    return response.data;
};

export const findCommentsByTime = async (start, end) => {
    const response = await axios.post(`${COMMENT_API}/time`, { start, end }, { withCredentials: true });
    return response.data;
};

export const createComment = async (newComment) => {
    const response = await axios.post(`${COMMENT_API}/create`, newComment, { withCredentials: true });
    return response.data;
};

export const deleteComment = async (commentId) => {
    const response = await axios.post(`${COMMENT_API}/delete`, { _id: commentId }, { withCredentials: true });
    return response.data;
};

export const updateComment = async (updatedComment) => {
    const response = await axios.post(`${COMMENT_API}/update`, updatedComment, { withCredentials: true });
    return response.data;
};
