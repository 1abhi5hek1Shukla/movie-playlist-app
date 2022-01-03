/**
 *
 * user.js
 * (api)
 */

import axiosInstance from "./axiosInstance";

export const registerUser = (newUser) =>
  axiosInstance.post("/users/signup", newUser);

export const loginUser = (user) => axiosInstance.post("/users/login", user);

export const checkAuthorizationReq = () => axiosInstance.get("/users/auth");
