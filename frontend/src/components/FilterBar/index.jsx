import React from "react";
import styles from "./index.module.css";

const FilterBar = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className={styles.filterBar}>
      {filters.map((filter) => (
        <button
          key={filter}
          className={`${styles.filterButton} ${activeFilter === filter ? styles.active : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar; 