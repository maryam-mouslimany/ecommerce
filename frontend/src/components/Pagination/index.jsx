import React from "react";
import styles from "./index.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        ‹ Previous
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`${styles.paginationButton} ${
            currentPage === page ? styles.active : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next ›
      </button>
    </div>
  );
};

export default Pagination;
