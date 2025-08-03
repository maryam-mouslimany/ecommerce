import React, { useState } from "react";
import styles from "./styles.module.css";
import Header from "../../components/Header";
import FilterBar from "../../components/FilterBar";
import { StatusLabel } from "../../components/StatusLabel";
import ActionButtons from "../../components/ActionButtons";
import Pagination from "../../components/Pagination";
import OrderDetailsModal from "../../components/OrderDetailsModal";

// Mock data for orders
const mockOrders = [
  {
    id: 1,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Shipped",
    total: "$250.00"
  },
  {
    id: 1,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Pending",
    total: "$250.00"
  },
  {
    id: 1,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Shipped",
    total: "$250.00"
  },
  {
    id: 1,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Shipped",
    total: "$250.00"
  },
  {
    id: 1,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Packed",
    total: "$250.00"
  },
  {
    id: 1,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Paid",
    total: "$250.00"
  },
  {
    id: 1,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Shipped",
    total: "$250.00"
  },
  {
    id: 1,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Shipped",
    total: "$250.00"
  },
  {
    id: 1,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Shipped",
    total: "$250.00"
  },
  {
    id: 1,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Paid",
    total: "$250.00"
  }
];

const statusColors = {
  Pending: "#f59e0b",
  Paid: "#10b981", 
  Packed: "#3b82f6",
  Shipped: "#6b7280"
};

const AdminOrderManagement = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filters = ["All", "Pending", "Paid", "Packed", "Shipped"];

  const filteredOrders = mockOrders.filter(order => {
    return activeFilter === "All" || order.status === activeFilter;
  });

  const handleViewOrder = (orderId) => {
    const order = mockOrders.find(order => order.id === orderId);
    setSelectedOrder(order);
  };

  const handleEditOrder = (orderId) => {
    console.log("Edit order:", orderId);
    // TODO: Implement order edit functionality
  };

  return (
    <>
      <div className={styles.adminContainer}>
      <Header />
      <main className={styles.mainContent}>
          <div className={styles.pageTitle}>
            <h1>Admin Orders Dashboard</h1>
          </div>

          <div className={styles.controls}>
            <FilterBar 
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          <div className={styles.ordersTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>Order Id</div>
                <div className={styles.tableCell}>Customer Name</div>
                <div className={styles.tableCell}>Address</div>
                <div className={styles.tableCell}>Total</div>
                <div className={styles.tableCell}>Status</div>
                <div className={styles.tableCell}>Action</div>
              </div>
            </div>

            <div className={styles.tableBody}>
              {filteredOrders.map((order) => (
                <div key={order.id} className={styles.tableRow}>
                  <div className={styles.tableCell}>{order.id}</div>
                  <div className={styles.tableCell}>{order.customerName}</div>
                  <div className={styles.tableCell}>{order.address}</div>
                  <div className={styles.tableCell}>{order.total}</div>
                  <div className={styles.tableCell}>
                    <StatusLabel 
                      status={order.status}
                      customColor={statusColors[order.status]}
                    />
                  </div>
                  <div className={styles.tableCell}>
                    <ActionButtons 
                      onView={() => handleViewOrder(order.id)}
                      onEdit={() => handleEditOrder(order.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

                                           <Pagination 
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </main>
        </div>

        <OrderDetailsModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
        />
      </>
    );
  };

export default AdminOrderManagement;
