import React, { useState } from "react";
import styles from "./styles.module.css";
import Header from "../../components/Header";
import FilterBar from "../../components/FilterBar";
import { StatusLabel } from "../../components/StatusLabel";
import ActionButtons from "../../components/ActionButtons";
import Pagination from "../../components/Pagination";
import OrderDetailsModal from "../../components/OrderDetailsModal";
import { Modal } from "../../components/Modal";

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
    id: 2,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Pending",
    total: "$250.00"
  },
  {
    id: 3,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Shipped",
    total: "$250.00"
  },
  {
    id: 4,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Shipped",
    total: "$250.00"
  },
  {
    id: 5,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Packed",
    total: "$250.00"
  },
  {
    id: 6,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Paid",
    total: "$250.00"
  },
  {
    id: 7,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Shipped",
    total: "$250.00"
  },
  {
    id: 8,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Shipped",
    total: "$250.00"
  },
  {
    id: 9,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Shipped",
    total: "$250.00"
  },
  {
    id: 10,
    customerName: "John Kahn",
    address: "147 Birch St, San Antonio",
    status: "Paid",
    total: "$250.00"
  }
];

const AdminOrderManagement = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(mockOrders);
  const [statusEditModal, setStatusEditModal] = useState({ isOpen: false, order: null, newStatus: "" });

  const filters = ["All", "Pending", "Paid", "Packed", "Shipped"];
  
  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Paid", label: "Paid" },
    { value: "Packed", label: "Packed" },
    { value: "Shipped", label: "Shipped" }
  ];

  const filteredOrders = orders.filter(order => {
    return activeFilter === "All" || order.status === activeFilter;
  });

  const handleViewOrder = (orderId) => {
    const order = orders.find(order => order.id === orderId);
    setSelectedOrder(order);
  };

  const handleEditStatus = (order) => {
    setStatusEditModal({
      isOpen: true,
      order: order,
      newStatus: order.status
    });
  };

  const handleSaveStatus = () => {
    if (statusEditModal.order && statusEditModal.newStatus) {
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === statusEditModal.order.id 
            ? { ...order, status: statusEditModal.newStatus }
            : order
        )
      );
      setStatusEditModal({ isOpen: false, order: null, newStatus: "" });
    }
  };

  const handleCloseStatusModal = () => {
    setStatusEditModal({ isOpen: false, order: null, newStatus: "" });
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
                    <StatusLabel status={order.status} />
                  </div>
                  <div className={styles.tableCell}>
                    <ActionButtons 
                      onView={() => handleViewOrder(order.id)}
                      onEditStatus={() => handleEditStatus(order)}
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

      {/* Status Edit Modal */}
      <Modal isOpen={statusEditModal.isOpen} onClose={handleCloseStatusModal}>
        <div className={styles.statusEditModal}>
          <h3>Edit Order Status</h3>
          <div className={styles.modalContent}>
            <p><strong>Order ID:</strong> {statusEditModal.order?.id}</p>
            <p><strong>Customer:</strong> {statusEditModal.order?.customerName}</p>
            <p><strong>Current Status:</strong> <StatusLabel status={statusEditModal.order?.status} /></p>
            
            <div className={styles.statusSelectContainer}>
              <label htmlFor="statusSelect">New Status:</label>
              <select
                id="statusSelect"
                value={statusEditModal.newStatus}
                onChange={(e) => setStatusEditModal(prev => ({ ...prev, newStatus: e.target.value }))}
                className={styles.statusSelect}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className={styles.modalActions}>
            <button 
              className={styles.cancelButton}
              onClick={handleCloseStatusModal}
            >
              Cancel
            </button>
            <button 
              className={styles.saveButton}
              onClick={handleSaveStatus}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminOrderManagement;
