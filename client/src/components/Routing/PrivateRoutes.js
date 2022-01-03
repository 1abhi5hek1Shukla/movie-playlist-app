/**
 *
 * PrivateRouters.js
 */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { checkAuthorization } from "../../actions/users";

function PrivateRoute({ children }) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthorization()).then((res) => {
      console.log(res);
    });
  }, [localStorage.getItem("token")]);
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
