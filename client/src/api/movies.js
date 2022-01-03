/**
 *
 * user.js
 * (api)
 */

import axiosInstance from "./axiosInstance";

export const fetchMoviesList = (searchText) =>
  axiosInstance.get(`/movies/${searchText}`);

export const fetchMovieCached = (searchText) =>
  axiosInstance.get(`/movies/cached/${searchText}`);
