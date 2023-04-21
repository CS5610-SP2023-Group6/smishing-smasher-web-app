import axios from "axios";
const SERVER_API_URL = "http://localhost:4000/api";
const USERS_URL = `${SERVER_API_URL}/users`;

const api = axios.create({ withCredentials: true });

export const login = async ({ email, password }) => {
  const response = await api.post(`${USERS_URL}/login`, {
    email,
    password,
  });
  const user = response.data;
  return user;
};

export const alogin = async ({ email }) => {
  console.log("here: ", email);
  const response = await api.post(`${USERS_URL}/alogin`, {
    email,
  });
  const user = response.data;
  return user;
};
