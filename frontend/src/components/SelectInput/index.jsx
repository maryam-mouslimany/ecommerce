import React from "react";
import styles from "./styles.module.css"
const SelectInput = ({ name, label, value, onChange, options, required = false, multiple = false }) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label htmlFor={name} className={styles.inputLabel}>{label}</label>}
      <select
        id={name}
        name={name}
        className={styles.primaryInput}
        value={value}
        onChange={onChange}
        required={required}
        multiple={multiple}
        size={multiple ? 6 : 1}  
      >
        {!multiple && <option value="">Select {label}</option>}
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
