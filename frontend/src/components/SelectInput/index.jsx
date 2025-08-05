import React from "react";
import styles from "./styles.module.css"
const SelectInput = ({
  name,
  label,
  value,
  onChange,
  options,
  multiple = false,
  required = false
}) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      <select
        className={styles.primaryInput}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        multiple={multiple}
        required={required}
      >
        {!multiple && <option value="" className={styles.inputLabel}>Select {label}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SelectInput;