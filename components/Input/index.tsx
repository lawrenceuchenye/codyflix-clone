import styles from "./index.module.css";
import React from "react";
interface InputProp {
  label: string;
  setValue:(val:string|any)=>void;
}

const index: React.FC<InputProp> = ({ label,setValue }) => {
  return (
    <div className={styles.inputField}>
      <input type="text" id="email" name="email" required onChange={(e)=>setValue(e.target.value)}/>
      <label>{label}</label>
    </div>
  );
};

export default index;
