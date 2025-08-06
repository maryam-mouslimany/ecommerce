import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { LuBellRing } from "react-icons/lu";
import { MdLogout, MdHistory } from "react-icons/md";
import authService from "../../services/authService";
import { getLocalCartItemCount } from "../../services/cartService";
import NotificationModal from "../../features/Notification/components/NotificationModal";
import { getUserNotifications } from "../../services/notificationService";

const Header = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  
   useEffect(() => {
    if (!user) {
      setNotificationCount(0);
      return;
    }

    const fetchNotificationCount = async () => {
      try {
        const notifications = await getUserNotifications(user.id);
        setNotificationCount(notifications.length);
      } catch (error) {
        console.error("Failed to fetch notifications count:", error);
        setNotificationCount(0);
      }
    };

    fetchNotificationCount();

    // Optional: Poll every 30 seconds to refresh count
    const interval = setInterval(fetchNotificationCount, 30000);

    return () => clearInterval(interval);
  }, [user]);
  // Check if user is logged in
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    // Subscribe to user state changes
    const unsubscribe = authService.onUserStateChange((updatedUser) => {
      setUser(updatedUser);
    });

    return unsubscribe;
  }, []);

  // Update cart item count
  useEffect(() => {
    const updateCartCount = () => {
      setCartItemCount(getLocalCartItemCount());
    };

    updateCartCount(); // Initial count

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "cart") updateCartCount();
    };

    window.addEventListener("storage", handleStorageChange);

    // Periodically check for same-tab changes
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setShowDropdown(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className={styles.header}>
      <div className={styles.heading}>
        <Link to="/" className={styles.logo}>
          <span className={styles.his}>His</span>
          <span className={styles.ampersand}>&amp;</span>
          <span className={styles.hers}>Hers</span>
        </Link>
      </div>

      <div className={styles.menu}>
        <div className={styles.main_menu}>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/they">His & Hers</Link>
            </li>
          </ul>
        </div>

        <div className={styles.second_menu}>
          <ul>
            {user ? (
              <>
                {/* Profile Section */}
                <li className={styles.profileSection} ref={dropdownRef}>
                  <div className={styles.userInfo} onClick={toggleDropdown}>
                    <CgProfile className={styles.profileIcon} />
                    <span className={styles.userName}>Hi, {user.name}</span>
                    <FaChevronDown
                      className={`${styles.dropdownArrow} ${showDropdown ? styles.rotated : ""
                        }`}
                    />
                  </div>

                  {showDropdown && (
                    <div className={styles.dropdown}>
                      <Link
                        to="/order-history"
                        className={styles.dropdownItem}
                        onClick={() => setShowDropdown(false)}
                      >
                        <MdHistory /> History
                      </Link>
                      <button
                        className={styles.dropdownItem}
                        onClick={handleLogout}
                      >
                        <MdLogout /> Sign Out
                      </button>
                    </div>
                  )}
                </li>

                {/* Cart Icon */}
                <li className={styles.cartIconContainer}>
                  <Link to="/checkout" className={styles.cartLink}>
                    <FaShoppingCart />
                    {cartItemCount > 0 && (
                      <span className={styles.cartBadge}>{cartItemCount}</span>
                    )}
                  </Link>
                </li>

                <li className={styles.cartIconContainer}>
                  <Link  className={styles.cartLink}>
                    <LuBellRing onClick={() => setIsNotificationOpen(true)}/>
                    {notificationCount > 0 && (
                      <span className={styles.cartBadge}>{notificationCount}</span>
                    )}
                  </Link>
                </li>

              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className={styles.authLink}>
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/register" className={styles.authLink}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        userId={user?.id}
        onCountChange={setNotificationCount}
      />
    </div>
  );
};

export default Header;
