/**
 *
 * Signup.js
 */

import React, { useState } from "react";
import Input from "../UI/Input";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";

import { registerUser } from "../../actions/users";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userState, setUserState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(registerUser(userState)).then(() => {
      navigate("/");
    });
  };
  return (
    <React.Fragment>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h1>Signup</h1>
        <Input
          label="First Name"
          type="text"
          onChange={(e) =>
            setUserState({ ...userState, firstName: e.target.value })
          }
        />
        <Input
          label="Last Name"
          type="text"
          onChange={(e) =>
            setUserState({ ...userState, lastName: e.target.value })
          }
        />
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
          navigate("/login");
        }}
        className={styles["else-button"]}
      >
        Login
      </button>
    </React.Fragment>
  );
};

export default Signup;
