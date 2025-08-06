import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.css";
import { FaBox, FaShoppingBag, FaPlus, FaHome } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/",
      label: "Home",
      icon: <FaHome />,
    },
    {
      path: "/admin/orders",
      label: "Orders",
      icon: <FaShoppingBag />,
    },
    {
      path: "/admin/products",
      label: "Products",
      icon: <FaBox />,
    },
    {
      path: "/admin/products/create",
      label: "Add Product",
      icon: <FaPlus />,
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3 className={styles.title}>Admin Panel</h3>
      </div>
      
      <nav className={styles.navigation}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.path} className={styles.menuItem}>
              <Link
                to={item.path}
                className={`${styles.menuLink} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuLabel}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
