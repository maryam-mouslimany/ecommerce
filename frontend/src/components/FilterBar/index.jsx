import React from "react";
import styles from "./index.module.css";

const FilterBar = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className={styles.filterBar} role="tablist" aria-label="Order status filters">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`${styles.filterButton} ${activeFilter === filter ? styles.active : ''}`}
          onClick={() => onFilterChange(filter)}
          role="tab"
          aria-selected={activeFilter === filter}
          aria-label={`Filter by ${filter} orders`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar; 