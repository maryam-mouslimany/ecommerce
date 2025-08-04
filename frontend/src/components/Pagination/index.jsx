import React from "react";
import styles from "./index.module.css";

const Pagination = ({ currentPage, onPageChange, totalPages = 1 }) => {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className={styles.pagination}>
      <button 
        className={`${styles.paginationButton} ${isFirstPage ? styles.disabled : ''}`}
        onClick={() => !isFirstPage && onPageChange(Math.max(1, currentPage - 1))}
        disabled={isFirstPage}
      >
        ‹
      </button>
      <span className={styles.pageNumber}>{currentPage}</span>
      <button 
        className={`${styles.paginationButton} ${isLastPage ? styles.disabled : ''}`}
        onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        disabled={isLastPage}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination; 