import styles from "./index.module.css";

export const StatusLabel = ({ status }) => {
  const statusClass =
    {
      Pending: styles.pending,
      Delivered: styles.delivered,
      Cancelled: styles.cancelled,
    }[status] || styles.default;

  return <span className={`${styles.label} ${statusClass}`}>{status}</span>;
};
