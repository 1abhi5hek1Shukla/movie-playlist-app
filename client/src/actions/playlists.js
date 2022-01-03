/**
 *
 * playlists.js
 * (actions)
 */

import { setAuthHeader } from "../api/axiosInstance";
import * as api from "../api/playlists";
import { fetchMovieCached } from "../api/movies";

export const fetchPlayListsByUser = (id) => async (dispatch) => {
  try {
    setAuthHeader(localStorage.getItem("token"));
    const { data, status } = await api.fetchPlayListsByUser(id);
    dispatch({ type: "FETCH_PLAYLISTS_BY", payload: data.playlist });
  } catch (error) {
    console.log(error);
  }
};

export const appendToPLaylist = (movieId) => async (dispatch) => {
  try {
    const { userId } = JSON.parse(localStorage.getItem("userInfo"));
    const response = api.appendToPLaylist(movieId, userId);
    dispatch({ type: "APPEND_TO_PLAYLIST", payload: movieId });
  } catch (error) {
    console.log(error);
  }
};

export const auxMovieFetcher = async (playlistPopultedArray, movieId) => {
  try {
    const response = await fetchMovieCached(movieId);
    playlistPopultedArray.push(response.data.movie);
  } catch (error) {
    console.log(error);
  }
};

export const populatedPlayList = (playListIdArray) => async (dispatch) => {
  var playlistPopultedArray = [];
  try {
    for (let movieId of playListIdArray) {
      await auxMovieFetcher(playlistPopultedArray, movieId);
    }
    dispatch({ type: "POPULATED_PLAYLIST", payload: playlistPopultedArray });
  } catch (error) {
    console.log(error);
  }
};
