import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;
const POST_API = `${API_BASE}/posts`;
console.log(POST_API);

export const updatePost = async (post) => {
    console.log("pst-ser,updatePost", post)
    const response = await axios.post(`${POST_API}/update`, post, { withCredentials: true });
    return response.data;
}


export const createPost = async (post) => {
    console.log("createPost", post)
    const response = await axios.post(`${POST_API}/create`, post, { withCredentials: true });
    return response.data;
};

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
export const findPostsByAuthorId = async (authorId) => {
    const response = await axios.get(`${POST_API}/author/${authorId}`);
    console.log(`${POST_API}/author/${authorId}`)
    const posts = response.data;
    return posts;
}

export const findAllPosts = async () => {
    const response = await axios.get(`${POST_API}/all`);
    console.log(`${POST_API}/all`)
    // console.log(response.data)
    const posts = response.data;
    return posts;
}
export const findPostById = async (id) => {
    const response = await axios.get(`${POST_API}/id/${id}`);
    return response.data;
};

export const findPostsByTime = async (start, end) => {
    const response = await axios.post(`${POST_API}/time`, { start, end });
    return response.data;
};

export const findPostsByContents = async (contents) => {
    const response = await axios.post(`${POST_API}/content`, { contents });
    return response.data;
};

export const findPostsByAddress = async (address) => {
    const response = await axios.post(`${POST_API}/address`, { address });
    return response.data;
};
// console.log(findPosts())