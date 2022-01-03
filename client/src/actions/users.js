/**
 *
 * users.js
 * (actions)
 */

import * as api from "../api/users";
import { setAuthHeader } from "../api/axiosInstance";

export const registerUser = (newUser) => async (dispatch) => {
  try {
    const { data, status } = await api.registerUser(newUser);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    const { data, status } = await api.loginUser(user);
    dispatch({ type: "LOGIN", payload: data });
    localStorage.setItem("token", data.token);
    localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
    setAuthHeader(data.token);
  } catch (error) {
    console.log(error);
  }
};

export const userLogout = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  setAuthHeader();
  dispatch({ type: "LOGOUT" });
  dispatch({ type: "REM_PLAYLIST" });
  dispatch({ type: "REM_POP_PLAYLIST" });
  dispatch({ type: "REM_MOVIES" });
};

export const checkAuthorization = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  setAuthHeader(token);
  try {
    const response = await api.checkAuthorizationReq();
    dispatch({ type: "CHECK_AUTH" });
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "REM_PLAYLIST" });
    dispatch({ type: "REM_POP_PLAYLIST" });
    dispatch({ type: "REM_MOVIES" });
    setAuthHeader();
    console.log(error);
  }
};
