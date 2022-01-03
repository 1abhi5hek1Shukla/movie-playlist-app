/**
 *
 * playlists.js
 * (reducers)
 */
export default (playlistState = [], action) => {
  switch (action.type) {
    case "FETCH_PLAYLISTS_BY":
      return action.payload;
    case "APPEND_TO_PLAYLIST":
      return [...playlistState, action.payload];
    case "REM_PLAYLIST":
      return [];
    default:
      return playlistState;
  }
};
