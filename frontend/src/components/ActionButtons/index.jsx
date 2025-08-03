import React from "react";
import styles from "./index.module.css";
import { FaEye, FaEdit } from "react-icons/fa";

const ActionButtons = ({ onView, onEdit }) => {
  return (
    <div className={styles.actionButtons}>
      <button className={styles.actionButton} onClick={onView}>
        <FaEye />
      </button>
      <button className={styles.actionButton} onClick={onEdit}>
        <FaEdit />
      </button>
    </div>
  );
};

export default ActionButtons; 