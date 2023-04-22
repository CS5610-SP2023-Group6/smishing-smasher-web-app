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


export const register = async ( {body} ) => {
  const response = await api.post(`${USERS_URL}/register`, {
    email: body.email,
    password: body.password,
    profilePicture: body.profilePicture,
    nickname: body.nickname,
    birthday: body.birthday,
    website: body.website,
    address1: body.address1,
    address2: body.address2,
    city: body.city,
    zip: body.zip,
    state: body.state,
    bio: body.bio,
  });
  const user = response.data;
  return user;
};
