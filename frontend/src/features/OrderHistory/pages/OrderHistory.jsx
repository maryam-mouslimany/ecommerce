import React, { useState, useEffect } from "react";
import { Table } from "../components/OrderHistoryTable";
import { StatusLabel } from "../../../components/StatusLabel";
import { orderService } from "../../../services/orderService";
import styles from "./index.module.css";


export const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const columns = [
    { key: "id", header: "Order ID" },
    { key: "date", header: "Date" },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusLabel status={row.status} />,
    },
    { key: "amount", header: "Amount" },
    { key: "items", header: "Items" },
  ];

  // Load customer orders from API
  const loadOrders = async (status = 'all') => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getCustomerOrders(1, 20); // page 1, 20 items
      
      if (response.success && response.data) {
        // Transform the API data to match our component structure
        const transformedOrders = response.data.data.map(order => ({
          id: order.id,
          date: new Date(order.created_at).toLocaleDateString(),
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
          amount: `$${parseFloat(order.total_amount).toFixed(2)}`,
          items: order.items ? order.items.length : 0,
          created_at: order.created_at,
          updated_at: order.updated_at
        }));
        
        setOrders(transformedOrders);
      } else {
        setOrders([]);
        setError('No orders found');
      }
    } catch (err) {
      console.error('Failed to load orders:', err);
      setError('Failed to load your order history. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
  }, []);

  // Filter orders based on active filter
  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === activeFilter.toLowerCase());

  const getCountByStatus = (status) => {
    if (status === 'all') return orders.length;
    return orders.filter((order) => order.status.toLowerCase() === status.toLowerCase()).length;
  };

  const allCount = orders.length;
  const pendingCount = getCountByStatus("pending");
  const completedCount = getCountByStatus("delivered") + getCountByStatus("shipped"); // Assuming Delivered/Shipped = Completed
  const cancelledCount = getCountByStatus("cancelled");

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <h2>Order History</h2>
        <div className={styles.loading}>Loading your orders...</div>
      </div>
    );
  }

  if (error && orders.length === 0) {
    return (
      <div className={styles.wrapper}>
        <h2>Order History</h2>
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={() => loadOrders()} className={styles.retryButton}>Retry</button>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <h2>Order History</h2>
      <div className={styles.statusTabs}>
        <span 
          className={`${styles.tab} ${activeFilter === 'all' ? styles.activeTab : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Orders ({allCount})
        </span>
        <span 
          className={`${styles.tab} ${activeFilter === 'pending' ? styles.activeTab : ''}`}
          onClick={() => setActiveFilter('pending')}
        >
          Pending ({pendingCount})
        </span>
        <span 
          className={`${styles.tab} ${activeFilter === 'completed' ? styles.activeTab : ''}`}
          onClick={() => setActiveFilter('completed')}
        >
          Completed ({completedCount})
        </span>
        <span 
          className={`${styles.tab} ${activeFilter === 'cancelled' ? styles.activeTab : ''}`}
          onClick={() => setActiveFilter('cancelled')}
        >
          Cancelled ({cancelledCount})
        </span>
      </div>
      
      {error && orders.length > 0 && (
        <div className={styles.errorBanner}>
          <p>{error}</p>
          <button onClick={() => loadOrders()} className={styles.retryButton}>Retry</button>
        </div>
      )}
      
      <Table columns={columns} data={filteredOrders} />
    </div>
  );
};
