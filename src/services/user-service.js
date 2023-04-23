import axios from 'axios';

const API_URL =  process.env.REACT_APP_API_BASE;

export const createUser = async (user) => {
    const response = await axios.post(`${API_URL}/create`, user);
    return response.data;
};

export const findAllUsers = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
};

export const findUserById = async (id) => {
    const response = await axios.get(`${API_URL}/id/${id}`);
    return response.data;
};

export const findUserByEmail = async (email) => {
    const response = await axios.get(`${API_URL}/email/${email}`);
    return response.data;
};

export const findUsersByNickname = async (nickname) => {
    const response = await axios.get(`${API_URL}/nickname/${nickname}`);
    return response.data;
};

export const findUsersByAddress = async (address) => {
    const response = await axios.post(`${API_URL}/address`, address);
    return response.data;
};

export const findUsersByBirth = async (birthday) => {
    const response = await axios.post(`${API_URL}/birthday`, { birthday });
    return response.data;
};

export const updateUser = async (user) => {
    const response = await axios.post(`${API_URL}/update`, user);
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await axios.post(`${API_URL}/delete`, { _id: userId });
    return response.data;
};

export const resetPassword = async (userId, password) => {
    const response = await axios.post(`${API_URL}/reset`, { _id: userId
        , password });
    return response.data;
};

