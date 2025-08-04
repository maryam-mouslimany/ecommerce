import styles from "./index.module.css";

export const StatusLabel = ({ status, customColor }) => {
  const statusClass = {
    Pending: styles.pending,
    Delivered: styles.delivered,
    Cancelled: styles.cancelled,
    Paid: styles.delivered,
    Packed: styles.pending,
    Shipped: styles.delivered,
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
