/**
 *
 * axiosInstance.js
 * (api)
 */

import axios from "axios";

// const base_url = "http://localhost:5000/";
const base_url = "https://movie-app-abhishek.herokuapp.com/";

const axiosInstance = axios.create({
  baseURL: base_url,
});

export const setAuthHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.authorization;
  }
};

export default axiosInstance;
