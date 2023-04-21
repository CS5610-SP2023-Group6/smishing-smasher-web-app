// import axios from 'axios';
//
// const API_BASE = 'http://localhost:4000/api';
// const POST_API = `${API_BASE}/posts`;
// console.log(POST_API)
//
// // const POST_API = 'http://localhost:4000/api/posts';
//
//
//
//
// export const updatePost = async (post) => {
//     const response = await axios
//         .put(`${POST_API}/${post._id}`, post);
//     return post;
// }
//
//
// export const createPost = async (post) => {
//     const response = await axios.post(POST_API, post)
//     return response.data;
//
// }
// export const findPosts = async () => {
//     const response = await axios.get(POST_API);
//
//     const posts = response.data;
//     console.log("findPosts",posts)
//     return posts;
//
// }
// export const deletePost = async (tid) => {
//     const response = await axios
//         .delete(`${POST_API}/${tid}`)
//     return response.data
// }
//
//
//
//
// console.log(findPosts())