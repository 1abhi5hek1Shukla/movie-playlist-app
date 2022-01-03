/**
 *
 * movies.js
 * (reducers)
 */
export default (moviesList = [], action) => {
  switch (action.type) {
    case "FETCH_MOVIES":
      return action.payload;
    case "REM_MOVIES":
      return [];
    default:
      return moviesList;
  }
};
