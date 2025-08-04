import React, { useState } from "react";
import styles from "./styles.module.css";
import Header from "../../components/Header";
import FilterBar from "../../components/FilterBar";
import { StatusLabel } from "../../components/StatusLabel";
import ActionButtons from "../../components/ActionButtons";
import Pagination from "../../components/Pagination";
import OrderDetailsModal from "../../components/OrderDetailsModal";
import { Modal } from "../../components/Modal";
import Table from "../AdminProductManagement/components/Table";

// Minimal mock data
const mockOrders = [
  { id: 1, customerName: "John Kahn", address: "147 Birch St, San Antonio", status: "Shipped", total: "$250.00" },
  { id: 2, customerName: "Sarah Johnson", address: "89 Oak Ave, Austin", status: "Pending", total: "$180.50" },
  { id: 3, customerName: "Mike Davis", address: "234 Pine Rd, Houston", status: "Shipped", total: "$320.75" },
  { id: 4, customerName: "Emily Wilson", address: "567 Maple Dr, Dallas", status: "Packed", total: "$195.25" },
  { id: 5, customerName: "David Brown", address: "789 Elm St, Fort Worth", status: "Paid", total: "$275.00" }
];

const AdminOrderManagement = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(mockOrders);
  const [statusEditModal, setStatusEditModal] = useState({ isOpen: false, order: null, newStatus: "" });

  const filters = ["All", "Pending", "Paid", "Packed", "Shipped"];
  const statusOptions = ["Pending", "Paid", "Packed", "Shipped"];

  const filteredOrders = orders.filter(order => 
    activeFilter === "All" || order.status === activeFilter
  );

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

  const columns = [
    { header: 'Order Id', key: 'id' },
    { header: 'Customer Name', key: 'customerName' },
    { header: 'Address', key: 'address' },
    { header: 'Total', key: 'total' },
    { header: 'Status', render: (order) => <StatusLabel status={order.status} /> },
    {
      header: 'Actions',
      render: (order) => (
        <ActionButtons 
          onView={() => handleViewOrder(order.id)}
          onEditStatus={() => handleEditStatus(order)}
        />
      )
    }
  ];

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

          <div className={styles.tableWrapper}>
            <Table columns={columns} data={filteredOrders} />
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

      <Modal isOpen={statusEditModal.isOpen} onClose={() => setStatusEditModal({ isOpen: false, order: null, newStatus: "" })}>
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
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className={styles.modalActions}>
            <button className={styles.cancelButton} onClick={() => setStatusEditModal({ isOpen: false, order: null, newStatus: "" })}>
              Cancel
            </button>
            <button className={styles.saveButton} onClick={handleSaveStatus}>
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminOrderManagement;
