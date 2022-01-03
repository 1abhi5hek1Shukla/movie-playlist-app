/**
 *
 * MoviesRender.js
 * (Movies / Component)
 */

// import { STATES } from "mongoose";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { appendToPLaylist } from "../../actions/playlists";
import styles from "./MoviesRender.module.css";

const MoviesRender = (props) => {
  let renderMovies;
  const [localPlaylist, setLocalPlaylist] = useState([]);
  const dispatch = useDispatch();
  const appender = (movieId) => {
    setLocalPlaylist((prev) => [...prev, movieId]);
  };
  useEffect(() => {
    dispatch(appendToPLaylist(localPlaylist[localPlaylist.length - 1]));
  }, [localPlaylist]);
  if (props.movies) {
    renderMovies = props.movies.map((movie, idx) => (
      <div className={styles.movie} key={idx}>
        <div className={styles["movie-content"]}>
          <img src={movie.Poster} alt="n/A" />
          <div className={styles["movie-content-text"]}>
            <span>{movie.Title}</span>
            <span>{movie.Year}</span>
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            appender(movie.imdbID);
            // dispatch(appendToPLaylist(movie.imdbID));
          }}
        >
          <button>+</button>
        </form>
      </div>
    ));
    renderMovies = <div className={styles.movies}>{renderMovies}</div>;
  } else {
    renderMovies = <p>|| Search your favourite movies here ||</p>;
  }
  return renderMovies;
};

export default MoviesRender;
