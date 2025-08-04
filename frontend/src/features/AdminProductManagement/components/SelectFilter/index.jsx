import React from "react";
import styles from "./styles.module.css"; 
const SelectFilter = ({ label, options, selected, onChange }) => {
  return (
    <div className={styles.selectFilter}>
      <label>{label}</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name || opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
