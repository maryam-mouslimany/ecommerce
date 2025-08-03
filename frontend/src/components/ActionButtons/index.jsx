import React from "react";
import styles from "./index.module.css";
import { FaEye, FaEdit } from "react-icons/fa";

const ActionButtons = ({ onView, onEditStatus }) => {
  return (
    <div className={styles.actionButtons}>
      <button 
        className={styles.actionButton} 
        onClick={onView}
        aria-label="View order details"
        title="View order details"
      >
        <FaEye />
      </button>
      <button 
        className={styles.actionButton} 
        onClick={onEditStatus}
        aria-label="Edit order status"
        title="Edit order status"
      >
        <FaEdit />
      </button>
    </div>
  );
};

export default ActionButtons; 