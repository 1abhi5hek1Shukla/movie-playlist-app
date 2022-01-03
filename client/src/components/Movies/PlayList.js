/**
 *
 * PlayList.js
 * (Movies, Component)
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../actions/users";
import {
  fetchPlayListsByUser,
  populatedPlayList,
} from "../../actions/playlists";
import dummy_data from "./dummyData";
import styles from "./PlayList.module.css";

const PlayItem = (props) => {
  return (
    <React.Fragment>
      <div className={styles.playitem}>
        <img src={props.Poster} />
        <div className={styles.content}>
          <h3 className={styles.content}>{!props.Title && props.movieId}</h3>
          <hr
            style={{
              backgroundColor: "#035865",
              border: "1px solid #035865",
              outline: "none",
              width: "100%",
            }}
          />
          <div className={styles["sub-content"]}>
            <span>Age: {props.Rated}</span>
            <span>{props.Released}</span>
            <span>IMDB: {props.imdbRating}</span>
            <span>{props.Genre}</span>
          </div>
        </div>
      </div>
      <hr
        style={{
          backgroundColor: "#333",
          border: "1px solid #333",
          outline: "none",
          width: "100%",
        }}
      />
    </React.Fragment>
  );
};

const PlayList = () => {
  const dispatch = useDispatch();
  const localUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const [showPlayListState, setShowPlaylistState] = useState(false);

  const state = useSelector((state) => state);

  useEffect(() => {
    if (localUserInfo) {
      dispatch(fetchPlayListsByUser(localUserInfo.userId));
    }
  }, []);

  var renderList = <p>You don't have a playlist yet.</p>;

  const pls = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(populatedPlayList(pls));
  }, [showPlayListState]);

  const pls_pop = useSelector((state) => state.playlist_populated);
  if (pls_pop && pls_pop.length > 0) {
    renderList = pls_pop.map((datum, idx) => <PlayItem key={idx} {...datum} />);
  }

  return (
    <div className={styles.playlist}>
      <h1>Welcome back {localUserInfo && localUserInfo.firstName} !!</h1>
      <div className={styles.utilNav}>
        <button
          className={
            showPlayListState
              ? `${styles["buttons"]} ${styles["button-active"]}`
              : `${styles["buttons"]}`
          }
          onClick={() => {
            setShowPlaylistState((prev) => !prev);
          }}
        >
          Show Playlist
        </button>
        <button
          className={styles["buttons"]}
          onClick={() => {
            dispatch(userLogout()).then(() => {
              navigate("/login");
            });
          }}
        >
          Logout
        </button>
      </div>
      {showPlayListState && <h2>Playlist</h2>}
      {showPlayListState && renderList}
    </div>
  );
};

export default PlayList;
