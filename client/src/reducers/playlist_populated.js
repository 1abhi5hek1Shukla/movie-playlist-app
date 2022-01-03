/**
 *
 * playlists_populated.js
 * (reducers)
 */
export default (playlist = [], action) => {
  switch (action.type) {
    case "POPULATED_PLAYLIST":
      return action.payload;
    case "REM_POP_PLAYLIST":
      return [];
    default:
      return playlist;
  }
};
