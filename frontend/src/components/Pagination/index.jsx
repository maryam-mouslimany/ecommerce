import React from "react";
import styles from "./index.module.css";

const Pagination = ({ currentPage, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      <button 
        className={styles.paginationButton}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      >
        ‹
      </button>
      <span className={styles.pageNumber}>{currentPage}</span>
      <button 
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination; 