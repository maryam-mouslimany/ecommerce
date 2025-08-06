import React from "react";
import Sidebar from "../../components/Sidebar";
import styles from "./index.module.css";

const AdminLayout = ({ children }) => {
  return (
    <div className={styles.adminLayout}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
