import { Table } from "../components/OrderHistoryTable";
import { StatusLabel } from "../components/StatusLabel";
import styles from "./index.module.css";

const columns = [
  { key: "id", header: "ID" },
  { key: "customer", header: "Customer" },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusLabel status={row.status} />,
  },
  { key: "amount", header: "Amount" },
];

const data = [
  { id: 1, customer: "Alice", amount: "$120", status: "Pending" },
  { id: 2, customer: "Bob", amount: "$95", status: "Delivered" },
  { id: 3, customer: "Charlie", amount: "$88", status: "Cancelled" },
];

export const OrderHistoryPage = () => {
  const getCountByStatus = (status) =>
    data.filter((item) => item.status.toLowerCase() === status.toLowerCase())
      .length;

  const allCount = data.length;
  const pendingCount = getCountByStatus("Pending");
  const completedCount = getCountByStatus("Delivered"); // Assuming Delivered = Completed
  const cancelledCount = getCountByStatus("Cancelled");
  return (
    <div className={styles.wrapper}>
      <h2>Order History</h2>
      <div className={styles.statusTabs}>
        <span className={styles.tab}>All Orders ({allCount})</span>
        <span className={styles.tab}>Pending ({pendingCount})</span>
        <span className={styles.tab}>Completed ({completedCount})</span>
        <span className={styles.tab}>Cancelled ({cancelledCount})</span>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
};
