/**
 *
 * index.js
 * (reducers)
 */
import { combineReducers } from "redux";

import users from "./users";
import playlist from "./playlist";
import movies from "./movies";
import playlist_populated from "./playlist_populated";
export default combineReducers({ users, playlist, playlist_populated, movies });
