import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Header from "../../components/Header";
import FilterBar from "../../components/FilterBar";
import { StatusLabel } from "../../components/StatusLabel";
import ActionButtons from "../../components/ActionButtons";
import Pagination from "../../components/Pagination";
import OrderDetailsModal from "../../components/OrderDetailsModal";
import { Modal } from "../../components/Modal";
import Table from "../AdminProductManagement/components/Table";
import { orderService } from "../../services/orderService";


const AdminOrderManagement = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ total: 0, lastPage: 1, perPage: 20 });
  const [statusEditModal, setStatusEditModal] = useState({ isOpen: false, order: null, newStatus: "" });

  const filters = ["All", "Pending", "Paid", "Packed", "Shipped"];
  const statusOptions = ["Pending", "Paid", "Packed", "Shipped"];

  // Load orders from API
  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getOrders(activeFilter, currentPage);
      
      if (response.success && response.data) {
        // Transform the API data to match our component structure
        const transformedOrders = response.data.data.map(order => {
          // Format customer name
          const customerName = order.user?.name || order.user?.email || 'Unknown Customer';
          
          // Format address from shipping_address object
          let address = 'No address';
          if (order.shipping_address) {
            const addr = order.shipping_address;
            const parts = [];
            if (addr.line1) parts.push(addr.line1);
            if (addr.line2) parts.push(addr.line2);
            if (addr.city) parts.push(addr.city);
            if (addr.region) parts.push(addr.region);
            address = parts.join(', ') || 'No address';
          }
          
          return {
            id: order.id,
            customerName: customerName,
            address: address,
            status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
            total: `$${parseFloat(order.total_amount).toFixed(2)}`,
            created_at: order.created_at,
            updated_at: order.updated_at,
            user_id: order.user_id,
            shipping_address_id: order.shipping_address_id,
            billing_address_id: order.billing_address_id
          };
        });
        
        setOrders(transformedOrders);
        setPagination({
          total: response.data.total,
          lastPage: response.data.last_page,
          perPage: response.data.per_page
        });
      } else {
        setOrders([]);
        setError('No orders found');
      }
    } catch (err) {
      console.error('Failed to load orders:', err);
      setError('Failed to load orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Load orders on component mount and when filters change
  useEffect(() => {
    loadOrders();
  }, [activeFilter, currentPage]);

  const filteredOrders = orders; // Orders are already filtered by the API

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

  const handleSaveStatus = async () => {
    if (statusEditModal.order && statusEditModal.newStatus) {
      try {
        setLoading(true);
        await orderService.updateOrderStatus(statusEditModal.order.id, statusEditModal.newStatus);
        
        // Update the local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === statusEditModal.order.id
              ? { ...order, status: statusEditModal.newStatus }
              : order
          )
        );
        
        setStatusEditModal({ isOpen: false, order: null, newStatus: "" });
        
        // Optionally reload orders to ensure data consistency
        // loadOrders();
      } catch (err) {
        console.error('Failed to update order status:', err);
        setError('Failed to update order status. Please try again.');
      } finally {
        setLoading(false);
      }
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

  if (loading && orders.length === 0) {
    return (
      <div className={styles.adminContainer}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.pageTitle}>
            <h1>Admin Orders Dashboard</h1>
          </div>
          <div className={styles.loading}>Loading orders...</div>
        </main>
      </div>
    );
  }

  if (error && orders.length === 0) {
    return (
      <div className={styles.adminContainer}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.pageTitle}>
            <h1>Admin Orders Dashboard</h1>
          </div>
          <div className={styles.error}>
            <p>{error}</p>
            <button onClick={loadOrders} className={styles.retryButton}>Retry</button>
          </div>
        </main>
      </div>
    );
  }

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
              onFilterChange={(filter) => {
                setActiveFilter(filter);
                setCurrentPage(1); // Reset to first page when filter changes
              }}
            />
          </div>

          {error && (
            <div className={styles.errorBanner}>
              <p>{error}</p>
              <button onClick={loadOrders} className={styles.retryButton}>Retry</button>
            </div>
          )}

          <div className={styles.tableWrapper}>
            {loading && <div className={styles.loadingOverlay}>Loading...</div>}
            <Table columns={columns} data={filteredOrders} />
          </div>

          <Pagination 
            currentPage={currentPage}
            totalPages={pagination.lastPage}
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
