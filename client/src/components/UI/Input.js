/**
 * Input.js
 */

import React from "react";
import styles from "./Input.module.css";

// const Input = React.forwardRef((props, ref) => {
const Input = (props) => {
  return (
    <div className={styles.input}>
      <label>{props.label}</label>
      <input type={props.type} onChange={props.onChange} />
    </div>
  );
};

export default Input;
