import axios from "axios";
import qs from "qs";
const SERVER_API_URL = "http://localhost:4000/api";
const FILES_URL = `${SERVER_API_URL}/files`;

const api = axios.create({
  withCredentials: true,
});

export const upload = async ({ files }) => {
  console.log(files);

  // Create a new FormData instance
  // const formData = new FormData();

  // Append the files to the FormData instance
  // formData.append('file', files);

  // axios.post(url,{jobNumber: '430525', password: '123'}, {headers: {'Content-Type':'application/x-www-form-urlencoded'}});

  // Send the request with the FormData instance as the request body
  const response = await api.post(`${FILES_URL}/upload`, files, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const uploadedFiles = response.data;
  return uploadedFiles;
};
