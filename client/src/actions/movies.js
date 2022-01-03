/**
 *
 * movies.js
 * (actions)
 */

import * as api from "../api/movies";

export const fetchMovies = (searchText) => async (dispatch) => {
  try {
    const { data, status } = await api.fetchMoviesList(searchText);
    dispatch({ type: "FETCH_MOVIES", payload: data });
  } catch (error) {
    console.log(error);
  }
};
