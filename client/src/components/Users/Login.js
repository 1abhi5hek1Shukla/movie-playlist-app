/**
 *
 * Login.js
 */

import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import styles from "./Login.module.css";

import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/users";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [userState, setUserState] = useState({
    email: "",
    password: "",
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    dispatch(loginUser(userState)).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <React.Fragment>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h1>Login</h1>
        <Input
          label="Email"
          type="email"
          onChange={(e) =>
            setUserState({ ...userState, email: e.target.value })
          }
        />
        <Input
          label="Password"
          type="password"
          onChange={(e) =>
            setUserState({ ...userState, password: e.target.value })
          }
        />
        <button className={styles.button}>Submit</button>
      </form>
      <p>Or</p>
      <button
        onClick={() => {
          navigate("/signup");
        }}
        className={styles["else-button"]}
      >
        Create A New Account
      </button>
    </React.Fragment>
  );
};

export default Login;
