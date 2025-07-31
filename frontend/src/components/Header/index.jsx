import React from "react";
import styles from "./index.module.css";

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.heading}>
          <span className={styles.his}>His</span>
          <span className={styles.ampersand}>&amp;</span>
          <span className={styles.hers}>Hers</span>
        </div>
      </div>
    </>
  );
};

export default Header;
