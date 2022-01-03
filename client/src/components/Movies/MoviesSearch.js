/**
 *
 * MoviesSearch.js
 * (Movies / Component)
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../actions/movies";
import MoviesRender from "./MoviesRender";
import styles from "./MoviesSearch.module.css";

const MoviesSearch = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(fetchMovies(searchText));
  };
  const { movies } = useSelector((state) => state);

  const searchChangeHandler = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <React.Fragment>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <input type="text" onChange={searchChangeHandler} />
        <button>Search</button>
      </form>
      <MoviesRender movies={movies.data} />
    </React.Fragment>
  );
};
export default MoviesSearch;
