/**
 *
 * users.js
 * (reducers)
 */
export default (userState = {}, action) => {
  switch (action.type) {
    case "CREATE":
      return {};
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return {};
    case "CHECK_AUTH":
      return userState;
    default:
      return userState;
  }
};
