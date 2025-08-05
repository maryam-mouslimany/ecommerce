import styles from "./index.module.css";

export const StatusLabel = ({ status, customColor }) => {
  const statusClass = {
    Pending: styles.pending,
    Paid: styles.paid,
    Packed: styles.packed,
    Shipped: styles.shipped,
    Delivered: styles.delivered,
    Cancelled: styles.cancelled,
  }[status] || styles.default;

  const customStyle = customColor ? { 
    backgroundColor: customColor, 
    color: 'white', 
    border: 'none' 
  } : {};

  return (
    <span className={`${styles.label} ${statusClass}`} style={customStyle}>
      {status}
    </span>
  );
};
