/**
 *
 * store.js
 */

import reducers from "../reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

const initialState = {
  userInfo: userInfoFromStorage,
  playlist: [],
  playlist_populated: [],
};

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default store;
