import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { LuBellRing } from "react-icons/lu";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.heading}>
        <span className={styles.his}>His</span>
        <span className={styles.ampersand}>&amp;</span>
        <span className={styles.hers}>Hers</span>
      </div>

      <div className={styles.menu}>
        <div className={styles.main_menu}>
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/product-list">Products</Link>
            </li>
            <li>
              <Link to="/they">His & Hers</Link>
            </li>
          </ul>
        </div>

        <div className={styles.second_menu}>
          <ul>
            <li>
              <Link to="/login">
                <CgProfile />
              </Link>
            </li>
            <li>
              <Link to="/checkout">
                <FaShoppingCart />
              </Link>
            </li>
            <li>
              <Link to="/order-history">
                <LuBellRing />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
