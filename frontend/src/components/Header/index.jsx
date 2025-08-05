import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { LuBellRing } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import authService from "../../services/authService";

const Header = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Check if user is logged in and listen for changes
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    // Subscribe to user state changes
    const unsubscribe = authService.onUserStateChange((updatedUser) => {
      setUser(updatedUser);
    });

    return unsubscribe;
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setShowDropdown(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>

        <div className={styles.second_menu}>
          <ul>
            {user ? (
              // Authenticated user menu
              <>
                <li className={styles.profileSection} ref={dropdownRef}>
                  <div className={styles.userInfo} onClick={toggleDropdown}>
                    <CgProfile className={styles.profileIcon} />
                    <span className={styles.userName}>Hi, {user.name}</span>
                    <FaChevronDown
                      className={`${styles.dropdownArrow} ${
                        showDropdown ? styles.rotated : ""
                      }`}
                    />
                  </div>

                  {showDropdown && (
                    <div className={styles.dropdown}>
                      <button
                        className={styles.dropdownItem}
                        onClick={handleLogout}
                      >
                        <MdLogout /> Sign Out
                      </button>
                    </div>
                  )}
                </li>
                <li>
                  <Link to="/order">
                    <FaShoppingCart />
                  </Link>
                </li>
                <li>
                  <Link to="/notifications">
                    <LuBellRing />
                  </Link>
                </li>
              </>
            ) : (
              // Guest user menu
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
    </div>
  );
};

export default Header;
