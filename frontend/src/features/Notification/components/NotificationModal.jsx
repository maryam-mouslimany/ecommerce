import React, { useEffect, useState } from "react";
import { Modal } from "../../../components/Modal";
import {getUserNotifications, markNotificationAsRead} from "../../../services/notificationService";
import styles from "./styles.module.css";

const NotificationModal = ({ isOpen, onClose, userId, onCountChange }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !isOpen) return;

    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const data = await getUserNotifications(userId);
        setNotifications(data);
        onCountChange?.(data.length); // Update badge count
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId, isOpen]);

  // Handle marking notification as read
  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      const updated = notifications.filter((n) => n.id !== id);
      setNotifications(updated);
      onCountChange?.(updated.length); // Update badge count
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.notificationCard}>
    <h2 className={styles.title}>Notifications</h2>

    {loading ? (
      <p className={styles.loading}>Loading notifications...</p>
    ) : notifications.length === 0 ? (
      <p className={styles.empty}>No new notifications.</p>
    ) : (
      <ul className={styles.notificationList}>
        {notifications.map((notification) => (
          <li key={notification.id} className={styles.notificationItem}>
            <p>{notification.data.message || "You have a new notification"}</p>
            <button className={styles.markReadButton} onClick={handleMarkAsRead}>
              Mark as Read
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
    </Modal>
  );
};

export default NotificationModal;
