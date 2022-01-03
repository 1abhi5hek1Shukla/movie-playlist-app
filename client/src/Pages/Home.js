/**
 *
 * Home.js
 * (Pages)
 */
import React from "react";
import MoviesSearch from "../components/Movies/MoviesSearch";
import PlayList from "../components/Movies/PlayList";

const Home = () => {
  return (
    <React.Fragment>
      <h1>Home</h1>
      <MoviesSearch />
      <PlayList />
    </React.Fragment>
  );
};
export default Home;
