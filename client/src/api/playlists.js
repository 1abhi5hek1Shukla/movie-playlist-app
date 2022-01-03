/**
 *
 * user.js
 * (api)
 */

import axiosInstance from "./axiosInstance";

export const fetchPlayListsByUser = (id) =>
  axiosInstance.get(`/users/playlist/${id}`);

export const appendToPLaylist = (movieId, userId) =>
  axiosInstance.patch(`/users/playlist/${userId}`, { movieId: movieId });

// export const loginUser = (user) => axiosInstance.post("/users/login", user);
