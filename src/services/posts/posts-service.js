import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';
const POST_API = `${API_BASE}/posts`;
console.log(POST_API);

export const updatePost = async (post) => {
    const response = await axios.put(`${POST_API}/update`, post);
    return response.data;
}


export const createPost = async (post) => {
    const response = await axios.post(POST_API, post)
    return response.data;

}
export const findPosts = async () => {
    const response = await axios.get(`${POST_API}/all`);
    const posts = response.data;
    return posts;

}
export const deletePost = async (tid) => {
    const toDelete = {_id: tid};
    const response = await axios.post(`${POST_API}/delete`, toDelete);
    return response.data
}

console.log(findPosts())