import React from "react";
import styles from "./index.module.css";
import { Modal } from "../Modal";

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.orderDetailsModal}>
        <h2>Order Details</h2>
        
        <div className={styles.customerDetails}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Customer Name:</span>
            <span className={styles.detailValue}>{order.customerName}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Address:</span>
            <span className={styles.detailValue}>{order.address}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Phone Number:</span>
            <span className={styles.detailValue}>81 273 376</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Date:</span>
            <span className={styles.detailValue}>11/09/2025</span>
          </div>
        </div>

        <div className={styles.orderItems}>
          <h3>Order Items</h3>
          <div className={styles.itemsTable}>
            <div className={styles.tableHeader}>
              <div>Item Id</div>
              <div>Name</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>
            <div className={styles.tableRow}>
              <div>1</div>
              <div>Dylan</div>
              <div>$50.00</div>
              <div>2</div>
              <div>$100</div>
            </div>
            <div className={styles.tableRow}>
              <div>344</div>
              <div>Si</div>
              <div>$99.99</div>
              <div>1</div>
              <div>$99.99</div>
            </div>
            <div className={styles.tableRow}>
              <div>23</div>
              <div>Essence</div>
              <div>$120.00</div>
              <div>1</div>
              <div>$120</div>
            </div>
          </div>
          <div className={styles.orderTotal}>
            <span>Total:</span>
            <span>{order.total}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal; 